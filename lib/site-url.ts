/**
 * The site's public origin, used for canonical URLs, Open Graph URLs, the sitemap
 * and robots.txt. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL       set this once you have a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL  set automatically by Vercel (the production
 *                                     *.vercel.app domain, also during preview builds)
 *   3. http://localhost:3000     local development
 */
export function getSiteUrl(): URL {
  const explicit = process.env["NEXT_PUBLIC_SITE_URL"];
  if (explicit) return new URL(explicit);
  const vercel = process.env["VERCEL_PROJECT_PRODUCTION_URL"];
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

/** True only for the production deployment on Vercel, or when no Vercel env is present but a site URL is set. */
export function isProductionDeployment(): boolean {
  const vercelEnv = process.env["VERCEL_ENV"];
  if (vercelEnv) return vercelEnv === "production";
  return Boolean(process.env["NEXT_PUBLIC_SITE_URL"]);
}
