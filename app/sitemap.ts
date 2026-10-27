import type { MetadataRoute } from "next";

import { legalReady, site } from "@/lib/site-config";

/** Absolute URLs need the production domain; legal pages are listed only once they are final. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const pages = ["/", "/about", "/contact", ...(legalReady() ? ["/privacy", "/terms"] : [])];
  return pages.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
