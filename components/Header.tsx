/**
 * BuildSync AI · components/Header.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports the two things at the very top of every page:
 *     - AnnouncementBar: the thin dark strip ("Early access: ...") that visitors
 *       can dismiss. Dismissal is remembered in the browser.
 *     - SiteHeader: the sticky header with the logo, desktop menu with
 *       mega-menus, the search overlay, the language label, "Log in",
 *       "Try the demo" / "Start free" buttons, and the full-screen mobile menu.
 *   Internal: Mega (renders one mega-menu panel).
 *
 * WHAT IT IS FOR
 *   Site-wide navigation and the two main calls to action (spec section 2 and
 *   homepage Block 1). Menu content is NOT written here: it comes from the NAV
 *   list in lib/site.ts.
 *
 * WHY "use client"
 *   It needs React state, event listeners on window/document and localStorage,
 *   which only exist in the browser.
 *
 * USED BY
 *   app/(marketing)/layout.tsx (so every marketing page gets it).
 *
 * IF SOMETHING BREAKS
 *   - Announcement bar comes back after dismissing: the choice is saved in
 *     localStorage under the key "bs-ann" (value "1" = dismissed). It is read
 *     inside useEffect, not during render, so the server HTML and the first
 *     browser render match (prevents a hydration warning). Returning visitors
 *     can therefore see the bar for a split second. To test again, delete that
 *     key in the browser dev tools.
 *   - A mega-menu stays open: it closes on mouse-leave of the whole <header>,
 *     on the Escape key, and when hovering a plain link such as "Pricing".
 *   - Page cannot scroll after closing the search or mobile menu: the last
 *     useEffect in SiteHeader locks body scroll while either is open.
 *   - Types: Mega and the mobile menu read NAV through `any` casts, so TypeScript
 *     will not warn if the NAV shape in lib/site.ts changes.
 *   - Styling: classes (.ann, .hdr, .mega, .overlay, .sheet, ...) are in
 *     app/globals.css under "announcement" and "header". The desktop menu hides
 *     and the hamburger appears at 1100px wide and below.
 *   - Not wired yet: the search box has no search backend (the "recent" and
 *     "suggested" chips are fixed placeholders linking to /product), and the
 *     waitlist form only prevents the page reload; it sends nothing.
 *   - Routes /demo, /signup, /login and the menu pages do not exist yet (404).
 */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Icon, Logo } from "./Icon";

