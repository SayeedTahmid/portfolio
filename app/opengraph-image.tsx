import { site } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = `${site.name}: ${site.positioning}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.role,
    title: site.headline,
    subtitle: site.positioning,
  });
}
