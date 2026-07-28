import type { MetadataRoute } from "next";

/** app/manifest.ts — Next serves this at /manifest.webmanifest */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devon Hunt — Massachusetts Realtor",
    short_name: "Devon Hunt",
    description:
      "Buying, selling, and renting across the North Shore and Greater Boston.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e8458b",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
