import { projects } from "../content/projects.ts";

/** Every page on the site. The a11y and layout suites run against all of them. */
export const staticRoutes = [
  "/",
  "/projects",
  "/about",
  ...projects.map((project) => `/projects/${project.slug}`),
  // The 404 page, reached through an unknown project slug.
  "/projects/does-not-exist",
];
