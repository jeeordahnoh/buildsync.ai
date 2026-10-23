/**
 * BuildSync AI · app/(marketing)/layout.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   The layout shared by every public marketing page. From top to bottom it
 *   renders: AnnouncementBar, SiteHeader, the page itself inside <main>, and
 *   SiteFooter.
 *
 * WHAT IT IS FOR
 *   The spec (section 1) says all marketing pages live in `app/(marketing)/`
 *   and share one header and footer. The folder name in parentheses is a Next.js
 *   "route group": it organises files and shares this layout but does NOT appear
 *   in the URL (app/(marketing)/page.tsx is "/", not "/(marketing)").
 *
 * USED BY
 *   Next.js applies it automatically to every page inside app/(marketing)/.
 *   It sits inside the root layout (app/layout.tsx).
 *
 * IF SOMETHING BREAKS
 *   - Header or footer appears twice: a page is rendering its own copy. Pages
 *     should not include them.
 *   - A new page has no header/footer: it was created outside app/(marketing)/.
 *   - Login and signup screens may later want NO header/footer; put those in
 *     a different route group instead of here.
 */
import { AnnouncementBar, SiteHeader } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";

/** Wraps a marketing page (`children`) with the shared header and footer. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
