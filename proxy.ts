import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

/**
 * Unknown project slugs get a real HTTP 404.
 *
 * With Cache Components, /projects/[slug] streams its static shell before the page
 * can call notFound(), which fixes the status at 200 (a "soft 404"). Next.js
 * documents checking the slug in Proxy, before rendering starts, as the way to
 * return a true 404. Known slugs pass straight through to their prerendered pages.
 */
const knownSlugs = new Set(projects.map((project) => project.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2] ?? "";
  if (knownSlugs.has(slug)) return NextResponse.next();
  // Rewriting to a path with no route renders app/not-found.tsx with status 404.
  return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = {
  matcher: "/projects/:slug",
};
