type Theme = "light" | "dark";

export const getCurrentTheme = (): Theme => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") return theme;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};
