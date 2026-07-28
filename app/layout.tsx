import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutWrapper } from "./(public)/(home)/root-layout";
import { siteMetadata, siteViewport } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";

// `variable` rather than `className` — globals.css maps --font-body into
// the Tailwind theme, so the utility `font-sans` resolves to Inter.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
        <JsonLd />
      </body>
    </html>
  );
}
