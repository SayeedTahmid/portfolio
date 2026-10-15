import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Social preview images: 1200 × 630, the size Open Graph and X/Twitter expect. */
export const ogSize = { width: 1200, height: 630 };

// Geist (SIL OFL 1.1, see ./fonts/Geist-OFL.txt), read once at module scope.
const fontDir = join(process.cwd(), "lib", "og", "fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-SemiBold.ttf")),
]);

// Dark-theme tokens from app/globals.css.
const colors = {
  canvas: "#101923",
  surface: "#182330",
  fg: "#E8EEF5",
  muted: "#B2C0CF",
  accent: "#A9C8E8",
  line: "#344355",
};

type OgImageProps = {
  /** Small line above the title, e.g. the category. */
  eyebrow: string;
  title: string;
  /** Line under the title. */
  subtitle?: string;
};

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: OgImageProps) {
  const [regular, semibold] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: colors.canvas,
        color: colors.fg,
        fontFamily: "Geist",
        border: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 28, color: colors.accent }}>{eyebrow}</div>
        <div
          style={{
            marginTop: 28,
            fontSize: title.length > 48 ? 60 : 72,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: colors.muted,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${colors.line}`,
          paddingTop: 28,
          fontSize: 26,
          color: colors.muted,
        }}
      >
        <div style={{ fontWeight: 600, color: colors.fg }}>
          Syed Tahmid Manzoor
        </div>
        <div>Software engineer</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
