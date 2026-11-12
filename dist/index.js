(function (React, deckyFrontendLib) {
  'use strict';

  var jsxRuntime = {exports: {}};

  var reactJsxRuntime_production_min = {};

  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReactJsxRuntime_production_min;

  function requireReactJsxRuntime_production_min () {
  	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  	hasRequiredReactJsxRuntime_production_min = 1;
  var f=React,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
  	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
  	return reactJsxRuntime_production_min;
  }

  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }

  var jsxRuntimeExports = jsxRuntime.exports;

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
  }function FaCheckCircle (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"},"child":[]}]})(props);
  }

  const CustomButtonItem = ({ layout = "below", disabled, onClick, children }) => {
      const Component = deckyFrontendLib.ButtonItem;
      return (jsxRuntimeExports.jsx(Component, { layout: layout, disabled: disabled, onClick: onClick, children: children }));
  };
  const Content = ({ serverAPI }) => {
      const [mode, setMode] = React.useState("loading"); // 'legacy', 'bootc', 'unset', 'loading'
      const [currentVersion, setCurrentVersion] = React.useState("");
      const [updateInfo, setUpdateInfo] = React.useState(null);
      const [isChecking, setIsChecking] = React.useState(false);
      const [isUpdating, setIsUpdating] = React.useState(false);
      const [statusMessage, setStatusMessage] = React.useState("");
      const loadModeAndStatus = async () => {
          try {
              const modeRes = await serverAPI.callPluginMethod("get_saved_mode", {});
              if (modeRes.success && typeof modeRes.result === "string") {
                  setMode(modeRes.result);
              }
              else {
                  setMode("legacy");
              }
              const verRes = await serverAPI.callPluginMethod("get_current_version", {});
              if (verRes.success && typeof verRes.result === "string") {
                  setCurrentVersion(verRes.result);
              }
              await checkUpdates();
          }
          catch (e) {
              setMode("legacy");
          }
      };
      const checkUpdates = async () => {
          setIsChecking(true);
          try {
              const checkRes = await serverAPI.callPluginMethod("check_github_update", {});
              if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
                  setUpdateInfo(checkRes.result);
                  if (checkRes.result.latest_version) {
                      setStatusMessage(`Última versão disponível no GitHub: ${checkRes.result.latest_version}`);
                  }
              }
              else {
                  const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
                  setStatusMessage(err || "Não foi possível verificar a API do GitHub.");
              }
          }
          catch (e) {
              setStatusMessage("Erro de comunicação com o GitHub.");
          }
          finally {
              setIsChecking(false);
          }
      };
      React.useEffect(() => {
          loadModeAndStatus();
      }, []);
      const handleSelectMode = async (selected) => {
          setMode(selected);
          setStatusMessage(`Modo alterado para: ${selected.toUpperCase()}`);
          await serverAPI.callPluginMethod("set_mode", { mode: selected });
      };
      const handleUpdate = async () => {
          if (mode === "unset") {
              setStatusMessage("Selecione primeiro se o seu sistema é Legacy ou Bootc!");
              return;
          }
          setIsUpdating(true);
          setStatusMessage(`Iniciando atualização via modo ${mode.toUpperCase()}... Isso pode levar alguns minutos.`);
          try {
              const res = await serverAPI.callPluginMethod("trigger_update", { method: mode });
              if (res.success && typeof res.result === "object" && res.result.success) {
                  setStatusMessage(res.result.message);
              }
              else {
                  const msg = res.result && typeof res.result === "object" ? res.result.message : undefined;
                  setStatusMessage(msg || "Ocorreu uma falha durante o processo de atualização.");
              }
          }
          catch (err) {
              setStatusMessage(`Erro crítico: ${err.message || err}`);
          }
          finally {
              setIsUpdating(false);
          }
      };
      // Se o usuário ainda não escolheu o modo na primeira vez
      if (mode === "unset") {
          return (jsxRuntimeExports.jsxs(deckyFrontendLib.PanelSection, { title: "Configura\u00E7\u00E3o Inicial", children: [jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: { fontSize: "13px", lineHeight: "1.4" }, children: ["Bem-vindo ao ", jsxRuntimeExports.jsx("strong", { children: "PS5 Bazzite Updater" }), "! Como seu sistema foi instalado?"] }) }), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { onClick: () => handleSelectMode("legacy"), children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }, children: [jsxRuntimeExports.jsx("span", { style: { fontWeight: "bold", color: "#e67e22" }, children: "M\u00E9todo Legacy (Recomendado para voc\u00EA)" }), jsxRuntimeExports.jsx("span", { style: { fontSize: "11px", opacity: 0.8 }, children: "Vers\u00E3o cl\u00E1ssica/antiga. Atualiza baixando o bundle oficial e rodando o script interno." })] }) }) }), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { onClick: () => handleSelectMode("bootc"), children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }, children: [jsxRuntimeExports.jsx("span", { style: { fontWeight: "bold", color: "#2ecc71" }, children: "M\u00E9todo Bootc" }), jsxRuntimeExports.jsxs("span", { style: { fontSize: "11px", opacity: 0.8 }, children: ["Para sistemas v2.5+ baseados em containers e gerenciados via ", jsxRuntimeExports.jsx("code", { children: "bootc upgrade" }), "."] })] }) }) })] }));
      }
      const dropdownOptions = [
          { data: "legacy", label: "Método Legacy (Scripts / Tarball)" },
          { data: "bootc", label: "Método Bootc (sudo bootc upgrade)" },
      ];
      return (jsxRuntimeExports.jsxs(deckyFrontendLib.PanelSection, { title: "PS5 Bazzite Updater", children: [jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(deckyFrontendLib.DropdownItem, { label: "Modo de Atualiza\u00E7\u00E3o", description: "Voc\u00EA pode alternar entre Legacy e Bootc quando quiser", rgOptions: dropdownOptions, selectedOption: mode, onChange: (opt) => handleSelectMode(opt.data) }) }), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }, children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Modo Ativo:" }), " ", jsxRuntimeExports.jsx("span", { style: { color: mode === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" }, children: mode.toUpperCase() })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Vers\u00E3o Instalada:" }), " ", currentVersion || "Identificando..."] }), updateInfo?.latest_version && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "\u00DAltima Vers\u00E3o Online:" }), " ", jsxRuntimeExports.jsx("span", { style: { color: "#3498db" }, children: updateInfo.latest_version })] }))] }) }), mode === "legacy" ? (jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: {
                          backgroundColor: "rgba(230, 126, 34, 0.15)",
                          border: "1px solid #e67e22",
                          borderRadius: "4px",
                          padding: "8px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "12px",
                      }, children: [jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { color: "#e67e22", marginTop: "2px", flexShrink: 0 } }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Modo Legacy selecionado:" }), " As atualiza\u00E7\u00F5es ser\u00E3o feitas baixando o pacote oficial de atualiza\u00E7\u00E3o da release (", jsxRuntimeExports.jsx("code", { children: "update.tar.xz" }), ") e executando o ", jsxRuntimeExports.jsx("code", { children: "update.sh" }), "."] })] }) })) : (jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: {
                          backgroundColor: "rgba(46, 204, 113, 0.15)",
                          border: "1px solid #2ecc71",
                          borderRadius: "4px",
                          padding: "8px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "12px",
                      }, children: [jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#2ecc71", marginTop: "2px", flexShrink: 0 } }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Modo Bootc selecionado:" }), " Atualiza\u00E7\u00F5es at\u00F4micas containerizadas via ", jsxRuntimeExports.jsx("code", { children: "bootc upgrade" }), "."] })] }) })), statusMessage && (jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx("div", { style: {
                          padding: "8px",
                          borderRadius: "4px",
                          backgroundColor: "rgba(52, 152, 219, 0.15)",
                          border: "1px solid #3498db",
                          fontSize: "12px",
                          whiteSpace: "pre-wrap",
                      }, children: statusMessage }) })), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { layout: "below", disabled: isChecking || isUpdating, onClick: checkUpdates, children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }, children: [jsxRuntimeExports.jsx(FaSync, {}), jsxRuntimeExports.jsx("span", { children: isChecking ? "Verificando..." : "Checar Atualizações" })] }) }) }), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { layout: "below", disabled: isUpdating || isChecking, onClick: handleUpdate, children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }, children: [jsxRuntimeExports.jsx(FaDownload, {}), jsxRuntimeExports.jsx("span", { children: isUpdating ? "Atualizando..." : `Atualizar Agora (${mode.toUpperCase()})` })] }) }) })] }));
  };
  var index = deckyFrontendLib.definePlugin((serverAPI) => {
      return {
          title: jsxRuntimeExports.jsx("div", { className: deckyFrontendLib.staticClasses.Title, children: "PS5 Updater" }),
          content: jsxRuntimeExports.jsx(Content, { serverAPI: serverAPI }),
          icon: jsxRuntimeExports.jsx(FaPlaystation, {}),
      };
  });

  return index;

})(SP_REACT, DFL);
