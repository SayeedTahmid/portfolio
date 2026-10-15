import { cx } from "@/lib/cx";

/**
 * The hero's single visual accent: nested contour outlines inside viewer-style
 * corner brackets, echoing segmentation masks. Purely decorative (aria-hidden);
 * it does not depict any real scan or result. Each contour draws once on load,
 * and appears fully drawn under prefers-reduced-motion (see globals.css).
 */
export function ContourFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      className={cx("text-accent", className)}
    >
      <g
        fill="none"
        style={{ stroke: "var(--line-control)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M24 64V24h40M336 24h40v40M376 336v40h-40M64 376H24v-40" />
      </g>
      <g fill="none" stroke="currentColor" strokeLinejoin="round">
        <path
          className="contour-draw"
          pathLength={1}
          strokeWidth="1.5"
          strokeOpacity="0.45"
          style={{ fill: "var(--soft)" }}
          d="M182 58C232 44 300 70 326 118c24 44 46 78 26 130-18 48-56 96-116 102-54 6-86-24-124-36-42-14-66-60-56-110 8-44-4-84 30-112 28-22 62-24 96-34Z"
        />
        <path
          className="contour-draw"
          pathLength={1}
          strokeWidth="1.75"
          strokeOpacity="0.75"
          d="M214 110c44-6 86 28 86 76 0 40-18 80-60 94-36 12-80 4-98-32-18-34-6-70 12-98 16-24 34-36 60-40Z"
        />
        <path
          className="contour-draw"
          pathLength={1}
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.12"
          d="M232 150c30-2 48 20 44 50-4 28-24 46-50 44-26-2-42-22-38-48 4-24 18-44 44-46Z"
        />
      </g>
    </svg>
  );
}
