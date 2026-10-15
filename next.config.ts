import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16.4 defaults: static shell prerendering + one prefetch per route.
  cacheComponents: true,
  partialPrefetching: true,

  // Type-check every <Link href>, so a link to a route that doesn't exist fails the build.
  typedRoutes: true,

  poweredByHeader: false,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
