/**
 * BuildSync AI · app/(marketing)/[...slug]/page.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   The route for every INFORMATION PAGE except the homepage. "[...slug]" is a
 *   Next.js "catch-all" folder: /product, /features/compliance, /legal/privacy
 *   and so on all land here, and `slug` is the list of path pieces
 *   (["features", "compliance"]). The page looks its content up in PAGES
 *   (lib/pages.ts) and draws it with <InfoPage />.
 *
 * WHAT IT IS FOR
 *   Gives all the pages that used to show a 404 a real route with one small file.
 *   The page title and description for search and share cards are created here
 *   from the same entry.
 *
 * NO "use client"
 *   This is a server component. The pages are generated once at build time.
 *
 * HOW A ROUTE IS ADDED, CHANGED OR REMOVED
 *   - Add: add an entry to PAGE_LIST in lib/pages.ts (nothing to change here).
 *   - Give one page its own layout: create its own folder with a page.tsx (for
 *     example app/(marketing)/demo/page.tsx). An explicit folder always wins over
 *     this catch-all, so the entry in lib/pages.ts can then be deleted.
 *   - /demo and /features/simulation are NOT in lib/pages.ts on purpose, so they
 *     still show the 404 page until their own pages are built.
 *
 * IF SOMETHING BREAKS
 *   - A page shows a 404: its path is not in PAGES (see lib/pages.ts). With
 *     `dynamicParams = false` any other address is a 404 by design.
 *   - Next.js 15 passes `params` as a Promise, which is why it is awaited.
 *   - The homepage is NOT served from here: it is app/(marketing)/page.tsx.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/InfoPage";
import { PAGES } from "@/lib/pages";

// Only the addresses listed by generateStaticParams exist; everything else is a 404.
export const dynamicParams = false;

/** Tells Next.js which addresses to build: one per entry of PAGES. */
export function generateStaticParams() {
  return Object.keys(PAGES).map((path) => ({ slug: path.split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

/** Browser-tab title, search description and share cards for the page being shown. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug.join("/")];
  if (!page) return {};
  const title = `${page.title} — BuildSync AI`;
  const url = `https://buildsync.ai/${page.path}`;
  return {
    title,
    description: page.description,
    openGraph: { title, description: page.description, url, siteName: "BuildSync AI", type: "website" },
    twitter: { card: "summary_large_image", title, description: page.description },
  };
}

/** Draws the information page for this address, or the 404 page. */
export default async function InfoRoute({ params }: Props) {
  const { slug } = await params;
  const page = PAGES[slug.join("/")];
  if (!page) notFound();
  return <InfoPage page={page} />;
}
