"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Icon, Logo } from "./Icon";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
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
      <button
        aria-label="Dismiss announcement"
        onClick={() => { setOpen(false); try { localStorage.setItem("bs-ann", "1"); } catch {} }}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

type Item = (typeof NAV)[number];

function Mega({ item }: { item: Extract<Item, { cols: unknown }> }) {
  const it = item as any;
  return (
    <div className="mega" role="menu">
      <div className="mega-in">
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
        {it.spotlight && (
          <Link href={it.spotlight.href} className="mega-spot">
            <strong>{it.spotlight.title}</strong>
            <span>{it.spotlight.body}</span>
            <Icon name="arrow" size={18} />
          </Link>
        )}
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

export function SiteHeader() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setShrunk(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setSearch(false); setMobile(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => { document.body.style.overflow = mobile || search ? "hidden" : ""; }, [mobile, search]);

  return (
    <>
      <header className={`hdr ${shrunk ? "hdr-s" : ""}`} onMouseLeave={() => setOpen(null)}>
        <div className="hdr-in">
          <Link href="/" aria-label="BuildSync home"><Logo /></Link>
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
          <div className="hdr-r">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><Icon name="search" /></button>
            <button className="loc" aria-label="Language and region">EN · US</button>
            <Link href="/login" className="nav-l">Log in</Link>
            <Link href="/demo" className="btn btn-secondary btn-sm">Try the demo</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Start free</Link>
          </div>
          <button className="icon-btn burger" aria-label="Open menu" onClick={() => setMobile(true)}><Icon name="menu" size={24} /></button>
        </div>
      </header>

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
