/**
 * BuildSync AI · components/InfoPage.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports InfoPage: draws ONE information page from its entry in lib/pages.ts.
 *   From top to bottom: a grey page header (breadcrumbs, small label, heading,
 *   intro, optional buttons and draft notice), then every `section` of the page
 *   in order, then a "Related" row of cards, then the dark call-to-action band.
 *   Section kinds: cards, steps, checks (tick list), prose, stats, sample (a
 *   sample-result panel), pills, widget (showcase, feature cards, discipline
 *   tiles, newsletter) and form.
 *
 * WHAT IT IS FOR
 *   Gives every page that used to show a 404 the same look as the homepage
 *   without a separate layout per page. Wording lives in lib/pages.ts; styles are
 *   in app/globals.css under "Information pages".
 *
 * NO "use client"
 *   This is a server component. The interactive pieces it uses (Showcase,
 *   Newsletter, InfoForm) are client components that declare "use client".
 *
 * USED BY
 *   app/(marketing)/[...slug]/page.tsx.
 *
 * IF SOMETHING BREAKS
 *   - Backgrounds: plain sections alternate white and light grey (`sec` /
 *     `sec-alt`); "prose" sections stay white and tight (legal pages); the
 *     showcase widget is a black band. The page header is grey, so the first
 *     section is white.
 *   - A card is not a link: it has no `href` in lib/pages.ts. Cards with an `id`
 *     are anchor targets (for example /product#whats-new).
 *   - A link goes to a 404: /demo and /features/simulation are not built yet (on
 *     purpose); every other link on these pages points at a page in lib/pages.ts
 *     or at the homepage sections /#compare and /#pricing.
 *   - `data-track` values are labels for future analytics; no tracking script
 *     reads them yet.
 */
import Link from "next/link";
import { DISCIPLINES, FEATURES } from "@/lib/site";
import { PAGES, type Card, type PageDef, type Section } from "@/lib/pages";
import { Icon } from "./Icon";
import { Showcase } from "./Showcase";
import { Newsletter } from "./Newsletter";
import { InfoForm } from "./InfoForm";

/** A grid of cards. A card with `href` is one big link; one with `id` is an anchor target. */
function CardGrid({ items, cols = 3 }: { items: Card[]; cols?: 2 | 3 }) {
  return (
    <ul className={`igrid cols-${cols}`}>
      {items.map((c) => {
        const inner = (
          <>
            {c.icon && <span className="tile-ico"><Icon name={c.icon} /></span>}
            <h3>{c.title}{c.tag && <em className="tag">{c.tag}</em>}</h3>
            <p>{c.body}</p>
            {c.href && <span className="link-arrow">{c.cta ?? "Learn More"} <Icon name="arrow" size={16} /></span>}
          </>
        );
        return (
          <li key={c.title} id={c.id}>
            {c.href ? <Link href={c.href} className="icard icard-link">{inner}</Link> : <div className="icard">{inner}</div>}
          </li>
        );
      })}
    </ul>
  );
}

/** The body of one section (the heading and intro are drawn by InfoPage). */
function SectionBody({ s }: { s: Section }) {
  switch (s.kind) {
    case "cards":
      return <CardGrid items={s.items} cols={s.cols} />;
    case "steps":
      return (
        <ol className="isteps">
          {s.items.map((x, n) => (
            <li key={x.title} className="istep">
              <span className="num">{n + 1}</span>
              <h3>{x.title}</h3>
              <p>{x.body}</p>
            </li>
          ))}
        </ol>
      );
    case "checks":
      return (
        <ul className="ichecks">
          {s.items.map((t) => (
            <li key={t}><Icon name="check" size={18} />{t}</li>
          ))}
        </ul>
      );
    case "prose":
      return (
        <div className="iprose">
          {s.paras.map((p) => <p key={p}>{p}</p>)}
        </div>
      );
    case "stats":
      return (
        <ul className="stats">
          {s.items.map((x) => <li key={x.label}><strong>{x.value}</strong><span>{x.label}</span></li>)}
        </ul>
      );
    case "sample":
      return (
        <div>
          <div className="isample">
            <h3>{s.heading}</h3>
            {s.rows.map(([a, b, t]) => (
              <div key={a} className="irow"><b>{a}</b><span className={`t-${t}`}>{b}</span></div>
            ))}
          </div>
          {s.note && <p className="foot">{s.note}</p>}
        </div>
      );
    case "pills":
      return <ul className="logos ileft">{s.items.map((a) => <li key={a}>{a}</li>)}</ul>;
    case "widget":
      if (s.widget === "features") {
        return (
          <CardGrid
            items={FEATURES.map((f) => ({ title: f.name, body: f.line, icon: f.icon, href: f.href, cta: "Explore Feature" }))}
          />
        );
      }
      if (s.widget === "disciplines") {
        return (
          <ul className="tiles">
            {DISCIPLINES.map((d) => (
              <li key={d.name}>
                <Link href={d.href} className="tile">
                  <span className="tile-ico"><Icon name={d.icon} size={26} /></span>
                  <span className="tile-name">{d.name}</span>
                  {!d.live && <em className="tag">Coming Soon</em>}
                </Link>
              </li>
            ))}
          </ul>
        );
      }
      if (s.widget === "newsletter") return <Newsletter />;
      return null; // "showcase" is drawn as its own dark band by InfoPage
    case "form":
      return <InfoForm kind={s.form} discipline={s.discipline} />;
  }
}

