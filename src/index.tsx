import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ButtonItem,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import React, { useState, useEffect, VFC, ReactNode } from "react";
import {
  FaPlaystation,
  FaSync,
  FaExclamationTriangle,
  FaDownload,
  FaCheckCircle,
  FaCheck,
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaGlobeAmericas
} from "react-icons/fa";

interface UpdateInfo {
  success: boolean;
  latest_version?: string;
  title?: string;
  notes?: string;
  url?: string;
  published_at?: string;
  legacy_tar_url?: string;
  error?: string;
}

interface UpdateResult {
  success: boolean;
  message: string;
}

// Dicionário de Idiomas (i18n)
const TRANSLATIONS = {
  pt: {
    selectMode: "Selecione o seu Modo de Atualização:",
    activeMode: "Modo Ativo:",
    installedVer: "Versão Instalada:",
    onlineVer: "Última Versão Online:",
    checking: "Identificando...",
    checkingBtn: "Verificando...",
    checkBtn: "Checar Atualizações",
    updating: "Atualizando...",
    updateNow: "Atualizar Agora",
    reinstall: "Reinstalar / Atualizar",
    upToDate: "Seu sistema já está na versão mais recente",
    updateAvailable: "Nova versão disponível no GitHub:",
    releaseNotesTitle: "Notas de Atualização",
    viewNotes: "Ver Notas da Release",
    hideNotes: "Ocultar Notas",
    noNotes: "Nenhuma nota de atualização fornecida para esta versão.",
    legacyWarn: "Modo Legacy ativo: Baixará o pacote oficial da release (update.tar.xz) e executará o update.sh.",
    bootcWarn: "Modo Bootc ativo: Atualizações atômicas containerizadas via bootc upgrade.",
    toastTitle: "PS5 Bazzite Deck",
    toastBody: "Nova atualização disponível ({version})! Abra o menu do Decky para atualizar.",
    langBtn: "Idioma:",
  },
  en: {
    selectMode: "Select Update Mode:",
    activeMode: "Active Mode:",
    installedVer: "Installed Version:",
    onlineVer: "Latest Online Version:",
    checking: "Detecting...",
    checkingBtn: "Checking...",
    checkBtn: "Check for Updates",
    updating: "Updating...",
    updateNow: "Update Now",
    reinstall: "Reinstall / Update",
    upToDate: "Your system is already up to date",
    updateAvailable: "New update available on GitHub:",
    releaseNotesTitle: "Release Notes",
    viewNotes: "View Release Notes",
    hideNotes: "Hide Release Notes",
    noNotes: "No release notes provided for this version.",
    legacyWarn: "Legacy mode active: Will download the official release bundle (update.tar.xz) and run update.sh.",
    bootcWarn: "Bootc mode active: Atomic containerized updates managed via bootc upgrade.",
    toastTitle: "PS5 Bazzite Deck",
    toastBody: "New update available ({version})! Open Decky to update.",
    langBtn: "Language:",
  },
};

interface CustomButtonItemProps {
  layout?: "below" | "inline";
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}

const CustomButtonItem: VFC<CustomButtonItemProps> = ({ layout = "below", disabled, onClick, children }) => {
  const Component = ButtonItem as any;
  return React.createElement(Component, { layout, disabled, onClick }, children);
};

