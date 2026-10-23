/**
 * BuildSync AI · app/layout.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   The ROOT layout required by Next.js (App Router). It wraps every page of the
 *   site and:
 *     - sets the page language (<html lang="en">)
 *     - loads the global stylesheet (app/globals.css)
 *     - loads the two web fonts (Inter and IBM Plex Mono) from Google Fonts
 *     - defines the default page title, description and share-card
 *       (Open Graph / Twitter) metadata
 *
 * WHAT IT IS FOR
 *   One place for everything that must exist exactly once per page: the <html>
 *   and <body> tags, global CSS, fonts and default search/share metadata.
 *
 * USED BY
 *   Next.js loads it automatically for every route. The header and footer are
 *   NOT here; they live in app/(marketing)/layout.tsx.
 *
 * IF SOMETHING BREAKS
 *   - Text shows in a system font: the Google Fonts request failed (offline or
 *     blocked). The font stacks in app/globals.css (--sans, --mono) list
 *     fallbacks, so the page still works. `display=swap` shows fallback text
 *     first, then swaps.
 *   - Fonts are loaded with a plain <link>, not next/font, so the build never
 *     needs the internet.
 *   - Wrong title or preview card: edit `title`, `description` and `metadata`
 *     below. A page can override them by exporting its own `metadata`.
 *     `metadataBase` is what turns relative URLs in metadata into full
 *     https://buildsync.ai URLs.
 *   - No share image yet: the spec asks for a 1200x630 workspace image
 *     (openGraph images). None is set, so share cards show text only.
 */
import type { Metadata } from "next";
import "./globals.css";

// Default title and description (also reused for Open Graph and Twitter cards).
const title = "BuildSync AI — Check every plan against code";
const description =
  "BuildSync AI reads your drawings, checks them against your jurisdiction's building code, and turns them into a schedule, budget and stress-tested 3D model.";

// Default metadata for every page: <title>, <meta description>, the Open Graph
// card (Facebook, LinkedIn, Slack...) and the Twitter/X card.
export const metadata: Metadata = {
  metadataBase: new URL("https://buildsync.ai"),
  title,
  description,
  openGraph: { title, description, url: "https://buildsync.ai", siteName: "BuildSync AI", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * The root layout: <html> and <body> around whatever page is being shown
 * (`children`). The <link> tags speed up and load the Google Fonts CSS
 * (Inter 400-700 and IBM Plex Mono 400-500).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
