import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ButtonItem,
  DropdownItem,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { useState, useEffect, VFC, ReactNode } from "react";
import { FaPlaystation, FaSync, FaExclamationTriangle, FaDownload, FaCog, FaCheckCircle } from "react-icons/fa";

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
  const [mode, setMode] = useState<string>("loading"); // 'legacy', 'bootc', 'unset', 'loading'
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const loadModeAndStatus = async () => {
    try {
      const modeRes = await serverAPI.callPluginMethod<{}, string>("get_saved_mode", {});
      if (modeRes.success && typeof modeRes.result === "string") {
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
    setMode(selected);
    setStatusMessage(`Modo alterado para: ${selected.toUpperCase()}`);
    await serverAPI.callPluginMethod<{ mode: string }, { success: boolean }>("set_mode", { mode: selected });
  };

  const handleUpdate = async () => {
    if (mode === "unset") {
      setStatusMessage("Selecione primeiro se o seu sistema é Legacy ou Bootc!");
      return;
    }

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

  // Se o usuário ainda não escolheu o modo na primeira vez
  if (mode === "unset") {
    return (
      <PanelSection title="Configuração Inicial">
        <PanelSectionRow>
          <div style={{ fontSize: "13px", lineHeight: "1.4" }}>
            Bem-vindo ao <strong>PS5 Bazzite Updater</strong>! Como seu sistema foi instalado?
          </div>
        </PanelSectionRow>

        <PanelSectionRow>
          <CustomButtonItem onClick={() => handleSelectMode("legacy")}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
              <span style={{ fontWeight: "bold", color: "#e67e22" }}>Método Legacy (Recomendado para você)</span>
              <span style={{ fontSize: "11px", opacity: 0.8 }}>
                Versão clássica/antiga. Atualiza baixando o bundle oficial e rodando o script interno.
              </span>
            </div>
          </CustomButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <CustomButtonItem onClick={() => handleSelectMode("bootc")}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
              <span style={{ fontWeight: "bold", color: "#2ecc71" }}>Método Bootc</span>
              <span style={{ fontSize: "11px", opacity: 0.8 }}>
                Para sistemas v2.5+ baseados em containers e gerenciados via <code>bootc upgrade</code>.
              </span>
            </div>
          </CustomButtonItem>
        </PanelSectionRow>
      </PanelSection>
    );
  }

  const dropdownOptions = [
    { data: "legacy", label: "Método Legacy (Scripts / Tarball)" },
    { data: "bootc", label: "Método Bootc (sudo bootc upgrade)" },
  ];

  return (
    <PanelSection title="PS5 Bazzite Updater">
      {/* Seletor para alternar o modo a qualquer momento */}
      <PanelSectionRow>
        <DropdownItem
          label="Modo de Atualização"
          description="Você pode alternar entre Legacy e Bootc quando quiser"
          rgOptions={dropdownOptions}
          selectedOption={mode}
          onChange={(opt) => handleSelectMode(opt.data)}
        />
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
              <strong>Modo Legacy selecionado:</strong> As atualizações serão feitas baixando o pacote oficial de atualização da release (<code>update.tar.xz</code>) e executando o <code>update.sh</code>.
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
              <strong>Modo Bootc selecionado:</strong> Atualizações atômicas containerizadas via <code>bootc upgrade</code>.
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
