/**
 * BuildSync AI · app/(marketing)/page.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   The HOMEPAGE (the "/" route). It puts the homepage sections in order, top
 *   to bottom. Section numbers match "Block N" in the site spec
 *   (buildsync-website.md, section 4):
 *     Block 1  announcement bar ........ in app/(marketing)/layout.tsx
 *     Block 2  hero + live preview ..... <Hero />
 *     Block 3  discipline tiles
 *     Block 4  feature carousel ........ <FeatureCarousel />
 *     Block 5  "How It Works" diagram
 *     Block 6  Ask BuildSync + Agent Council + Bring Your Own AI
 *     Block 7  "Built for" cards
 *     Block 8  dark product showcase ... <Showcase />
 *     Block 9  "AI-Assisted. Engineer-Approved." steps
 *     Block 10 compare table ........... <CompareTable />
 *     Block 11 pilot program
 *     Block 12 pricing ................. <Pricing />
 *     Block 13 learn + education cards
 *     Block 14 newsletter .............. <Newsletter />
 *     Block 15 final call-to-action band
 *     Block 16 footer .................. in app/(marketing)/layout.tsx
 *
 * WHAT IT IS FOR
 *   The public front door of buildsync.ai. This file only ARRANGES sections;
 *   interactive parts live in components/, and shared text/links/prices live in
 *   lib/site.ts.
 *
 * NO "use client"
 *   This is a server component. The interactive pieces it imports (Hero,
 *   FeatureCarousel, Showcase, CompareTable, Pricing, Newsletter) are client
 *   components that declare "use client" themselves.
 *
 * IF SOMETHING BREAKS
 *   - A section looks wrong: find its "Block N" comment below, then its CSS
 *     class in app/globals.css (the CSS file is split into matching sections).
 *   - Section background: `sec` = white, `sec-alt` = light grey, `band dark` =
 *     black. `sec-tight` = less vertical padding.
 *   - The INPUTS / AGENTS / COUNCIL / SPOTLIGHTS lists below hold the text for
 *     Blocks 5, 6 and 7. Change wording there.
 *   - `id="features"` and `id="pricing"` are anchor targets (for links such as
 *     "/#pricing"). No link uses them yet.
 *   - Many links go to pages that do not exist yet (404). Only "/" is built.
 *   - Example conversations and votes in Block 6 are fixed sample text from the
 *     spec, not live AI output.
 */
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCarousel } from "@/components/Carousel";
import { Showcase } from "@/components/Showcase";
import { CompareTable } from "@/components/Compare";
import { Pricing } from "@/components/Pricing";
import { Newsletter } from "@/components/Newsletter";
import { Icon, Logo } from "@/components/Icon";
import { DISCIPLINES } from "@/lib/site";

// Block 5: the four inputs around the BuildSync mark.
//   t = card title, d = description, i = icon name (see components/Icon.tsx)
const INPUTS = [
  { t: "The Plan", d: "Drawings, DWG/PDF, or a prompt", i: "civil" },
  { t: "The Jurisdiction", d: "The code set that actually applies there", i: "gov" },
  { t: "The Site", d: "Location, topography, soil, climate, sun", i: "sun" },
  { t: "The Timeline & Budget", d: "Phases, crews, materials, cost basis", i: "calendar" },
];

// Block 6: the "Bring Your Own AI" row of agent names (text pills, not logos).
const AGENTS = ["Claude", "ChatGPT", "Kimi", "Gemini", "Local (Ollama)", "Custom / MCP"];

// Block 6: Agent Council rows: [role, vote text, vote colour].
// Colour "ok" = green, "warn" = amber, "bad" = red (classes .vote-ok / -warn / -bad).
const COUNCIL: [string, string, string][] = [
  ["Structural Engineer", "Support", "ok"],
  ["Cost Estimator", "Conditional", "warn"],
  ["Code Reviewer", "Support", "ok"],
  ["Project Manager", "Oppose", "bad"],
];

// Block 7: the three "Built for" cards.
//   t = title, d = description, h = link, c = picture style (a / b / c, see
//   .spot-a / .spot-b / .spot-c in app/globals.css)
const SPOTLIGHTS = [
  { t: "For Engineers", d: "Pre-check plans before submission, plan the build, and coordinate trades in one place.", h: "/solutions/engineers", c: "a" },
  { t: "For Students", d: "Learn on real projects: see how a plan becomes a schedule, budget and code result. Free to start.", h: "/solutions/students", c: "b" },
  { t: "For Governments", d: "Pre-check permits, build a city digital twin and plan emergency routes.", h: "/solutions/government", c: "c" },
];

