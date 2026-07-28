import type { Metadata, Viewport } from "next";

const SITE_URL = "https://www.devonhuntrealtor.com";
const NAME = "Devon Hunt";
const TITLE = "Devon Hunt — Massachusetts Realtor\u00AE";
const DESCRIPTION =
  "Devon Hunt, Accredited Buyer's Representative with The Proper Nest Real Estate. Helping buyers, sellers, and renters across the North Shore and Greater Boston since 2020.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    // Every other page supplies only its own name.
    template: `%s — ${NAME}, MA Realtor\u00AE`,
  },
  description: DESCRIPTION,
  applicationName: "Devon Hunt Realtor",
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: "The Proper Nest Real Estate",
  category: "real estate",

  // Lighthouse SEO wants a self-referencing canonical on every page.
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Devon Hunt — MA Realtor\u00AE",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    // Resolved from app/opengraph-image.jpg — see notes.
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },

  manifest: "/manifest.webmanifest",

  // Phone numbers should stay tappable; only email/address autolinking off.
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },

  other: { "fb:app_id": "583844026116727" },
};

/**
 * themeColor and colorScheme belong on `viewport`, not `metadata` —
 * Next 14 moved them and warns at build time if they're in the wrong place.
 *
 * Note there is no maximumScale or userScalable here on purpose: setting
 * either fails the Lighthouse accessibility audit for blocking zoom.
 */
export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};
