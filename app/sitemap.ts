import type { MetadataRoute } from "next";

const BASE_URL = "https://www.devonhuntrealtor.com";

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/areas", changeFrequency: "monthly", priority: 0.8 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
] as const;

/**
 * app/sitemap.ts — served at /sitemap.xml.
 *
 * Make this `async` when town pages exist and pull the slugs from
 * areasData so the sitemap can't drift from what's actually routable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
