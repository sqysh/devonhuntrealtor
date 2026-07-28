import type { MetadataRoute } from "next";

const BASE_URL = "https://www.devonhuntrealtor.com";

/** app/robots.ts — served at /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The routes the Header and Footer already render nothing for.
      disallow: ["/admin/", "/auth/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
