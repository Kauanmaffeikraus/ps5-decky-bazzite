import os
import subprocess
import urllib.request
import json
import logging
import shutil

logging.basicConfig(level=logging.INFO)

# Tenta obter o diretório oficial de settings do Decky Loader
try:
    import decky_plugin
    DECKY_SETTINGS_DIR = getattr(decky_plugin, "DECKY_PLUGIN_SETTINGS_DIR", None)
except Exception:
    DECKY_SETTINGS_DIR = None

def get_possible_settings_files():
    files = []
    if DECKY_SETTINGS_DIR:
        files.append(os.path.join(DECKY_SETTINGS_DIR, "settings.json"))
    files.append("/var/home/ps5/.config/ps5-bazzite-updater/settings.json")
    files.append("/tmp/ps5-bazzite-updater-settings.json")
    return files

def read_saved_mode():
    for f in get_possible_settings_files():
        if os.path.exists(f):
            try:
                with open(f, "r", encoding="utf-8") as fp:
                    data = json.load(fp)
                    mode = data.get("mode")
                    if mode in ["legacy", "bootc"]:
                        return mode
            except Exception:
                pass
    return "legacy"  # Default seguro para legacy

def write_saved_mode(mode: str):
    if mode not in ["legacy", "bootc"]:
        mode = "legacy"
    saved = False
    for f in get_possible_settings_files():
        try:
            d = os.path.dirname(f)
            os.makedirs(d, exist_ok=True)
            with open(f, "w", encoding="utf-8") as fp:
                json.dump({"mode": mode}, fp, indent=2)
            saved = True
        except Exception:
            pass
    return saved

def get_installed_version():
    candidates = [
        "/etc/ps5-bazzite-version",
        "/usr/share/ps5-bazzite/version"
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return f.read().strip()
            except Exception:
                pass

    if os.path.exists("/etc/os-release"):
        try:
            with open("/etc/os-release", "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("IMAGE_VERSION=") or line.startswith("VERSION_ID="):
                        return line.split("=", 1)[1].strip().strip('"')
        except Exception:
            pass

    return "Desconhecida"

async def fetch_github_release():
    url = "https://api.github.com/repos/VivaLaVent/ps5-bazzite-deck/releases/latest"
    headers = {
        "User-Agent": "Decky-PS5-Bazzite-Updater",
        "Accept": "application/vnd.github.v3+json"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            if response.status == 200:
                data = json.loads(response.read().decode("utf-8"))
                tag_name = data.get("tag_name", "")
                name = data.get("name", "")
                body = data.get("body", "")
                html_url = data.get("html_url", "")
                published_at = data.get("published_at", "")
                assets = data.get("assets", [])

                legacy_tar_url = None
                for a in assets:
                    if a.get("name", "").endswith("-update.tar.xz"):
                        legacy_tar_url = a.get("browser_download_url")
                        break

                return {
                    "success": True,
                    "latest_version": tag_name,
                    "title": name,
                    "notes": body[:400] if body else "",
                    "url": html_url,
                    "published_at": published_at,
                    "legacy_tar_url": legacy_tar_url
                }
            else:
                return {
                    "success": False,
                    "error": f"HTTP {response.status}"
                }
    except Exception as e:
        logging.error(f"Erro ao consultar GitHub API: {e}")
        return {
            "success": False,
            "error": str(e)
        }

class Plugin:
    async def _main(self):
        logging.info("PS5 Bazzite Updater plugin iniciado.")

    async def _unload(self):
        logging.info("PS5 Bazzite Updater plugin descarregado.")

    async def get_saved_mode(self, *args, **kwargs) -> str:
        return read_saved_mode()

    async def set_mode(self, mode: str = "legacy", *args, **kwargs) -> dict:
        logging.info(f"Alterando modo para: {mode}")
        success = write_saved_mode(mode)
        return {"success": success, "mode": mode}

    async def get_current_version(self, *args, **kwargs) -> str:
        return get_installed_version()

    async def check_github_update(self, *args, **kwargs) -> dict:
        return await fetch_github_release()

    async def trigger_update(self, method: str = "legacy", *args, **kwargs) -> dict:
        """
        Aplica a atualização no console de acordo com a escolha: 'bootc' ou 'legacy'.
        """
        try:
            if method == "bootc":
                logging.info("Iniciando atualização via bootc...")
                res = subprocess.run(
                    ["bootc", "upgrade"],
                    capture_output=True,
                    text=True,
                    timeout=600
                )
                if res.returncode == 0:
                    return {
                        "success": True,
                        "message": "Atualização bootc concluída com sucesso! Reinicie o console para aplicar."
                    }
                else:
                    return {
                        "success": False,
                        "message": f"Erro durante 'bootc upgrade': {res.stderr or res.stdout}"
                    }

            elif method == "legacy":
                logging.info("Iniciando atualização via método Legacy...")
                # 1. Busca os dados da release para obter o tarball oficial de update
                check = await fetch_github_release()
                legacy_tar_url = check.get("legacy_tar_url") if check.get("success") else None

                work_dir = "/tmp/ps5-legacy-update"
                if os.path.exists(work_dir):
                    shutil.rmtree(work_dir, ignore_errors=True)
                os.makedirs(work_dir, exist_ok=True)

                if legacy_tar_url:
                    tar_path = os.path.join(work_dir, "update.tar.xz")
                    logging.info(f"Baixando pacote legado de: {legacy_tar_url}...")
                    urllib.request.urlretrieve(legacy_tar_url, tar_path)

                    logging.info("Extraindo pacote de atualização...")
                    subprocess.run(["tar", "-xf", tar_path, "-C", work_dir], check=True)

                    update_script = os.path.join(work_dir, "update.sh")
                    if os.path.exists(update_script):
                        os.chmod(update_script, 0o755)
                        logging.info("Executando update.sh...")
                        run_res = subprocess.run(
                            ["bash", update_script],
                            cwd=work_dir,
                            capture_output=True,
                            text=True,
                            timeout=600
                        )
                        return {
                            "success": run_res.returncode == 0,
                            "message": run_res.stdout if run_res.returncode == 0 else run_res.stderr
                        }

                # 2. Fallback caso scripts locais já existam
                possible_scripts = [
                    "/usr/bin/ps5-bazzite-update",
                    "/usr/local/bin/update-ps5-bazzite.sh",
                    "/etc/ps5-bazzite/update.sh"
                ]
                for script in possible_scripts:
                    if os.path.exists(script):
                        res = subprocess.run(
                            [script],
                            capture_output=True,
                            text=True,
                            timeout=600
                        )
                        return {
                            "success": res.returncode == 0,
                            "message": res.stdout if res.returncode == 0 else res.stderr
                        }

                return {
                    "success": False,
                    "message": "Nenhum pacote de atualização legado (update.tar.xz) ou script local foi encontrado."
                }

            return {
                "success": False,
                "message": f"Modo desconhecido: {method}"
            }
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "message": "A atualização atingiu o tempo limite (timeout)."
            }
        except Exception as e:
            logging.error(f"Erro ao executar atualização: {e}")
            return {
                "success": False,
                "message": f"Exceção durante a atualização: {str(e)}"
            }
