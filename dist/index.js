(function (deckyFrontendLib, React) {
  'use strict';

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

  var _excluded = ["attr", "size", "title"];
  function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
  function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
  function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function Tree2Element(tree) {
    return tree && tree.map((node, i) => /*#__PURE__*/React.createElement(node.tag, _objectSpread({
      key: i
    }, node.attr), Tree2Element(node.child)));
  }
  function GenIcon(data) {
    return props => /*#__PURE__*/React.createElement(IconBase, _extends({
      attr: _objectSpread({}, data.attr)
    }, props), Tree2Element(data.child));
  }
  function IconBase(props) {
    var elem = conf => {
      var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = _objectWithoutProperties(props, _excluded);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return /*#__PURE__*/React.createElement("svg", _extends({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: _objectSpread(_objectSpread({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaPlaystation (props) {
    return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9.6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z"},"child":[]}]})(props);
  }function FaSync (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"},"child":[]}]})(props);
  }function FaExclamationTriangle (props) {
    return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},"child":[]}]})(props);
  }function FaDownload (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"},"child":[]}]})(props);
  }function FaChevronUp (props) {
    return GenIcon({"attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"},"child":[]}]})(props);
  }function FaChevronDown (props) {
    return GenIcon({"attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"},"child":[]}]})(props);
  }function FaCheck (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},"child":[]}]})(props);
  }function FaCheckCircle (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"},"child":[]}]})(props);
  }function FaBookOpen (props) {
    return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"},"child":[]}]})(props);
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
  const CustomButtonItem = ({ layout = "below", disabled, onClick, children }) => {
      const Component = deckyFrontendLib.ButtonItem;
      return React.createElement(Component, { layout, disabled, onClick }, children);
  };
  // Verificação de inicialização para notificação Toast
  let startupNotified = false;
  async function checkStartupNotification(serverAPI) {
      if (startupNotified)
          return;
      try {
          const curRes = await serverAPI.callPluginMethod("get_current_version", {});
          const upRes = await serverAPI.callPluginMethod("check_github_update", {});
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
      }
      catch (e) {
          // Silencioso em caso de falha de conexão na inicialização
      }
  }
  const Content = ({ serverAPI }) => {
      const [lang, setLang] = React.useState(() => {
          return navigator.language && navigator.language.startsWith("pt") ? "pt" : "en";
      });
      const t = TRANSLATIONS[lang];
      const [mode, setMode] = React.useState("legacy");
      const [currentVersion, setCurrentVersion] = React.useState("");
      const [updateInfo, setUpdateInfo] = React.useState(null);
      const [showNotes, setShowNotes] = React.useState(false);
      const [isChecking, setIsChecking] = React.useState(false);
      const [isUpdating, setIsUpdating] = React.useState(false);
      const [statusMessage, setStatusMessage] = React.useState("");
      const loadModeAndStatus = async () => {
          try {
              const modeRes = await serverAPI.callPluginMethod("get_saved_mode", {});
              if (modeRes.success && typeof modeRes.result === "string" && (modeRes.result === "bootc" || modeRes.result === "legacy")) {
                  setMode(modeRes.result);
              }
              else {
                  setMode("legacy");
              }
              const verRes = await serverAPI.callPluginMethod("get_current_version", {});
              if (verRes.success && typeof verRes.result === "string") {
                  setCurrentVersion(verRes.result);
              }
              await checkUpdates(verRes.result);
          }
          catch (e) {
              setMode("legacy");
          }
      };
      const checkUpdates = async (installedVer) => {
          setIsChecking(true);
          setStatusMessage("");
          try {
              const checkRes = await serverAPI.callPluginMethod("check_github_update", {});
              if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
                  setUpdateInfo(checkRes.result);
                  const latest = checkRes.result.latest_version;
                  const current = installedVer || currentVersion;
                  if (latest) {
                      if (current && current.toLowerCase() === latest.toLowerCase()) {
                          setStatusMessage(`${t.upToDate} (${latest})!`);
                      }
                      else {
                          setStatusMessage(`${t.updateAvailable} ${latest}`);
                      }
                  }
              }
              else {
                  const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
                  setStatusMessage(err || "GitHub check failed.");
              }
          }
          catch (e) {
              setStatusMessage("Connection error.");
          }
          finally {
              setIsChecking(false);
          }
      };
      React.useEffect(() => {
          loadModeAndStatus();
      }, []);
      const handleSelectMode = async (selected) => {
          const cleanMode = selected === "bootc" ? "bootc" : "legacy";
          setMode(cleanMode);
          setStatusMessage(`Modo ativado / Active mode: ${cleanMode.toUpperCase()}`);
          try {
              await serverAPI.callPluginMethod("set_mode", { mode: cleanMode });
          }
          catch (e) {
              console.error(e);
          }
      };
      const handleUpdate = async () => {
          setIsUpdating(true);
          setStatusMessage(`${t.updating} (${mode.toUpperCase()})...`);
          try {
              const res = await serverAPI.callPluginMethod("trigger_update", { method: mode });
              if (res.success && typeof res.result === "object" && res.result.success) {
                  setStatusMessage(res.result.message);
              }
              else {
                  const msg = res.result && typeof res.result === "object" ? res.result.message : undefined;
                  setStatusMessage(msg || "Update process failed.");
              }
          }
          catch (err) {
              setStatusMessage(`Error: ${err.message || err}`);
          }
          finally {
              setIsUpdating(false);
          }
      };
      const isUpToDate = Boolean(currentVersion &&
          updateInfo?.latest_version &&
          currentVersion.toLowerCase() === updateInfo.latest_version.toLowerCase());
      return React.createElement(deckyFrontendLib.PanelSection, { title: "PS5 Bazzite Updater" }, 
      // Idioma & Alternador
      React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" } }, React.createElement("span", { style: { opacity: 0.8 } }, t.langBtn), React.createElement("div", { style: { display: "flex", gap: "6px" } }, React.createElement("button", {
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
      }, "Português"), React.createElement("button", {
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
      }, "English")))), 
      // Seletor de Modo Legacy / Bootc
      React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "6px" } }, React.createElement("span", { style: { fontSize: "12px", opacity: 0.8 } }, t.selectMode), React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } }, React.createElement(CustomButtonItem, { layout: "below", onClick: () => handleSelectMode("legacy") }, React.createElement("div", {
          style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontWeight: mode === "legacy" ? "bold" : "normal",
              color: mode === "legacy" ? "#e67e22" : "inherit"
          }
      }, mode === "legacy" ? React.createElement(FaCheck, null) : null, React.createElement("span", null, "LEGACY"))), React.createElement(CustomButtonItem, { layout: "below", onClick: () => handleSelectMode("bootc") }, React.createElement("div", {
          style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontWeight: mode === "bootc" ? "bold" : "normal",
              color: mode === "bootc" ? "#2ecc71" : "inherit"
          }
      }, mode === "bootc" ? React.createElement(FaCheck, null) : null, React.createElement("span", null, "BOOTC")))))), 
      // Status das Versões
      React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" } }, React.createElement("div", null, React.createElement("strong", null, t.activeMode), " ", React.createElement("span", { style: { color: mode === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" } }, mode.toUpperCase())), React.createElement("div", null, React.createElement("strong", null, t.installedVer), " ", React.createElement("span", { style: { color: "#2ecc71", fontWeight: "bold" } }, currentVersion || t.checking)), updateInfo && updateInfo.latest_version
          ? React.createElement("div", null, React.createElement("strong", null, t.onlineVer), " ", React.createElement("span", { style: { color: "#3498db", fontWeight: "bold" } }, updateInfo.latest_version))
          : null)), 
      // Aviso do Modo
      React.createElement(deckyFrontendLib.PanelSectionRow, null, mode === "legacy"
          ? React.createElement("div", {
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
          }, React.createElement(FaExclamationTriangle, { style: { color: "#e67e22", marginTop: "2px", flexShrink: 0 } }), React.createElement("div", null, t.legacyWarn))
          : React.createElement("div", {
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
          }, React.createElement(FaCheckCircle, { style: { color: "#2ecc71", marginTop: "2px", flexShrink: 0 } }), React.createElement("div", null, t.bootcWarn))), 
      // Mensagem de Status
      statusMessage
          ? React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement("div", {
              style: {
                  padding: "8px",
                  borderRadius: "4px",
                  backgroundColor: isUpToDate ? "rgba(46, 204, 113, 0.15)" : "rgba(52, 152, 219, 0.15)",
                  border: isUpToDate ? "1px solid #2ecc71" : "1px solid #3498db",
                  fontSize: "12px",
                  whiteSpace: "pre-wrap",
              }
          }, statusMessage))
          : null, 
      // Botão de Ver Notas da Release (Changelog de VivaLaVent)
      updateInfo && updateInfo.latest_version
          ? React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement(CustomButtonItem, { layout: "below", onClick: () => setShowNotes(!showNotes) }, React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } }, React.createElement(FaBookOpen, null), React.createElement("span", null, showNotes ? t.hideNotes : `${t.viewNotes} (${updateInfo.latest_version})`), showNotes ? React.createElement(FaChevronUp, null) : React.createElement(FaChevronDown, null))))
          : null, 
      // Caixa de Notas de Atualização
      showNotes && updateInfo
          ? React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement("div", {
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
          }, React.createElement("strong", { style: { color: "#3498db", display: "block", marginBottom: "6px" } }, `${t.releaseNotesTitle} - ${updateInfo.latest_version}`), updateInfo.notes || t.noNotes))
          : null, 
      // Botão Checar Atualizações
      React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement(CustomButtonItem, { layout: "below", disabled: isChecking || isUpdating, onClick: () => checkUpdates() }, React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } }, React.createElement(FaSync, null), React.createElement("span", null, isChecking ? t.checkingBtn : t.checkBtn)))), 
      // Botão Atualizar
      React.createElement(deckyFrontendLib.PanelSectionRow, null, React.createElement(CustomButtonItem, { layout: "below", disabled: isUpdating || isChecking, onClick: handleUpdate }, React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" } }, React.createElement(FaDownload, null), React.createElement("span", null, isUpdating
          ? t.updating
          : isUpToDate
              ? `${t.reinstall} (${mode.toUpperCase()})`
              : `${t.updateNow} ${updateInfo && updateInfo.latest_version ? updateInfo.latest_version : ""} (${mode.toUpperCase()})`)))));
  };
  var index = deckyFrontendLib.definePlugin((serverAPI) => {
      // Dispara checagem em background ao iniciar o SteamOS (só notifica via toast se houver versão nova)
      checkStartupNotification(serverAPI);
      return {
          title: React.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "PS5 Updater"),
          content: React.createElement(Content, { serverAPI: serverAPI }),
          icon: React.createElement(FaPlaystation, null),
      };
  });

  return index;

})(DFL, SP_REACT);
