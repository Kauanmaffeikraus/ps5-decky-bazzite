# PS5 Bazzite Decky Plugin & Payload Manager Repo

Este projeto contém os arquivos necessários para:
1. **Plugin do Decky Loader (`ps5-bazzite-updater`)**: Notifica sobre novas versões do [VivaLaVent/ps5-bazzite-deck](https://github.com/VivaLaVent/ps5-bazzite-deck) e permite atualizar via `bootc` ou método legado diretamente pelo Gaming Mode.
2. **Repositório JSON (`payloads.json`)**: Configuração para o **PS5 Payload Manager** atualizar o payload `.elf` automaticamente no console.

---

## 1. Como Compilar e Instalar o Plugin no Decky Loader

### Pré-requisitos
No seu ambiente Linux (ou no próprio Bazzite Desktop Mode), você precisará do `node` e `pnpm` (ou `npm`).

### Passo a passo de compilação:
```bash
cd /var/home/ps5/.gemini/antigravity/scratch/ps5-bazzite-decky-plugin
pnpm install   # ou npm install
pnpm run build # ou npm run build
```

Isso gerará a pasta `dist/` com o arquivo `dist/index.js`.

### Instalação no Decky Loader:
O Decky Loader carrega os plugins da pasta `~/homebrew/plugins` (ou `/homebrew/plugins` dependendo da instalação).

Copie a pasta inteira do plugin para lá:
```bash
mkdir -p ~/homebrew/plugins/ps5-bazzite-updater
cp -r plugin.json main.py dist ~/homebrew/plugins/ps5-bazzite-updater/
sudo systemctl restart plugin_loader # Reinicia o serviço do Decky
```

Abra o menu rápido (...) no Gaming Mode e o plugin aparecerá pronto para uso!

---

## 2. Automação Total do `payloads.json` no Payload Manager do PS5

Para **nunca** precisar editar a versão manualmente:

1. **Repositório GitHub com GitHub Actions**:
   - Este projeto já inclui a automação pronta em [`.github/workflows/update-payloads.yml`](.github/workflows/update-payloads.yml) e o script [`scripts/generate_payloads.py`](scripts/generate_payloads.py).
   - Quando você subir este projeto para o seu GitHub, o GitHub Actions rodará a cada 6 horas (ou quando você clicar em "Run workflow").
   - Ele consulta a API do `VivaLaVent/ps5-bazzite-deck`, detecta se saiu versão nova, calcula o hash SHA-256 do `.elf`, atualiza o `payloads.json` e faz o `git commit` automaticamente!

2. **Configuração Única no PS5**:
   - No GitHub do seu repositório, abra o arquivo `payloads.json` e clique no botão **Raw**.
   - Copie o link (ex: `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/payloads.json`).
   - No **Payload Manager** do PS5:
     - Vá em **Settings** > **Manage Sources** > **Add Source**.
     - Cole a URL Raw.
     - Salve.

3. **Resultado**:
   - Você não precisa mexer em nada manualmente! Quando o autor do Bazzite lançar uma nova versão:
     1. O GitHub Actions atualiza seu `payloads.json` sozinho.
     2. O Payload Manager do PS5 avisa na tela que há uma atualização do `.elf`.
     3. Você clica no botão **Update** no PS5 e ele baixa e substitui o arquivo automaticamente.
