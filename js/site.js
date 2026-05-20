(function (global) {
  const MODULES = ["phoneme", "dictation", "note-taking"];

  /** Prefix before module folders, e.g. "" locally or "/lnb" on GitHub Pages. */
  function getSiteBasePath() {
    const parts = global.location.pathname.split("/").filter(Boolean);
    for (const moduleName of MODULES) {
      const moduleIndex = parts.indexOf(moduleName);
      if (moduleIndex > 0) {
        return `/${parts.slice(0, moduleIndex).join("/")}`;
      }
    }
    return "";
  }

  function joinUrl(...segments) {
    const path = segments.filter(Boolean).join("/");
    return `/${path}`.replace(/\/+/g, "/");
  }

  function moduleUrl(moduleName, path) {
    return joinUrl(getSiteBasePath(), moduleName, path);
  }

  function encodePath(path) {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join("/");
  }

  global.LnbSite = {
    MODULES,
    getSiteBasePath,
    moduleUrl,
    encodePath,
  };
})(window);
