import type { Metadata } from "next";
import { site } from "@/content/site";

const siteImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.positioning}`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path of the page, e.g. "/projects". Used for the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  /**
   * "site" (default) names the site-wide share card. Use "own" for routes with
   * their own opengraph-image file; naming the site card there would replace it.
   */
  image?: "site" | "own";
};

/**
 * Per-page metadata. Next.js merges `openGraph` and `twitter` shallowly, so a page
 * that sets only some fields would otherwise inherit the homepage's og:url and
 * X/Twitter text. This helper sets every field that must change per page.
 *
 * Images: a page-level openGraph object replaces the inherited one, including the
 * root opengraph-image, so the site-wide card is named explicitly. Routes with their
 * own opengraph-image file pass image: "own" and keep it.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "site",
}: PageMetadataInput): Metadata {
  const images = image === "site" ? { images: [siteImage] } : {};
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_US",
      url: path,
      title,
      description,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...images,
    },
  };
}
