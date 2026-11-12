import os
import subprocess
import urllib.request
import json
import logging

logging.basicConfig(level=logging.INFO)

class Plugin:
    async def _main(self):
        logging.info("PS5 Bazzite Updater plugin iniciado.")

    async def _unload(self):
        logging.info("PS5 Bazzite Updater plugin descarregado.")

    async def get_system_type(self) -> str:
        """
        Identifica se a instalação atual é baseada em bootc (v2.5+) ou legacy.
        """
        # Verifica se o executável bootc existe e se o sistema está rodando sob ostree/bootc
        if os.path.exists("/usr/bin/bootc"):
            try:
                res = subprocess.run(["bootc", "status"], capture_output=True, text=True, timeout=5)
                if res.returncode == 0:
                    return "bootc"
            except Exception as e:
                logging.warning(f"Erro ao verificar bootc status: {e}")

        if os.path.exists("/run/ostree-booted"):
            return "bootc"

        return "legacy"

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

        # Tenta ler /etc/os-release
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

                    return {
                        "success": True,
                        "latest_version": tag_name,
                        "title": name,
                        "notes": body[:400] if body else "",
                        "url": html_url,
                        "published_at": published_at
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
        Aplica a atualização no console de acordo com a arquitetura detectada.
        """
        try:
            if method == "bootc":
                # Executa bootc upgrade com privilégios de root fornecidos pelo Decky
                res = subprocess.run(
                    ["bootc", "upgrade"],
                    capture_output=True,
                    text=True,
                    timeout=300
                )
                if res.returncode == 0:
                    return {
                        "success": True,
                        "message": "Sistema bootc atualizado com sucesso! Reinicie o PS5 para carregar a nova versão."
                    }
                else:
                    return {
                        "success": False,
                        "message": f"Erro durante 'bootc upgrade': {res.stderr or res.stdout}"
                    }

            elif method == "legacy":
                # Para instalações legadas, procura pelos scripts de atualização clássicos
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
                            timeout=300
                        )
                        return {
                            "success": res.returncode == 0,
                            "message": res.stdout if res.returncode == 0 else res.stderr
                        }

                # Caso não tenha o script interno
                return {
                    "success": False,
                    "message": "Instalação Legacy detectada. Versões antigas não possuem bootc integrado e para usufruir da v2.5+ é recomendável fazer o reflash da imagem no pendrive/SSD."
                }

            return {
                "success": False,
                "message": f"Método desconhecido: {method}"
            }
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "message": "A atualização demorou muito tempo e atingiu o tempo limite (timeout)."
            }
        except Exception as e:
            logging.error(f"Erro ao executar atualização: {e}")
            return {
                "success": False,
                "message": f"Exceção ao atualizar: {str(e)}"
            }
