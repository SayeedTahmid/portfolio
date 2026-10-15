export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themepreferencechange";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

/**
 * Runs in <head> before first paint, so the page never flashes the wrong theme.
 * It sets two attributes on <html>:
 *   data-theme-preference: what the visitor chose (light | dark | system)
 *   data-theme:            what is actually shown (light | dark); CSS keys off this
 * It also follows OS changes while the preference is "system".
 * Keep this self-contained: it is serialised into an inline <script>.
 */
export const themeInitScript = `(function(){var d=document.documentElement;var p=null;try{p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(p!=="light"&&p!=="dark")p="system";d.dataset.themePreference=p;var m=window.matchMedia("(prefers-color-scheme: dark)");function a(){var q=d.dataset.themePreference;var k=q==="dark"||(q!=="light"&&m.matches);d.dataset.theme=k?"dark":"light";}a();m.addEventListener("change",a);})();`;

export function readThemePreference(): ThemePreference | null {
  const value = document.documentElement.dataset["themePreference"];
  return isThemePreference(value) ? value : null;
}

export function setThemePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The choice still applies to this page view.
  }
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset["themePreference"] = preference;
  root.dataset["theme"] =
    preference === "dark" || (preference === "system" && prefersDark)
      ? "dark"
      : "light";
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
