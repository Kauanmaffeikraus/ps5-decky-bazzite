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
    return "legacy"

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
    """
    Obtém a versão oficial instalada do PS5 Bazzite Deck.
    """
    # 1. Arquivo de versão da instalação legacy
    legacy_file = "/etc/ps5-bazzite-deck-version"
    if os.path.exists(legacy_file):
        try:
            with open(legacy_file, "r", encoding="utf-8") as f:
                val = f.read().strip()
                if val:
                    return val
        except Exception:
            pass

    # 2. Arquivo de versão da instalação bootc
    bootc_file = "/usr/share/ps5-bazzite-bootc/VERSION"
    if os.path.exists(bootc_file):
        try:
            with open(bootc_file, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("deck="):
                        return line.split("=", 1)[1].strip()
                    if line.startswith("version="):
                        return line.split("=", 1)[1].strip()
        except Exception:
            pass

    # 3. Fallbacks
    for path in ["/etc/ps5-bazzite-version", "/usr/share/ps5-bazzite/version"]:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return f.read().strip()
            except Exception:
                pass

    return "Desconhecida"

async def fetch_github_release():
    url = "https://api.github.com/repos/VivaLaVent/ps5-bazzite-deck/releases"
    raw_data = None

    # Tentativa 1: urllib
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Decky-PS5-Bazzite-Updater",
            "Accept": "application/vnd.github.v3+json"
        })
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                releases = json.loads(response.read().decode("utf-8"))
                if isinstance(releases, list) and len(releases) > 0:
                    for rel in releases:
                        if not rel.get("draft", False):
                            raw_data = rel
                            break
    except Exception as e:
        logging.warning(f"urllib falhou em /releases: {e}")

    # Tentativa 2: curl caso urllib falhe
    if not raw_data:
        try:
            curl_res = subprocess.run(
                ["curl", "-sL", "-H", "User-Agent: Decky-PS5-Bazzite-Updater", url],
                capture_output=True,
                text=True,
                timeout=12
            )
            if curl_res.returncode == 0 and curl_res.stdout:
                releases = json.loads(curl_res.stdout)
                if isinstance(releases, list) and len(releases) > 0:
                    for rel in releases:
                        if not rel.get("draft", False):
                            raw_data = rel
                            break
        except Exception as e:
            logging.error(f"curl falhou: {e}")

    # Fallback para /releases/latest caso /releases não retorne
    if not raw_data:
        url_latest = "https://api.github.com/repos/VivaLaVent/ps5-bazzite-deck/releases/latest"
        try:
            curl_res = subprocess.run(
                ["curl", "-sL", "-H", "User-Agent: Decky-PS5-Bazzite-Updater", url_latest],
                capture_output=True,
                text=True,
                timeout=12
            )
            if curl_res.returncode == 0 and curl_res.stdout:
                raw_data = json.loads(curl_res.stdout)
        except Exception:
            pass

    if not raw_data or "tag_name" not in raw_data:
        return {
            "success": False,
            "error": "Não foi possível obter a versão mais recente do GitHub (verifique a internet)."
        }

    tag_name = raw_data.get("tag_name", "")
    name = raw_data.get("name", "")
    body = raw_data.get("body", "")
    html_url = raw_data.get("html_url", "")
    published_at = raw_data.get("published_at", "")
    assets = raw_data.get("assets", [])

    legacy_tar_url = None
    for a in assets:
        a_name = a.get("name", "")
        if a_name.endswith("-update.tar.xz") or "update.tar.xz" in a_name:
            legacy_tar_url = a.get("browser_download_url")
            break

    return {
        "success": True,
        "latest_version": tag_name,
        "title": name,
        "notes": body if body else "",
        "url": html_url,
        "published_at": published_at,
        "legacy_tar_url": legacy_tar_url
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
            installed = get_installed_version()

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
                logging.info("Iniciando verificação de pacote Legacy...")
                check = await fetch_github_release()
                if not check.get("success"):
                    return {
                        "success": False,
                        "message": f"Erro ao consultar release: {check.get('error')}"
                    }

                latest = check.get("latest_version")
                legacy_tar_url = check.get("legacy_tar_url")

                if not legacy_tar_url:
                    return {
                        "success": False,
                        "message": f"A release {latest} não possui pacote 'update.tar.xz' anexado."
                    }

                work_dir = "/tmp/ps5-legacy-update"
                if os.path.exists(work_dir):
                    shutil.rmtree(work_dir, ignore_errors=True)
                os.makedirs(work_dir, exist_ok=True)

                tar_path = os.path.join(work_dir, "update.tar.xz")
                # Se o arquivo já foi baixado e tem tamanho válido (> 100MB), pula o download
                if not (os.path.exists(tar_path) and os.path.getsize(tar_path) > 100 * 1024 * 1024):
                    logging.info(f"Baixando {legacy_tar_url} com curl...")
                    dl_res = subprocess.run(
                        ["curl", "-L", "-o", tar_path, legacy_tar_url],
                        capture_output=True,
                        text=True,
                        timeout=400
                    )
                    if dl_res.returncode != 0:
                        return {
                            "success": False,
                            "message": f"Falha ao baixar o pacote de atualização: {dl_res.stderr}"
                        }

                logging.info("Extraindo pacote de atualização...")
                tar_res = subprocess.run(["tar", "-xf", tar_path, "-C", work_dir], capture_output=True, text=True)
                if tar_res.returncode != 0:
                    return {
                        "success": False,
                        "message": f"Falha ao descompactar pacote: {tar_res.stderr}"
                    }

                # Localiza o update.sh mesmo que tenha sido extraído dentro de uma subpasta
                update_script = None
                script_dir = work_dir
                for root, dirs, files in os.walk(work_dir):
                    if "update.sh" in files:
                        update_script = os.path.join(root, "update.sh")
                        script_dir = root
                        break

                if update_script and os.path.exists(update_script):
                    os.chmod(update_script, 0o755)
                    logging.info(f"Executando update.sh em {script_dir}...")
                    run_res = subprocess.run(
                        ["bash", "update.sh"],
                        cwd=script_dir,
                        capture_output=True,
                        text=True,
                        timeout=600
                    )
                    if run_res.returncode == 0:
                        return {
                            "success": True,
                            "message": "Atualização concluída com sucesso! Reinicie o console para aplicar o novo kernel e módulos."
                        }
                    else:
                        return {
                            "success": False,
                            "message": f"Erro durante update.sh:\n{run_res.stderr or run_res.stdout}"
                        }

                return {
                    "success": False,
                    "message": "O arquivo update.sh não foi encontrado dentro do pacote extraído."
                }

            return {
                "success": False,
                "message": f"Modo desconhecido: {method}"
            }
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "message": "A operação atingiu o tempo limite (timeout)."
            }
        except Exception as e:
            logging.error(f"Erro ao executar atualização: {e}")
            return {
                "success": False,
                "message": f"Exceção durante a atualização: {str(e)}"
            }
