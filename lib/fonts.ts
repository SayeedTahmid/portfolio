import localFont from "next/font/local";

/**
 * Fonts are self-hosted from app/fonts (OFL-1.1, licences in app/fonts/licenses).
 * Local files keep builds independent of Google Fonts being reachable.
 */

/** UI text and headings. Variable: weight 400–700, width 75–100%. */
export const sans = localFont({
  src: "../app/fonts/InstrumentSans-Variable.woff2",
  variable: "--font-instrument-sans",
  weight: "400 700",
  display: "swap",
  // Declare the width axis so `font-stretch` maps onto it instead of being synthesised.
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

/** Long-form case-study prose. Variable: weight 200–900, optical size 8–60. */
export const serif = localFont({
  src: [
    { path: "../app/fonts/SourceSerif4-Variable.woff2", style: "normal" },
    {
      path: "../app/fonts/SourceSerif4-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-source-serif",
  weight: "200 900",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  // Only case-study pages use it, so don't preload it on every route.
  preload: false,
});

/** Code blocks only. */
export const mono = localFont({
  src: "../app/fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});