// Verificação de inicialização para notificação Toast
let startupNotified = false;
async function checkStartupNotification(serverAPI: ServerAPI) {
  if (startupNotified) return;
  try {
    const curRes = await serverAPI.callPluginMethod<{}, string>("get_current_version", {});
    const upRes = await serverAPI.callPluginMethod<{}, UpdateInfo>("check_github_update", {});
    if (upRes.success && upRes.result && upRes.result.latest_version) {
      const latest = (upRes.result.latest_version || "").trim().toLowerCase();
      const current = (curRes.result || "").trim().toLowerCase();

      // Só notifica se houver versão nova diferente da instalada
      if (latest && current && latest !== current) {
        startupNotified = true;
        const isPt = navigator.language && navigator.language.startsWith("pt");
        const t = isPt ? TRANSLATIONS.pt : TRANSLATIONS.en;
        const msg = t.toastBody.replace("{version}", upRes.result.latest_version);

        serverAPI.toaster.toast({
          title: t.toastTitle,
          body: msg,
          duration: 8000,
        });
      }
    }
  } catch (e) {
    // Silencioso em caso de falha de conexão na inicialização
  }
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const [lang, setLang] = useState<"pt" | "en">(() => {
    return navigator.language && navigator.language.startsWith("pt") ? "pt" : "en";
  });
  const t = TRANSLATIONS[lang];

  const [mode, setMode] = useState<string>("legacy");
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const loadModeAndStatus = async () => {
    try {
      const modeRes = await serverAPI.callPluginMethod<{}, string>("get_saved_mode", {});
      if (modeRes.success && typeof modeRes.result === "string" && (modeRes.result === "bootc" || modeRes.result === "legacy")) {
        setMode(modeRes.result);
      } else {
        setMode("legacy");
      }

      const verRes = await serverAPI.callPluginMethod<{}, string>("get_current_version", {});
      if (verRes.success && typeof verRes.result === "string") {
        setCurrentVersion(verRes.result);
      }

      await checkUpdates(verRes.result);
    } catch (e: any) {
      setMode("legacy");
    }
  };

  const checkUpdates = async (installedVer?: string) => {
    setIsChecking(true);
    setStatusMessage("");
    try {
      const checkRes = await serverAPI.callPluginMethod<{}, UpdateInfo>("check_github_update", {});
      if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
        setUpdateInfo(checkRes.result);
        const latest = checkRes.result.latest_version;
        const current = installedVer || currentVersion;

        if (latest) {
          if (current && current.toLowerCase() === latest.toLowerCase()) {
            setStatusMessage(`${t.upToDate} (${latest})!`);
          } else {
            setStatusMessage(`${t.updateAvailable} ${latest}`);
          }
        }
      } else {
        const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
        setStatusMessage(err || "GitHub check failed.");
      }
    } catch (e: any) {
      setStatusMessage("Connection error.");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    loadModeAndStatus();
  }, []);

  const handleSelectMode = async (selected: string) => {
    const cleanMode = selected === "bootc" ? "bootc" : "legacy";
    setMode(cleanMode);
    setStatusMessage(`Modo ativado / Active mode: ${cleanMode.toUpperCase()}`);
    try {
      await serverAPI.callPluginMethod<{ mode: string }, { success: boolean }>("set_mode", { mode: cleanMode });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setStatusMessage(`${t.updating} (${mode.toUpperCase()})...`);
    try {
      const res = await serverAPI.callPluginMethod<{ method: string }, UpdateResult>(
        "trigger_update",
        { method: mode }
      );
      if (res.success && typeof res.result === "object" && res.result.success) {
        setStatusMessage(res.result.message);
      } else {
        const msg = res.result && typeof res.result === "object" ? res.result.message : undefined;
        setStatusMessage(msg || "Update process failed.");
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message || err}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const isUpToDate = Boolean(
    currentVersion &&
    updateInfo?.latest_version &&
    currentVersion.toLowerCase() === updateInfo.latest_version.toLowerCase()
  );

  return React.createElement(
    PanelSection,
    { title: "PS5 Bazzite Updater" },

    // Idioma & Alternador
    React.createElement(
      PanelSectionRow,
      null,
      React.createElement(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" } },
        React.createElement("span", { style: { opacity: 0.8 } }, t.langBtn),
        React.createElement(
          "div",
          { style: { display: "flex", gap: "6px" } },
          React.createElement(
            "button",
            {
              onClick: () => setLang("pt"),
              style: {
                background: lang === "pt" ? "#3498db" : "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                cursor: "pointer",
                fontWeight: lang === "pt" ? "bold" : "normal"
              }
            },
            "Português"
          ),
          React.createElement(
            "button",
            {
              onClick: () => setLang("en"),
              style: {
                background: lang === "en" ? "#3498db" : "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                cursor: "pointer",
                fontWeight: lang === "en" ? "bold" : "normal"
              }
            },
            "English"
          )
        )
      )
    ),

    // Seletor de Modo Legacy / Bootc
    React.createElement(
      PanelSectionRow,
      null,
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "6px" } },
        React.createElement("span", { style: { fontSize: "12px", opacity: 0.8 } }, t.selectMode),
        React.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } },
          React.createElement(
            CustomButtonItem,
            { layout: "below", onClick: () => handleSelectMode("legacy") },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: mode === "legacy" ? "bold" : "normal",
                  color: mode === "legacy" ? "#e67e22" : "inherit"
                }
              },
              mode === "legacy" ? React.createElement(FaCheck, null) : null,
              React.createElement("span", null, "LEGACY")
            )
          ),
          React.createElement(
            CustomButtonItem,
            { layout: "below", onClick: () => handleSelectMode("bootc") },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: mode === "bootc" ? "bold" : "normal",
                  color: mode === "bootc" ? "#2ecc71" : "inherit"
                }
              },
              mode === "bootc" ? React.createElement(FaCheck, null) : null,
              React.createElement("span", null, "BOOTC")
            )
          )
        )
      )
    ),

    // Status das Versões
    React.createElement(
      PanelSectionRow,
      null,
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" } },
        React.createElement(
          "div",
          null,
          React.createElement("strong", null, t.activeMode),
          " ",
          React.createElement(
            "span",
            { style: { color: mode === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" } },
            mode.toUpperCase()
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement("strong", null, t.installedVer),
          " ",
          React.createElement(
            "span",
            { style: { color: "#2ecc71", fontWeight: "bold" } },
            currentVersion || t.checking
          )
        ),
        updateInfo && updateInfo.latest_version
          ? React.createElement(
              "div",
              null,
              React.createElement("strong", null, t.onlineVer),
              " ",
              React.createElement(
                "span",
                { style: { color: "#3498db", fontWeight: "bold" } },
                updateInfo.latest_version
              )
            )
          : null
      )
    ),

    // Aviso do Modo
    React.createElement(
      PanelSectionRow,
      null,
      mode === "legacy"
        ? React.createElement(
            "div",
            {
              style: {
                backgroundColor: "rgba(230, 126, 34, 0.15)",
                border: "1px solid #e67e22",
                borderRadius: "4px",
                padding: "8px",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "12px",
              }
            },
            React.createElement(FaExclamationTriangle, { style: { color: "#e67e22", marginTop: "2px", flexShrink: 0 } }),
            React.createElement("div", null, t.legacyWarn)
          )
        : React.createElement(
            "div",
            {
              style: {
                backgroundColor: "rgba(46, 204, 113, 0.15)",
                border: "1px solid #2ecc71",
                borderRadius: "4px",
                padding: "8px",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "12px",
              }
            },
            React.createElement(FaCheckCircle, { style: { color: "#2ecc71", marginTop: "2px", flexShrink: 0 } }),
            React.createElement("div", null, t.bootcWarn)
          )
    ),

    // Mensagem de Status
    statusMessage
      ? React.createElement(
          PanelSectionRow,
          null,
          React.createElement(
            "div",
            {
              style: {
                padding: "8px",
                borderRadius: "4px",
                backgroundColor: isUpToDate ? "rgba(46, 204, 113, 0.15)" : "rgba(52, 152, 219, 0.15)",
                border: isUpToDate ? "1px solid #2ecc71" : "1px solid #3498db",
                fontSize: "12px",
                whiteSpace: "pre-wrap",
              }
            },
            statusMessage
          )
        )
      : null,

    // Botão de Ver Notas da Release (Changelog de VivaLaVent)
    updateInfo && updateInfo.latest_version
      ? React.createElement(
          PanelSectionRow,
          null,
          React.createElement(
            CustomButtonItem,
            { layout: "below", onClick: () => setShowNotes(!showNotes) },
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } },
              React.createElement(FaBookOpen, null),
              React.createElement("span", null, showNotes ? t.hideNotes : `${t.viewNotes} (${updateInfo.latest_version})`),
              showNotes ? React.createElement(FaChevronUp, null) : React.createElement(FaChevronDown, null)
            )
          )
        )
      : null,

    // Caixa de Notas de Atualização
    showNotes && updateInfo
      ? React.createElement(
          PanelSectionRow,
          null,
          React.createElement(
            "div",
            {
              style: {
                maxHeight: "180px",
                overflowY: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "6px",
                padding: "10px",
                fontSize: "11px",
                lineHeight: "1.4",
                whiteSpace: "pre-wrap",
                color: "#ecf0f1",
              }
            },
            React.createElement("strong", { style: { color: "#3498db", display: "block", marginBottom: "6px" } }, `${t.releaseNotesTitle} - ${updateInfo.latest_version}`),
            updateInfo.notes || t.noNotes
          )
        )
      : null,

    // Botão Checar Atualizações
    React.createElement(
      PanelSectionRow,
      null,
      React.createElement(
        CustomButtonItem,
        { layout: "below", disabled: isChecking || isUpdating, onClick: () => checkUpdates() },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } },
          React.createElement(FaSync, null),
          React.createElement("span", null, isChecking ? t.checkingBtn : t.checkBtn)
        )
      )
    ),

    // Botão Atualizar
    React.createElement(
      PanelSectionRow,
      null,
      React.createElement(
        CustomButtonItem,
        { layout: "below", disabled: isUpdating || isChecking, onClick: handleUpdate },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } },
          React.createElement(FaDownload, null),
          React.createElement(
            "span",
            null,
            isUpdating
              ? t.updating
              : isUpToDate
              ? `${t.reinstall} (${mode.toUpperCase()})`
              : `${t.updateNow} ${updateInfo && updateInfo.latest_version ? updateInfo.latest_version : ""} (${mode.toUpperCase()})`
          )
        )
      )
    )
  );
};

export default definePlugin((serverAPI: ServerAPI) => {
  // Dispara checagem em background ao iniciar o SteamOS (só notifica via toast se houver versão nova)
  checkStartupNotification(serverAPI);

  return {
    title: React.createElement("div", { className: staticClasses.Title }, "PS5 Updater"),
    content: React.createElement(Content, { serverAPI: serverAPI }),
    icon: React.createElement(FaPlaystation, null),
  };
});
