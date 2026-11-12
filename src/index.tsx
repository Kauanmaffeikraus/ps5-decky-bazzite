import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ButtonItem,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import React, { useState, useEffect, VFC, ReactNode } from "react";
import { FaPlaystation, FaSync, FaExclamationTriangle, FaDownload, FaCheckCircle, FaCheck } from "react-icons/fa";

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

const CustomButtonItem: VFC<{
  layout?: "below" | "inline";
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}> = ({ layout = "below", disabled, onClick, children }) => {
  const Component = ButtonItem as any;
  return (
    <Component layout={layout} disabled={disabled} onClick={onClick}>
      {children}
    </Component>
  );
};

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const [mode, setMode] = useState<string>("legacy"); // 'legacy' ou 'bootc'
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
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

      await checkUpdates();
    } catch (e: any) {
      setMode("legacy");
    }
  };

  const checkUpdates = async () => {
    setIsChecking(true);
    setStatusMessage("");
    try {
      const checkRes = await serverAPI.callPluginMethod<{}, UpdateInfo>("check_github_update", {});
      if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
        setUpdateInfo(checkRes.result);
        if (checkRes.result.latest_version) {
          setStatusMessage(`Última versão disponível no GitHub: ${checkRes.result.latest_version}`);
        }
      } else {
        const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
        setStatusMessage(err || "Não foi possível verificar a API do GitHub.");
      }
    } catch (e: any) {
      setStatusMessage("Erro de comunicação com o GitHub.");
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
    setStatusMessage(`Modo ativado: ${cleanMode.toUpperCase()}`);
    try {
      await serverAPI.callPluginMethod<{ mode: string }, { success: boolean }>("set_mode", { mode: cleanMode });
    } catch (e) {
      console.error("Erro ao salvar modo:", e);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setStatusMessage(`Iniciando atualização via modo ${mode.toUpperCase()}... Isso pode levar alguns minutos.`);
    try {
      const res = await serverAPI.callPluginMethod<{ method: string }, UpdateResult>(
        "trigger_update",
        { method: mode }
      );
      if (res.success && typeof res.result === "object" && res.result.success) {
        setStatusMessage(res.result.message);
      } else {
        const msg = res.result && typeof res.result === "object" ? res.result.message : undefined;
        setStatusMessage(msg || "Ocorreu uma falha durante o processo de atualização.");
      }
    } catch (err: any) {
      setStatusMessage(`Erro crítico: ${err.message || err}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <PanelSection title="PS5 Bazzite Updater">
      {/* Botões diretos para alternar entre Legacy e Bootc */}
      <PanelSectionRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>Selecione o seu Modo de Atualização:</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <CustomButtonItem
              layout="below"
              onClick={() => handleSelectMode("legacy")}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontWeight: mode === "legacy" ? "bold" : "normal",
                color: mode === "legacy" ? "#e67e22" : "inherit"
              }}>
                {mode === "legacy" && <FaCheck />}
                <span>LEGACY</span>
              </div>
            </CustomButtonItem>

            <CustomButtonItem
              layout="below"
              onClick={() => handleSelectMode("bootc")}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontWeight: mode === "bootc" ? "bold" : "normal",
                color: mode === "bootc" ? "#2ecc71" : "inherit"
              }}>
                {mode === "bootc" && <FaCheck />}
                <span>BOOTC</span>
              </div>
            </CustomButtonItem>
          </div>
        </div>
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
          <div>
            <strong>Modo Ativo:</strong>{" "}
            <span style={{ color: mode === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" }}>
              {mode.toUpperCase()}
            </span>
          </div>
          <div>
            <strong>Versão Instalada:</strong> {currentVersion || "Identificando..."}
          </div>
          {updateInfo?.latest_version && (
            <div>
              <strong>Última Versão Online:</strong>{" "}
              <span style={{ color: "#3498db" }}>{updateInfo.latest_version}</span>
            </div>
          )}
        </div>
      </PanelSectionRow>

      {mode === "legacy" ? (
        <PanelSectionRow>
          <div
            style={{
              backgroundColor: "rgba(230, 126, 34, 0.15)",
              border: "1px solid #e67e22",
              borderRadius: "4px",
              padding: "8px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              fontSize: "12px",
            }}
          >
            <FaExclamationTriangle style={{ color: "#e67e22", marginTop: "2px", flexShrink: 0 }} />
            <div>
              <strong>Modo Legacy ativo:</strong> A atualização baixará o pacote oficial da release (<code>update.tar.xz</code>) e executará o script <code>update.sh</code>.
            </div>
          </div>
        </PanelSectionRow>
      ) : (
        <PanelSectionRow>
          <div
            style={{
              backgroundColor: "rgba(46, 204, 113, 0.15)",
              border: "1px solid #2ecc71",
              borderRadius: "4px",
              padding: "8px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              fontSize: "12px",
            }}
          >
            <FaCheckCircle style={{ color: "#2ecc71", marginTop: "2px", flexShrink: 0 }} />
            <div>
              <strong>Modo Bootc ativo:</strong> Atualizações atômicas containerizadas via <code>bootc upgrade</code>.
            </div>
          </div>
        </PanelSectionRow>
      )}

      {statusMessage && (
        <PanelSectionRow>
          <div
            style={{
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: "rgba(52, 152, 219, 0.15)",
              border: "1px solid #3498db",
              fontSize: "12px",
              whiteSpace: "pre-wrap",
            }}
          >
            {statusMessage}
          </div>
        </PanelSectionRow>
      )}

      <PanelSectionRow>
        <CustomButtonItem
          layout="below"
          disabled={isChecking || isUpdating}
          onClick={checkUpdates}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <FaSync />
            <span>{isChecking ? "Verificando..." : "Checar Atualizações"}</span>
          </div>
        </CustomButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <CustomButtonItem
          layout="below"
          disabled={isUpdating || isChecking}
          onClick={handleUpdate}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <FaDownload />
            <span>{isUpdating ? "Atualizando..." : `Atualizar Agora (${mode.toUpperCase()})`}</span>
          </div>
        </CustomButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverAPI: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>PS5 Updater</div>,
    content: <Content serverAPI={serverAPI} />,
    icon: <FaPlaystation />,
  };
});
