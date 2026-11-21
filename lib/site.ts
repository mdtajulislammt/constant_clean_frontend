/**
 * Public base URL of the deployed site (used for metadataBase, Open Graph and JSON-LD).
 * 1. NEXT_PUBLIC_SITE_URL (set it in Vercel → Settings → Environment Variables)
 * 2. Vercel's production domain (VERCEL_PROJECT_PRODUCTION_URL, set automatically on Vercel)
 * 3. Local dev server
 * The future real domain stays in lib/config.ts → business.siteUrl; point NEXT_PUBLIC_SITE_URL at it once it's live.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3010")
).replace(/\/+$/, "");

/** Absolute URL for a site path, e.g. absoluteUrl("/images/og.png"). */
export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
