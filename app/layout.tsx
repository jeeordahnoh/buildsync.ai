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
 *     - loads the fonts (Inter and IBM Plex Mono) from this project's own files
 *     - loads the global stylesheet (app/globals.css)
 *     - declares the page as light-only (color-scheme) for dark-mode browsers
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
 *   - Text shows in a system font: the font files did not load. The fonts come
 *     from the npm packages @fontsource-variable/inter and
 *     @fontsource/ibm-plex-mono (served from this site, not from Google), so run
 *     `npm install`. The font stacks in app/globals.css (--sans, --mono) list
 *     fallbacks, so the page still works, and `font-display: swap` (set by the
 *     packages) shows fallback text first, then swaps. Fonts are self-hosted so
 *     the page never waits on, or leaks visitor IPs to, a third-party font
 *     server (which some networks and countries block).
 *   - Inter is the "Inter Variable" family (one file for every weight); IBM Plex
 *     Mono is loaded for weights 400 and 500 only. Using another weight of Plex
 *     Mono means importing its CSS here too.
 *   - Wrong title or preview card: edit `title`, `description` and `metadata`
 *     below. A page can override them by exporting its own `metadata`.
 *     `metadataBase` is what turns relative URLs in metadata into full
 *     https://buildsync.ai URLs.
 *   - No share image yet: the spec asks for a 1200x630 workspace image
 *     (openGraph images). None is set, so share cards show text only.
 *   - Browser-tab and phone home-screen icons come from the files app/icon.svg,
 *     app/favicon.ico and app/apple-icon.png (Next.js finds them by file name).
 *   - Zoom is never disabled: `viewport` only sets color-scheme, and Next.js adds
 *     the standard width=device-width, initial-scale=1 itself.
 */
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";            // Inter, one variable file for weights 100-900 (family "Inter Variable")
import "@fontsource/ibm-plex-mono/400.css";     // IBM Plex Mono regular
import "@fontsource/ibm-plex-mono/500.css";     // IBM Plex Mono medium
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

// Viewport settings. colorScheme "light" tells browsers the site is light only, so a
// phone or laptop in dark mode does not darken form fields, scrollbars or the page.
export const viewport: Viewport = { colorScheme: "light" };

/**
 * The root layout: <html> and <body> around whatever page is being shown
 * (`children`).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
