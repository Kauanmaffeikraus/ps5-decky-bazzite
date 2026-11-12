import os
import subprocess
import urllib.request
import json
import logging
import tarfile
import shutil

logging.basicConfig(level=logging.INFO)

def get_settings_dir():
    # Decky Loader define DECKY_PLUGIN_SETTINGS_DIR quando executa plugins
    decky_dir = os.environ.get("DECKY_PLUGIN_SETTINGS_DIR")
    if decky_dir:
        return decky_dir
    user_config = os.path.expanduser("~/.config/ps5-bazzite-updater")
    try:
        os.makedirs(user_config, exist_ok=True)
        return user_config
    except Exception:
        fallback = "/tmp/ps5-bazzite-updater"
        os.makedirs(fallback, exist_ok=True)
        return fallback

class Plugin:
    async def _main(self):
        logging.info("PS5 Bazzite Updater plugin iniciado.")
        try:
            os.makedirs(get_settings_dir(), exist_ok=True)
        except Exception:
            pass

    async def _unload(self):
        logging.info("PS5 Bazzite Updater plugin descarregado.")

    def _get_settings_file(self):
        return os.path.join(get_settings_dir(), "settings.json")

    async def get_saved_mode(self) -> str:
        """
        Retorna o modo configurado: 'legacy', 'bootc' ou 'unset' (se for primeira vez).
        """
        settings_file = self._get_settings_file()
        if os.path.exists(settings_file):
            try:
                with open(settings_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    mode = data.get("mode")
                    if mode in ["legacy", "bootc"]:
                        return mode
            except Exception as e:
                logging.warning(f"Erro ao ler settings: {e}")
        return "unset"

    async def set_mode(self, mode: str) -> dict:
        """
        Salva a escolha do usuário ('legacy' ou 'bootc').
        """
        if mode not in ["legacy", "bootc"]:
            return {"success": False, "message": "Modo inválido. Escolha 'legacy' ou 'bootc'."}
        try:
            s_dir = get_settings_dir()
            os.makedirs(s_dir, exist_ok=True)
            settings_file = self._get_settings_file()
            with open(settings_file, "w", encoding="utf-8") as f:
                json.dump({"mode": mode}, f, indent=2)
            logging.info(f"Modo salvo com sucesso: {mode}")
            return {"success": True, "mode": mode}
        except Exception as e:
            return {"success": False, "message": str(e)}

    async def get_current_version(self) -> str:
        """
        Retorna a versão do sistema instalada localmente.
        """
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

    async def check_github_update(self) -> dict:
        """
        Consulta a API do GitHub em busca da última release oficial de VivaLaVent/ps5-bazzite-deck.
        """
        url = "https://api.github.com/repos/VivaLaVent/ps5-bazzite-deck/releases/latest"
        headers = {
            "User-Agent": "Decky-PS5-Bazzite-Updater",
            "Accept": "application/vnd.github.v3+json"
        }
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
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

    async def trigger_update(self, method: str) -> dict:
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
                        "message": "Atualização bootc concluída com sucesso! Reinicie o console para carregar a nova versão."
                    }
                else:
                    return {
                        "success": False,
                        "message": f"Erro durante 'bootc upgrade': {res.stderr or res.stdout}"
                    }

            elif method == "legacy":
                logging.info("Iniciando atualização via método Legacy...")
                # 1. Tenta baixar o pacote oficial de atualização legado da release
                check = await self.check_github_update()
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

                # 2. Fallback caso não ache o tarball ou já existam scripts locais
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
                    "message": "Nenhum script legado de atualização encontrado na release ou localmente. Verifique sua conexão ou execute o script manualmente."
                }

            return {
                "success": False,
                "message": f"Modo desconhecido: {method}"
            }
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "message": "A atualização demorou muito tempo e atingiu o tempo limite."
            }
        except Exception as e:
            logging.error(f"Erro ao executar atualização: {e}")
            return {
                "success": False,
                "message": f"Exceção durante a atualização: {str(e)}"
            }
