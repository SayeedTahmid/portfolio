"use client";

import { useId, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import {
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  isThemePreference,
  readThemePreference,
  setThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const options: ReadonlyArray<{
  value: ThemePreference;
  label: string;
  Icon: LucideIcon;
}> = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

function subscribe(onChange: () => void) {
  // Another tab changed the theme: apply it here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      setThemePreference(
        isThemePreference(event.newValue) ? event.newValue : "system",
      );
    }
  };
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Light / Dark / System as native radio buttons, so arrow keys and screen readers work without custom code. */
export function ThemeSwitcher() {
  // The server can't know the visitor's choice, so nothing is checked until hydration.
  const preference = useSyncExternalStore(
    subscribe,
    readThemePreference,
    () => null,
  );
  // The header (desktop) and the mobile menu each render a switcher; separate names keep them separate radio groups.
  const groupName = useId();

  return (
    <fieldset className="flex items-center gap-0.5 rounded-sm border border-line-strong p-0.5">
      <legend className="sr-only">Color theme</legend>
      {options.map(({ value, label, Icon }) => (
        <label
          key={value}
          title={label}
          className="grid size-8 cursor-pointer place-items-center rounded-[3px] text-fg-muted transition-colors hover:text-fg has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus"
        >
          <input
            type="radio"
            name={groupName}
            value={value}
            checked={preference === value}
            onChange={() => setThemePreference(value)}
            className="sr-only"
          />
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
          <span className="sr-only">{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
