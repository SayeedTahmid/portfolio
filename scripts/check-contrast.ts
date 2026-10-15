/**
 * Measures WCAG 2.2 contrast for every colour pair the site uses, in both themes,
 * using the token values in app/globals.css.
 * Run: npm run check:contrast   (part of `npm run check`)
 *
 * Thresholds: 4.5:1 for normal text (1.4.3), 3:1 for focus indicators, control
 * outlines and other meaningful non-text graphics (1.4.11).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Theme = Record<string, string>;

const css = readFileSync(
  join(import.meta.dirname, "..", "app", "globals.css"),
  "utf8",
);

function parseTokens(block: string): Theme {
  const tokens: Theme = {};
  for (const [, name, hex] of block.matchAll(
    /--([a-z-]+):\s*(#[0-9a-f]{6})\s*;/gi,
  )) {
    if (name && hex) tokens[name] = hex.toLowerCase();
  }
  return tokens;
}

function block(pattern: RegExp, label: string): Theme {
  const match = css.match(pattern);
  if (!match?.[1]) throw new Error(`Could not find the ${label} token block`);
  return parseTokens(match[1]);
}

const light = block(/:root\s*\{([^}]*--canvas[^}]*)\}/, "light");
const dark = block(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/, "dark");
const noJsDark = block(
  /:root:not\(\[data-theme\]\)\s*\{([^}]*)\}/,
  "no-JavaScript dark",
);

function luminance(hex: string): number {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT = 4.5;
const NON_TEXT = 3;
const backgrounds = ["canvas", "surface", "surface-raised", "soft"];

/** [foreground, background, minimum, what it is] */
const pairs: Array<[string, string, number, string]> = [
  ...backgrounds.flatMap((bg): Array<[string, string, number, string]> => [
    ["fg", bg, TEXT, "primary text"],
    ["fg-muted", bg, TEXT, "secondary text"],
    ["accent", bg, TEXT, "link text"],
    ["accent-strong", bg, TEXT, "link text, hover"],
    ["focus", bg, NON_TEXT, "focus ring"],
  ]),
  ["on-btn", "btn", TEXT, "primary button label"],
  ["on-btn", "btn-hover", TEXT, "primary button label, hover"],
  ["btn", "canvas", NON_TEXT, "primary button fill against page"],
  ["btn", "surface", NON_TEXT, "selected theme option against header"],
  ["line-control", "canvas", NON_TEXT, "control outline"],
  ["line-control", "surface", NON_TEXT, "control outline on cards/menus"],
  ["line-control", "surface-raised", NON_TEXT, "control outline in menu"],
  ["fg-muted", "surface", NON_TEXT, "unselected icon"],
];

let failures = 0;
for (const [name, theme] of [
  ["light", light],
  ["dark", dark],
] as const) {
  console.log(`\n${name} theme`);
  for (const [fg, bg, min, what] of pairs) {
    const f = theme[fg];
    const b = theme[bg];
    if (!f || !b) {
      console.log(`  MISSING  --${fg} or --${bg}`);
      failures++;
      continue;
    }
    const r = ratio(f, b);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  ${what}`,
    );
  }
}

const drift = Object.keys(dark).filter((k) => dark[k] !== noJsDark[k]);
if (drift.length > 0) {
  failures++;
  console.log(
    `\nFAIL  no-JavaScript dark block differs from the dark theme: ${drift.join(", ")}`,
  );
}

console.log(
  `\n${pairs.length * 2} pairs checked, ${failures} failure(s)${drift.length ? "" : "; no-JS dark block matches"}`,
);
process.exit(failures > 0 ? 1 : 0);
