import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ButtonItem,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { useState, useEffect, VFC, ReactNode } from "react";
import { FaPlaystation, FaSync, FaExclamationTriangle, FaDownload } from "react-icons/fa";

interface UpdateInfo {
  success: boolean;
  latest_version?: string;
  title?: string;
  notes?: string;
  url?: string;
  published_at?: string;
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
  const [sysType, setSysType] = useState<string>("Verificando...");
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const refreshStatus = async () => {
    setIsChecking(true);
    setStatusMessage("");
    try {
      const typeRes = await serverAPI.callPluginMethod<{}, string>("get_system_type", {});
      if (typeRes.success && typeof typeRes.result === "string") {
        setSysType(typeRes.result);
      }

      const verRes = await serverAPI.callPluginMethod<{}, string>("get_current_version", {});
      if (verRes.success && typeof verRes.result === "string") {
        setCurrentVersion(verRes.result);
      }

      const checkRes = await serverAPI.callPluginMethod<{}, UpdateInfo>("check_github_update", {});
      if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
        setUpdateInfo(checkRes.result);
        if (checkRes.result.latest_version && verRes.result && checkRes.result.latest_version !== verRes.result) {
          setStatusMessage(`Nova versão disponível: ${checkRes.result.latest_version}`);
        }
      } else {
        const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
        setStatusMessage(err || "Não foi possível verificar a API do GitHub.");
      }
    } catch (e: any) {
      setStatusMessage("Erro de comunicação com o backend do plugin.");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setStatusMessage(`Executando atualização via ${sysType.toUpperCase()}... Isso pode levar alguns minutos.`);
    try {
      const res = await serverAPI.callPluginMethod<{ method: string }, UpdateResult>(
        "trigger_update",
        { method: sysType }
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
      <PanelSectionRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
          <div>
            <strong>Tipo de Sistema:</strong>{" "}
            <span style={{ color: sysType === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" }}>
              {sysType.toUpperCase()}
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

      {sysType === "legacy" && (
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
              <strong>Atenção:</strong> Sua instalação é Legacy. Versões modernas utilizam <code>bootc</code> containerizado. A migração completa exige regravar a imagem no drive.
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
          onClick={refreshStatus}
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
            <span>{isUpdating ? "Atualizando..." : `Atualizar (${sysType.toUpperCase()})`}</span>
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
