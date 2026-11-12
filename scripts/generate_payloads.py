#!/usr/bin/env python3
import json
import urllib.request
import hashlib
import os
import sys

REPO = "VivaLaVent/ps5-bazzite-deck"
OUTPUT_FILE = "payloads.json"

def get_latest_release(repo):
    # Consulta a lista geral de releases para incluir também pre-releases lançadas pelo autor
    url = f"https://api.github.com/repos/{repo}/releases"
    headers = {
        "User-Agent": "PS5-Payload-AutoUpdater",
        "Accept": "application/vnd.github.v3+json"
    }
    github_token = os.environ.get("GITHUB_TOKEN")
    if github_token:
        headers["Authorization"] = f"Bearer {github_token}"

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            releases = json.loads(res.read().decode("utf-8"))
            if isinstance(releases, list) and len(releases) > 0:
                for rel in releases:
                    if not rel.get("draft", False):
                        return rel
    except Exception as e:
        print(f"Aviso ao consultar /releases: {e}, tentando /releases/latest...")

    # Fallback para releases/latest
    url_latest = f"https://api.github.com/repos/{repo}/releases/latest"
    req_latest = urllib.request.Request(url_latest, headers=headers)
    with urllib.request.urlopen(req_latest, timeout=15) as res:
        return json.loads(res.read().decode("utf-8"))

def calculate_sha256(url):
    try:
        headers = {"User-Agent": "PS5-Payload-AutoUpdater"}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as res:
            content = res.read()
            return hashlib.sha256(content).hexdigest()
    except Exception as e:
        print(f"Aviso: Não foi possível baixar o ELF para calcular o checksum: {e}")
        return ""

def main():
    print(f"Buscando a release mais recente de {REPO}...")
    try:
        release = get_latest_release(REPO)
    except Exception as e:
        print(f"Erro ao buscar release: {e}")
        sys.exit(1)

    tag = release.get("tag_name", "")
    published_at = release.get("published_at", "")[:10]
    assets = release.get("assets", [])

    print(f"Última versão encontrada: {tag} ({published_at})")

    # Procura por arquivos .elf nos assets
    elf_asset = None
    for asset in assets:
        name = asset.get("name", "").lower()
        if name.endswith(".elf") and not name.endswith(".sha256"):
            elf_asset = asset
            break

    if elf_asset:
        elf_name = elf_asset.get("name")
        download_url = elf_asset.get("browser_download_url")
    else:
        elf_name = f"bazzite-bootc-loader-{tag}.elf"
        download_url = f"https://github.com/{REPO}/releases/download/{tag}/{elf_name}"

    print(f"Asset ELF alvo: {elf_name} -> {download_url}")
    
    checksum = ""
    if elf_asset:
        print("Calculando SHA-256 do arquivo...")
        checksum = calculate_sha256(download_url)

    payloads_data = {
        "name": "PS5 Bazzite Deck Payloads",
        "description": "Feed automático com atualizações do PS5 Bazzite Deck",
        "payloads": []
    }

    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
                payloads_data = json.load(f)
        except Exception:
            pass

    payload_id = "ps5-bazzite-bootloader"
    updated = False

    for item in payloads_data.setdefault("payloads", []):
        if item.get("id") == payload_id:
            if item.get("version") == tag and item.get("checksum") == checksum:
                print("O payloads.json já está atualizado na versão mais recente. Nenhuma alteração necessária.")
                sys.exit(0)
            
            item["version"] = tag
            item["filename"] = elf_name
            item["url"] = download_url
            item["last_update"] = published_at
            if checksum:
                item["checksum"] = checksum
            updated = True
            break

    if not updated:
        payloads_data["payloads"].append({
            "id": payload_id,
            "name": "PS5 Bazzite Linux Loader",
            "filename": elf_name,
            "url": download_url,
            "description": f"Bootloader oficial do Bazzite Deck para PS5 ({tag})",
            "version": tag,
            "last_update": published_at,
            "category": "Loaders",
            "author": "VivaLaVent",
            "checksum": checksum
        })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payloads_data, f, indent=2, ensure_ascii=False)

    print(f"Sucesso! {OUTPUT_FILE} atualizado para a versão {tag}.")

if __name__ == "__main__":
    main()