/** The homepage. Sections are in the same order as the spec blocks. */
export default function Home() {
  return (
    <>
      {/* Block 2: hero (headline, email capture, live workspace preview) */}
      <Hero />

      {/* Block 3: "Explore BuildSync by Discipline": a row of tiles that scrolls sideways if it does not fit */}
      <section className="sec sec-tight">
        <div className="wrap">
          <div className="sec-head row">
            <h3 className="h3">Explore BuildSync by Discipline</h3>
            <Link href="/disciplines" className="link-arrow">View All <Icon name="arrow" size={16} /></Link>
          </div>
          <ul className="tiles">
            {DISCIPLINES.map((d) => (
              <li key={d.name}>
                <Link href={d.href} className="tile">
                  <span className="tile-ico"><Icon name={d.icon} size={26} /></span>
                  <span className="tile-name">{d.name}</span>
                  {/* only disciplines without `live: true` get the grey tag */}
                  {!d.live && <em className="tag">Coming Soon</em>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Block 4: "What You Can Do in BuildSync": the 8 feature cards (scroll sideways) */}
      <section className="sec" id="features">
        <div className="wrap">
          <div className="sec-head row">
            <h2>What You Can Do in BuildSync</h2>
            <Link href="/product" className="link-arrow">See Every Feature <Icon name="arrow" size={16} /></Link>
          </div>
          <FeatureCarousel />
        </div>
      </section>

      {/* Block 5: "How It Works": four cards (2 x 2) with the BuildSync mark in
          the middle and dashed connector lines drawn by the SVG overlay. On
          screens 860px wide and below the cards stack under the mark and the
          lines are hidden. (The hiw-0..hiw-3 classes are position hooks; no CSS
          uses them yet.) */}
      <section className="sec sec-alt">
        <div className="wrap center">
          <span className="eyebrow">How It Works</span>
          <h2>One Model. Four Things It Knows About Your Project.</h2>
          <p className="sub">Every check, schedule and simulation runs on the same four inputs.</p>
          <div className="hiw">
            <div className="hiw-mark"><Logo /></div>
            {INPUTS.map((x, n) => (
              <div key={x.t} className={`hiw-card hiw-${n}`}>
                <span className="tile-ico"><Icon name={x.i} /></span>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            ))}
            {/* connector lines: a 100 x 100 box stretched over the diagram; each
                "M x y L x y" runs from a card corner toward the centre mark */}
            <svg className="hiw-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M26 24 L45 44M74 24 L55 44M26 76 L45 56M74 76 L55 56" />
            </svg>
          </div>
        </div>
      </section>

      {/* Block 6: AI section: two cards side by side (Ask BuildSync, Agent
          Council), then the full-width "Bring Your Own AI" strip */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">AI That Works the Way You Do</span>
            <h2>An Engineer in the Command Line. A Council Behind It.</h2>
          </div>
          <div className="duo">
            {/* card 1: Ask BuildSync, with one sample chat (fixed text, not live AI) */}
            <article className="card">
              <h3>Ask BuildSync</h3>
              <p className="card-sub">Your AI Engineer in the Command Line</p>
              <p>Ask about your plan in plain English. BuildSync reads the model, cites the code and drafts changes for you to approve.</p>
              <div className="chat">
                <div className="bub you"><b>You</b>Why is truss T-4 failing under a 200 mph west wind?</div>
                <div className="bub ai"><b>BuildSync</b>Uplift at the heel exceeds the strap capacity (SF 1.08). Add a hurricane strap and upsize web W-2 — preview ready.</div>
              </div>
            </article>
            {/* card 2: Agent Council, one row per role with a coloured vote pill.
                The dots fade out (opacity 1 - 0.15 x row number) to tell rows apart. */}
            <article className="card">
              <h3>Agent Council <em className="tag tag-accent">Engineer and Up</em></h3>
              <p className="card-sub">Several AIs, One Decision</p>
              <p>Bring a big call to the Council. Your connected agents take the roles of Structural Engineer, Cost Estimator, Code Reviewer and Project Manager, argue it out using your model, then vote.</p>
              <div className="council">
                <p className="council-q">“Should we switch to a steel frame?”</p>
                {COUNCIL.map(([r, v, t], n) => (
                  <div key={r} className="council-row">
                    <span className="agent-dot" style={{ opacity: 1 - n * 0.15 }} />
                    <span>{r}</span>
                    <span className={`vote vote-${t}`}>{v}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
          {/* "Bring Your Own AI" strip */}
          <div className="byo">
            <h3>Bring Your Own AI</h3>
            <ul className="logos">{AGENTS.map((a) => <li key={a}>{a}</li>)}</ul>
            <Link href="/connectors" className="link-arrow">See Connectors <Icon name="arrow" size={16} /></Link>
            <p className="small">Agents only propose changes. You approve every edit.</p>
          </div>
        </div>
      </section>

      {/* Block 7: "Built for": three cards (engineers, students, governments).
          Each card is one big link; the picture is pure CSS (.spot-img). */}
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head"><h2>Built for</h2></div>
          <div className="trio">
            {SPOTLIGHTS.map((s) => (
              <Link key={s.t} href={s.h} className={`spot spot-${s.c}`}>
                <div className="spot-img" aria-hidden="true" />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="link-arrow">Learn More <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Block 8: dark product showcase (tabs + large workspace image) */}
      <section className="band dark">
        <div className="wrap">
          <h2 className="center">A Real CAD Workspace. With an Engineer’s Brain.</h2>
          <Showcase />
        </div>
      </section>

      {/* Block 9: "AI-Assisted. Engineer-Approved." three steps with arrows
          between them (the arrow <li>s are decoration, hidden from screen
          readers, and turn downward on small screens) */}
      <section className="sec">
        <div className="wrap center">
          <h2>AI-Assisted. Engineer-Approved.</h2>
          <ol className="steps">
            <li><span className="num">1</span><h3>AI Drafts.</h3><p>Every result is labelled <i>AI-generated, unstamped</i>.</p></li>
            <li className="arrow-b" aria-hidden="true"><Icon name="arrow" size={28} /></li>
            <li><span className="num">2</span><h3>We Flag It.</h3><p>Life-safety and load-bearing items are automatically marked <i>Requires PE Review</i>.</p></li>
            <li className="arrow-b" aria-hidden="true"><Icon name="arrow" size={28} /></li>
            <li><span className="num">3</span><h3>A PE Signs.</h3><p>Licensed engineers review, edit and digitally sign, with a full audit trail.</p></li>
          </ol>
          <p className="links2">
            <Link href="/legal/ai-risk-disclosure" className="link-arrow">Read Our AI Risk Disclosure <Icon name="arrow" size={16} /></Link>
            <Link href="/trust" className="link-arrow">Trust Center <Icon name="arrow" size={16} /></Link>
          </p>
        </div>
      </section>

      {/* Block 10: compare table (competitor cells intentionally "[verify]", see components/Compare.tsx) */}
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head center">
            <h2>How BuildSync Stacks Up.</h2>
            <p className="sub">Side by side with the tools you already use.</p>
          </div>
          <CompareTable />
        </div>
      </section>

      {/* Block 11: pilot program. Facts only: no testimonials, customer logos or
          quotes until real, approved ones exist (spec rule). */}
      <section className="sec">
        <div className="wrap center">
          <h2>Built and Validated One Jurisdiction at a Time.</h2>
          <p className="sub wide">
            We train and test BuildSync on a full local code set and real reference plans, starting in the Caribbean. Each new
            jurisdiction is checked against held-out plans before it opens.
          </p>
          <ul className="stats">
            <li><strong>1</strong><span>Pilot Jurisdiction</span></li>
            <li><strong>~100</strong><span>Reference Plans</span></li>
            <li><strong>Held-Out</strong><span>Plan Testing</span></li>
          </ul>
          <Link href="/government" className="link-arrow">Bring BuildSync to Your Jurisdiction <Icon name="arrow" size={16} /></Link>
        </div>
      </section>

      {/* Block 12: pricing (prices are "{{PRICE}}" placeholders, see lib/site.ts) */}
      <section className="sec sec-alt" id="pricing">
        <div className="wrap">
          <div className="sec-head center">
            <h2>Plans for Every Stage.</h2>
            <p className="sub">Start free and upgrade when your projects need more.</p>
          </div>
          <Pricing />
        </div>
      </section>

      {/* Block 13: two cards: free learning, and free access for students/educators */}
      <section className="sec">
        <div className="wrap duo">
          <Link href="/learn" className="card learn">
            <span className="tile-ico"><Icon name="book" /></span>
            <h3>Learn BuildSync Free</h3>
            <p>Tutorials, a demo project walkthrough and webinars.</p>
            <span className="link-arrow">Start Learning <Icon name="arrow" size={16} /></span>
          </Link>
          <Link href="/education" className="card learn">
            <span className="tile-ico"><Icon name="grad" /></span>
            <h3>Free for Students and Educators</h3>
            <p>Verify with a school email and get the workspace at no cost.</p>
            <span className="link-arrow">Get Education Access <Icon name="arrow" size={16} /></span>
          </Link>
        </div>
      </section>

      {/* Block 14: newsletter box (not connected to an email service yet) */}
      <section className="sec sec-tight">
        <div className="wrap"><Newsletter /></div>
      </section>

      {/* Block 15: final call-to-action band (dark): "Start Free" and "Try the Demo" */}
      <section className="band dark cta">
        <div className="wrap center">
          <h2>Your Next Plan, Checked Before It’s Submitted.</h2>
          <div className="cta-btns">
            <Link href="/signup" className="btn btn-primary btn-lg" data-track="start_free">Start Free</Link>
            <Link href="/demo" className="btn btn-secondary btn-lg" data-track="try_demo">Try the Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
