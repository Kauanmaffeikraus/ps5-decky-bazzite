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
  }

  const CustomButtonItem = ({ layout = "below", disabled, onClick, children }) => {
      const Component = deckyFrontendLib.ButtonItem;
      return (jsxRuntimeExports.jsx(Component, { layout: layout, disabled: disabled, onClick: onClick, children: children }));
  };
  const Content = ({ serverAPI }) => {
      const [sysType, setSysType] = React.useState("Verificando...");
      const [currentVersion, setCurrentVersion] = React.useState("");
      const [updateInfo, setUpdateInfo] = React.useState(null);
      const [isChecking, setIsChecking] = React.useState(false);
      const [isUpdating, setIsUpdating] = React.useState(false);
      const [statusMessage, setStatusMessage] = React.useState("");
      const refreshStatus = async () => {
          setIsChecking(true);
          setStatusMessage("");
          try {
              const typeRes = await serverAPI.callPluginMethod("get_system_type", {});
              if (typeRes.success && typeof typeRes.result === "string") {
                  setSysType(typeRes.result);
              }
              const verRes = await serverAPI.callPluginMethod("get_current_version", {});
              if (verRes.success && typeof verRes.result === "string") {
                  setCurrentVersion(verRes.result);
              }
              const checkRes = await serverAPI.callPluginMethod("check_github_update", {});
              if (checkRes.success && typeof checkRes.result === "object" && checkRes.result) {
                  setUpdateInfo(checkRes.result);
                  if (checkRes.result.latest_version && verRes.result && checkRes.result.latest_version !== verRes.result) {
                      setStatusMessage(`Nova versão disponível: ${checkRes.result.latest_version}`);
                  }
              }
              else {
                  const err = checkRes.result && typeof checkRes.result === "object" ? checkRes.result.error : undefined;
                  setStatusMessage(err || "Não foi possível verificar a API do GitHub.");
              }
          }
          catch (e) {
              setStatusMessage("Erro de comunicação com o backend do plugin.");
          }
          finally {
              setIsChecking(false);
          }
      };
      React.useEffect(() => {
          refreshStatus();
      }, []);
      const handleUpdate = async () => {
          setIsUpdating(true);
          setStatusMessage(`Executando atualização via ${sysType.toUpperCase()}... Isso pode levar alguns minutos.`);
          try {
              const res = await serverAPI.callPluginMethod("trigger_update", { method: sysType });
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
      return (jsxRuntimeExports.jsxs(deckyFrontendLib.PanelSection, { title: "PS5 Bazzite Updater", children: [jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }, children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Tipo de Sistema:" }), " ", jsxRuntimeExports.jsx("span", { style: { color: sysType === "bootc" ? "#2ecc71" : "#e67e22", fontWeight: "bold" }, children: sysType.toUpperCase() })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Vers\u00E3o Instalada:" }), " ", currentVersion || "Identificando..."] }), updateInfo?.latest_version && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "\u00DAltima Vers\u00E3o Online:" }), " ", jsxRuntimeExports.jsx("span", { style: { color: "#3498db" }, children: updateInfo.latest_version })] }))] }) }), sysType === "legacy" && (jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsxs("div", { style: {
                          backgroundColor: "rgba(230, 126, 34, 0.15)",
                          border: "1px solid #e67e22",
                          borderRadius: "4px",
                          padding: "8px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "12px",
                      }, children: [jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { color: "#e67e22", marginTop: "2px", flexShrink: 0 } }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("strong", { children: "Aten\u00E7\u00E3o:" }), " Sua instala\u00E7\u00E3o \u00E9 Legacy. Vers\u00F5es modernas utilizam ", jsxRuntimeExports.jsx("code", { children: "bootc" }), " containerizado. A migra\u00E7\u00E3o completa exige regravar a imagem no drive."] })] }) })), statusMessage && (jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx("div", { style: {
                          padding: "8px",
                          borderRadius: "4px",
                          backgroundColor: "rgba(52, 152, 219, 0.15)",
                          border: "1px solid #3498db",
                          fontSize: "12px",
                          whiteSpace: "pre-wrap",
                      }, children: statusMessage }) })), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { layout: "below", disabled: isChecking || isUpdating, onClick: refreshStatus, children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }, children: [jsxRuntimeExports.jsx(FaSync, {}), jsxRuntimeExports.jsx("span", { children: isChecking ? "Verificando..." : "Checar Atualizações" })] }) }) }), jsxRuntimeExports.jsx(deckyFrontendLib.PanelSectionRow, { children: jsxRuntimeExports.jsx(CustomButtonItem, { layout: "below", disabled: isUpdating || isChecking, onClick: handleUpdate, children: jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }, children: [jsxRuntimeExports.jsx(FaDownload, {}), jsxRuntimeExports.jsx("span", { children: isUpdating ? "Atualizando..." : `Atualizar (${sysType.toUpperCase()})` })] }) }) })] }));
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
