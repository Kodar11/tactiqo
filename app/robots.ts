import type { MetadataRoute } from "next";

import { site } from "@/lib/site-config";

/** Until the production domain is configured, ask crawlers to stay away: a preview shouldn't be indexed. */
export default function robots(): MetadataRoute.Robots {
  if (!site.url) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
