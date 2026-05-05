import themeConfig from "./theme.json";

const toKebabCase = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const setCssVariablesFromTheme = (theme) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const walk = (obj, path = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const nextPath = [...path, key];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, nextPath);
        return;
      }

      if (typeof value !== "string" && typeof value !== "number") return;

      const [first, ...rest] = nextPath;
      let base;

      switch (first) {
        case "colors":
          base = "color";
          break;
        case "fonts":
          base = "font";
          break;
        case "borderRadius":
          base = "border-radius";
          break;
        default:
          base = toKebabCase(first);
      }

      const restKebab = rest.map(toKebabCase);
      const varName = `--${[base, ...restKebab].filter(Boolean).join("-")}`;
      root.style.setProperty(varName, String(value));
    });
  };

  walk(theme);
};

export const initTheme = () => {
  const theme = themeConfig;

  setCssVariablesFromTheme(theme);

  const colors = theme.colors || {};
  const fonts = theme.fonts || {};
  const borderRadius = theme.borderRadius || {};

  const THEME = {
    // flattened color keys for easy access: THEME.primary, THEME.primaryStrong, etc.
    ...colors,
    colors,
    fonts,
    borderRadius,
    raw: theme,
  };

  if (typeof window !== "undefined") {
    window.THEME = THEME;
  }

  return THEME;
};

export const themeTokens = (() => {
  const theme = themeConfig;
  const colors = theme.colors || {};
  const fonts = theme.fonts || {};
  const antd = theme.antd || {};

  return {
    primary: colors.primary || "#a86c2f",
    borderRadius: antd.borderRadius ?? 8,
    fontFamily: antd.fontFamily || fonts.familyBase || "Inter, sans-serif",
  };
})();