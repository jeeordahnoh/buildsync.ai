import Link from "next/link";
import { Icon, Logo } from "./Icon";

const COLS = [
  { t: "Product", l: [["Workspace tour", "/product"], ["Features", "/product#features"], ["Connectors", "/connectors"], ["Compare", "/compare"], ["Pricing", "/pricing"], ["Try the demo", "/demo"]] },
  { t: "Solutions", l: [["Engineers", "/solutions/engineers"], ["Students", "/solutions/students"], ["Governments", "/solutions/government"], ["Disciplines", "/disciplines"], ["Pilot program", "/government"]] },
  { t: "Company", l: [["About", "/company/about"], ["Careers", "/company/careers"], ["Newsroom", "/blog"], ["Trust center", "/trust"], ["Contact us", "/contact"]] },
  { t: "Support", l: [["Docs", "/learn"], ["Contact support", "/contact"], ["Product status", "/status"], ["Community", "/learn#community"], ["Education support", "/education"]] },
];

export function SiteFooter() {
  return (
    <footer className="foot-wrap">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Logo />
          <p>Plans checked before they’re submitted.</p>
          <div className="socials">
            {[["ig", "Instagram"], ["x", "X"], ["in", "LinkedIn"], ["mail", "Email"]].map(([i, n]) => (
              <a key={n} href="#" aria-label={n}><Icon name={i} size={18} /></a>
            ))}
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.t}>
            <h4>{c.t}</h4>
            <ul>{c.l.map(([n, h]) => <li key={n}><Link href={h}>{n}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="wrap legal">
        <nav aria-label="Legal">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/ai-risk-disclosure">AI Risk Disclosure</Link>
          <a href="#">Cookie preferences</a>
        </nav>
        <span className="loc">EN · US</span>
        <span>© 2026 BuildSync AI. All rights reserved.</span>
      </div>
    </footer>
  );
}