/** One whole information page. `page` is an entry of PAGES in lib/pages.ts. */
export function InfoPage({ page }: { page: PageDef }) {
  // Plain sections alternate white / grey. Starts white because the page header is grey.
  let grey = false;
  const related = (page.related ?? []).map((p) => PAGES[p]).filter(Boolean);
  return (
    <>
      {/* page header: breadcrumbs, label, heading, intro, buttons, draft notice */}
      <section className="ph">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {(page.crumbs ?? []).map(([label, href]) => (
              <span key={href}><i aria-hidden="true">›</i> <Link href={href}>{label}</Link></span>
            ))}
            <span><i aria-hidden="true">›</i> <span aria-current="page">{page.title}</span></span>
          </nav>
          {page.eyebrow && <span className="eyebrow">{page.eyebrow}</span>}
          <h1>{page.title}</h1>
          <p className="lede">{page.intro}</p>
          {page.draft && <p className="inote">{page.draft}</p>}
          {page.actions && (
            <div className="ph-btns">
              {page.actions.primary && <Link href={page.actions.primary[1]} className="btn btn-primary btn-lg">{page.actions.primary[0]}</Link>}
              {page.actions.secondary && <Link href={page.actions.secondary[1]} className="btn btn-secondary btn-lg">{page.actions.secondary[0]}</Link>}
            </div>
          )}
        </div>
      </section>

      {/* the page's own sections, in order */}
      {page.sections.map((s, n) => {
        // the showcase widget is a black band with the tabbed workspace gallery
        if (s.kind === "widget" && s.widget === "showcase") {
          return (
            <section key={n} id={s.id} className="band dark">
              <div className="wrap">
                {s.title && <h2 className="center">{s.title}</h2>}
                <Showcase />
              </div>
            </section>
          );
        }
        // prose (legal text) stays white and tight; every other section alternates
        let cls = "sec sec-tight";
        if (s.kind !== "prose") {
          cls = grey ? "sec sec-alt" : "sec";
          grey = !grey;
        }
        return (
          <section key={n} id={s.id} className={cls}>
            <div className="wrap">
              {(s.title || s.intro) && (
                <div className="sec-head">
                  {s.title && <h2>{s.title}</h2>}
                  {s.intro && <p className="sub">{s.intro}</p>}
                </div>
              )}
              <SectionBody s={s} />
            </div>
          </section>
        );
      })}

      {/* related pages */}
      {related.length > 0 && (
        <section className={grey ? "sec sec-alt" : "sec"}>
          <div className="wrap">
            <div className="sec-head"><h2>Related</h2></div>
            <CardGrid items={related.map((p) => ({ title: p.title, body: p.intro, href: `/${p.path}`, cta: "Open" }))} />
          </div>
        </section>
      )}

      {/* final call to action (same as the homepage), unless the page turned it off */}
      {page.cta !== false && (
        <section className="band dark cta">
          <div className="wrap center">
            <h2>Your Next Plan, Checked Before It’s Submitted.</h2>
            <div className="cta-btns">
              <Link href="/signup" className="btn btn-primary btn-lg" data-track="start_free">Start Free</Link>
              <Link href="/demo" className="btn btn-secondary btn-lg" data-track="try_demo">Try the Demo</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