/**
 * The dismissible strip above the header (homepage Block 1).
 * `open` starts true; on mount it is switched off if the visitor dismissed it
 * before. The long text shows on desktop and the short text on phones (the
 * switch is done in CSS: .ann-long / .ann-short).
 */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  // Runs once in the browser: hide the bar if "bs-ann" is "1". The try/catch
  // protects against browsers where localStorage is blocked (private mode).
  useEffect(() => {
    try { if (localStorage.getItem("bs-ann") === "1") setOpen(false); } catch {}
  }, []);
  if (!open) return null;
  return (
    <div className="ann">
      <p>
        <span className="ann-long">Early access: the civil engineering workspace is open. </span>
        <span className="ann-short">Early access is open. </span>
        <Link href="/demo">Try the demo →</Link>
      </p>
      {/* dismiss button: hides the bar now and remembers it ("bs-ann" = "1") */}
      <button
        aria-label="Dismiss announcement"
        onClick={() => { setOpen(false); try { localStorage.setItem("bs-ann", "1"); } catch {} }}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

// One entry of NAV (see lib/site.ts).
type Item = (typeof NAV)[number];

/**
 * One desktop mega-menu panel (the white drop-down under the header).
 * Layout, left to right: the link columns, then either a spotlight card
 * (`spotlight`) or the waitlist form (`waitlist`), whichever the NAV entry has.
 * `any` is used because NAV is a read-only union (see note in the file header).
 */
function Mega({ item }: { item: Extract<Item, { cols: unknown }> }) {
  const it = item as any;
  return (
    <div className="mega" role="menu">
      <div className="mega-in">
        {/* link columns; links with `soon` get a "Coming soon" tag */}
        {it.cols.map((c: any) => (
          <div key={c.title} className="mega-col">
            <h4>{c.title}</h4>
            {c.links.map((l: any) => (
              <Link key={l.label} href={l.href} role="menuitem">
                {l.label}
                {l.soon && <em className="tag">Coming soon</em>}
              </Link>
            ))}
          </div>
        ))}
        {/* spotlight card on the right (Product, Solutions, Learn) */}
        {it.spotlight && (
          <Link href={it.spotlight.href} className="mega-spot">
            <strong>{it.spotlight.title}</strong>
            <span>{it.spotlight.body}</span>
            <Icon name="arrow" size={18} />
          </Link>
        )}
        {/* waitlist form on the right (Disciplines). Not connected to anything yet. */}
        {it.waitlist && (
          <form className="mega-wait" onSubmit={(e) => e.preventDefault()}>
            <strong>Join the waitlist</strong>
            <input type="email" placeholder="Email" aria-label="Email" />
            <select aria-label="Discipline" defaultValue="electrical">
              <option value="electrical">Electrical</option>
              <option value="mechanical">Mechanical</option>
              <option value="automotive">Automotive</option>
              <option value="aviation">Aviation</option>
            </select>
            <button className="btn btn-primary btn-sm">Join</button>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * The sticky site header, plus the search overlay and the mobile menu (both are
 * rendered right after the <header> and only exist while open).
 * State:
 *   shrunk  true after scrolling 24px down; makes the header 56px instead of 72px
 *   open    label of the mega-menu that is open on desktop (null = none)
 *   search  true while the full-screen search overlay is open
 *   mobile  true while the full-screen mobile menu is open
 *   acc     label of the expanded accordion section in the mobile menu
 */
export function SiteHeader() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);

  // Scroll listener: toggles `shrunk`. Runs once on mount so a page reloaded
  // part-way down starts in the right state; removed on unmount.
  useEffect(() => {
    const on = () => setShrunk(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Escape key closes any open menu, the search overlay and the mobile menu.
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setSearch(false); setMobile(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  // Lock page scrolling while the search overlay or mobile menu is open.
  useEffect(() => { document.body.style.overflow = mobile || search ? "hidden" : ""; }, [mobile, search]);

  return (
    <>
      {/* leaving the header with the mouse closes any open mega-menu */}
      <header className={`hdr ${shrunk ? "hdr-s" : ""}`} onMouseLeave={() => setOpen(null)}>
        <div className="hdr-in">
          <Link href="/" aria-label="BuildSync home"><Logo /></Link>
          {/* desktop menu: dropdown entries (with `cols`) vs plain links */}
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) =>
              "cols" in n ? (
                <div key={n.label} className="nav-i" onMouseEnter={() => setOpen(n.label)}>
                  <button
                    aria-expanded={open === n.label}
                    onClick={() => setOpen(open === n.label ? null : n.label)}
                    onFocus={() => setOpen(n.label)}
                  >
                    {n.label}<Icon name="chev" size={14} />
                  </button>
                  {open === n.label && <Mega item={n as any} />}
                </div>
              ) : (
                <Link key={n.label} href={n.href} className="nav-l" onMouseEnter={() => setOpen(null)}>{n.label}</Link>
              )
            )}
          </nav>
          {/* right side: search, language label, log in, and the two CTAs.
              Hidden below 1100px (the hamburger takes over). */}
          <div className="hdr-r">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><Icon name="search" /></button>
            <button className="loc" aria-label="Language and region">EN · US</button>
            <Link href="/login" className="nav-l">Log in</Link>
            <Link href="/demo" className="btn btn-secondary btn-sm">Try the demo</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Start free</Link>
          </div>
          {/* hamburger: only visible on small screens; opens the mobile menu */}
          <button className="icon-btn burger" aria-label="Open menu" onClick={() => setMobile(true)}><Icon name="menu" size={24} /></button>
        </div>
      </header>

      {/* search overlay (full screen). Placeholder content: no real search yet. */}
      {search && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Search">
          <div className="overlay-in">
            <div className="search-row">
              <Icon name="search" size={24} />
              <input autoFocus placeholder="Search features, pages, building codes" aria-label="Search" />
              <button className="icon-btn" aria-label="Close search" onClick={() => setSearch(false)}><Icon name="close" /></button>
            </div>
            <h4>Recent searches</h4>
            <div className="chips">
              {["Hurricane stress test", "Section 5 permit check", "Prompt-to-Plan", "Student access"].map((s) => (
                <Link key={s} href="/product" className="chip" onClick={() => setSearch(false)}>{s}</Link>
              ))}
            </div>
            <h4>Suggested</h4>
            <div className="chips">
              {["Code compliance", "Scheduling", "Pricing", "Connectors", "Government"].map((s) => (
                <Link key={s} href="/product" className="chip" onClick={() => setSearch(false)}>{s}</Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* mobile menu (full screen): accordion sections, then "Log in", with the
          two CTAs pinned at the bottom. Every link closes the menu. */}
      {mobile && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="sheet-top">
            <Logo />
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMobile(false)}><Icon name="close" size={24} /></button>
          </div>
          <div className="sheet-body">
            {NAV.map((n) =>
              "cols" in n ? (
                <div key={n.label} className="acc">
                  <button aria-expanded={acc === n.label} onClick={() => setAcc(acc === n.label ? null : n.label)}>
                    {n.label}<Icon name="chev" size={18} />
                  </button>
                  {/* all links of all columns, flattened into one list */}
                  {acc === n.label && (
                    <div className="acc-p">
                      {(n as any).cols.flatMap((c: any) => c.links).map((l: any) => (
                        <Link key={l.label} href={l.href} onClick={() => setMobile(false)}>{l.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.label} href={n.href} className="acc-l" onClick={() => setMobile(false)}>{n.label}</Link>
              )
            )}
            <Link href="/login" className="acc-l" onClick={() => setMobile(false)}>Log in</Link>
          </div>
          <div className="sheet-cta">
            <Link href="/demo" className="btn btn-secondary">Try the demo</Link>
            <Link href="/signup" className="btn btn-primary">Start free</Link>
          </div>
        </div>
      )}
    </>
  );
}
