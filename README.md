# PS5 Bazzite Decky Plugin & Payload Manager Auto-Updater

[English](#english) | [Português](#português)

---

<a name="english"></a>
## English

An all-in-one Decky Loader plugin and PS5 Payload Manager feed designed for [VivaLaVent/ps5-bazzite-deck](https://github.com/VivaLaVent/ps5-bazzite-deck).

### ✨ Features
- **Automatic Startup Notification:** Checks for new releases when SteamOS boots and displays a native Steam notification toast **only** if a new version is available.
- **Release Notes in UI:** Read full release notes and changelogs from VivaLaVent directly inside the Quick Access Menu before deciding to update.
- **Bilingual Interface:** Supports both English and Portuguese with an instant one-click toggle.
- **Dual Update Methods:**
  - **Legacy Mode:** Automatically downloads the official release bundle (`update.tar.xz`), extracts it, and executes `update.sh`.
  - **Bootc Mode:** Performs atomic container system upgrades via `sudo bootc upgrade`.
- **Zero-Maintenance PS5 Payload Feed:** Automatically updates `payloads.json` via GitHub Actions on new releases, enabling one-click ELF updates directly on the PS5 screen without USB transfers.

### 📦 Installation on Steam Deck / PS5 Bazzite
In Desktop Mode terminal (Konsole):
```bash
sudo cp -r /var/home/ps5/.gemini/antigravity/scratch/ps5-bazzite-decky-plugin/main.py \
        /var/home/ps5/.gemini/antigravity/scratch/ps5-bazzite-decky-plugin/dist \
        ~/homebrew/plugins/ps5-bazzite-updater/ && \
sudo systemctl restart plugin_loader
```

### 🎮 PS5 Payload Manager Setup
1. In the PS5 **Payload Manager**, navigate to **Settings** > **Manage Sources** > **Add Source**.
2. Enter the raw URL of your repository feed:
   ```text
   https://raw.githubusercontent.com/Kauanmaffeikraus/ps5-decky-bazzite/main/payloads.json
   ```
3. Save. Whenever a new bootloader `.elf` is released, the Payload Manager will display an **Update Available** button.

---

<a name="português"></a>
## Português

Plugin completo para o Decky Loader e feed para o PS5 Payload Manager desenvolvido para o [VivaLaVent/ps5-bazzite-deck](https://github.com/VivaLaVent/ps5-bazzite-deck).

### ✨ Recursos
- **Notificação Automática no Boot:** Verifica releases ao iniciar o SteamOS e exibe uma notificação nativa (toast) **apenas** quando houver uma nova versão disponível.
- **Notas da Release na Interface:** Veja o changelog e as novidades oficiais do VivaLaVent diretamente pelo menu rápido antes de atualizar.
- **Interface Bilíngue:** Suporte completo a Português e Inglês com troca em um clique.
- **Modos de Atualização:**
  - **Modo Legacy:** Baixa o pacote oficial da release (`update.tar.xz`), extrai os arquivos e roda o script `update.sh`.
  - **Modo Bootc:** Executa atualizações containerizadas via `sudo bootc upgrade`.
- **Feed Automático para o Payload Manager:** O GitHub Actions atualiza o `payloads.json` de hora em hora. No PS5, o Payload Manager avisa na TV e atualiza o `.elf` sem precisar de pendrive ou FTP.

### 📦 Instalação no Bazzite / PS5
No terminal do Desktop Mode (Konsole):
```bash
sudo cp -r /var/home/ps5/.gemini/antigravity/scratch/ps5-bazzite-decky-plugin/main.py \
        /var/home/ps5/.gemini/antigravity/scratch/ps5-bazzite-decky-plugin/dist \
        ~/homebrew/plugins/ps5-bazzite-updater/ && \
sudo systemctl restart plugin_loader
```

### 🎮 Configuração no PS5 Payload Manager
1. No **Payload Manager** do PS5, vá em **Settings** > **Manage Sources** > **Add Source**.
2. Adicione a URL Raw:
   ```text
   https://raw.githubusercontent.com/Kauanmaffeikraus/ps5-decky-bazzite/main/payloads.json
   ```
3. Salve. O `.elf` mais recente aparecerá para download e com botão de update automático.
