/**
 * BuildSync AI · components/Footer.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports SiteFooter, the footer at the bottom of every marketing page
 *   (homepage Block 16):
 *     - brand column: logo, tagline, four social icons
 *     - four link columns: Product, Solutions, Company, Support
 *     - bottom row: Privacy, Terms, AI Risk Disclosure, Cookie Preferences,
 *       the "EN · US" label and the visible copyright line
 *
 * WHAT IT IS FOR
 *   Site-wide secondary navigation and legal links (spec Block 16).
 *
 * NO "use client"
 *   This is a plain server component: it has no state and no browser-only code.
 *
 * USED BY
 *   app/(marketing)/layout.tsx.
 *
 * IF SOMETHING BREAKS
 *   - To change footer links edit COLS below. Each entry is [label, href].
 *   - A link shows a 404: only /demo and /features/simulation are not built yet (on
 *     purpose); the other pages are in lib/pages.ts. Compare and Pricing go to the
 *     homepage sections /#compare and /#pricing.
 *   - The four social links and "Cookie Preferences" are placeholders
 *     (href="#"). Put the real social profile URLs and the cookie settings
 *     action in when they exist.
 *   - The visible line "© 2026 BuildSync AI. All rights reserved." is public
 *     site copy taken from the spec. It is separate from the author/copyright
 *     header at the top of each source file.
 *   - Styles: app/globals.css under "footer". The grid is 5 columns on wide
 *     screens, 2 columns at 1100px and below, 1 column at 600px and below.
 */
import Link from "next/link";
import { Icon, Logo } from "./Icon";

// The four link columns: t = column title, l = list of [label, href].
const COLS = [
  { t: "Product", l: [["Workspace Tour", "/product"], ["Features", "/product#features"], ["Connectors", "/connectors"], ["Compare", "/#compare"], ["Pricing", "/#pricing"], ["Try the Demo", "/demo"]] },
  { t: "Solutions", l: [["Engineers", "/solutions/engineers"], ["Students", "/solutions/students"], ["Governments", "/solutions/government"], ["Disciplines", "/disciplines"], ["Pilot Program", "/government"]] },
  { t: "Company", l: [["About", "/company/about"], ["Careers", "/company/careers"], ["Newsroom", "/blog"], ["Trust Center", "/trust"], ["Contact Us", "/contact"]] },
  { t: "Support", l: [["Docs", "/learn"], ["Contact Support", "/contact"], ["Product Status", "/status"], ["Community", "/learn#community"], ["Education Support", "/education"]] },
];

/** The site footer. */
export function SiteFooter() {
  return (
    <footer className="foot-wrap">
      <div className="wrap foot-grid">
        {/* brand column: logo, tagline, social icons (placeholder links) */}
        <div className="foot-brand">
          <Logo />
          <p>Plans Checked Before They’re Submitted.</p>
          <div className="socials">
            {[["ig", "Instagram"], ["x", "X"], ["in", "LinkedIn"], ["mail", "Email"]].map(([i, n]) => (
              <a key={n} href="#" aria-label={n}><Icon name={i} size={18} /></a>
            ))}
          </div>
        </div>
        {/* the four link columns */}
        {COLS.map((c) => (
          <div key={c.t}>
            <h4>{c.t}</h4>
            <ul>{c.l.map(([n, h]) => <li key={n}><Link href={h}>{n}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      {/* legal row: legal links, region label, copyright */}
      <div className="wrap legal">
        <nav aria-label="Legal">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/ai-risk-disclosure">AI Risk Disclosure</Link>
          <a href="#">Cookie Preferences</a>
        </nav>
        <span className="loc">EN · US</span>
        <span>© 2026 BuildSync AI. All rights reserved.</span>
      </div>
    </footer>
  );
}
