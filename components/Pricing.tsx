/**
 * BuildSync AI · components/Pricing.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports Pricing: a Monthly / Yearly switch and four plan cards
 *   (Student Free, Student Pro, Engineer [Recommended], Government), plus a
 *   "Compare Every Feature" link (homepage Block 12, "Plans for Every Stage.").
 *
 * WHAT IT IS FOR
 *   Shows the plans and sends visitors to sign up with the right plan
 *   preselected (links carry ?plan=student or ?plan=engineer).
 *
 * PRICES ARE NOT FINAL
 *   Student Pro and Engineer prices come from PRICES in lib/site.ts and show
 *   the placeholder text "{{PRICE}}". "$0" (Student Free) and "Annual Contract"
 *   (Government) are typed directly below because they never change.
 *
 * WHY "use client"
 *   It keeps the Monthly / Yearly choice in React state.
 *
 * USED BY
 *   app/(marketing)/page.tsx.
 *
 * IF SOMETHING BREAKS
 *   - The switch only chooses which key of PRICES is read ("monthly" or
 *     "yearly"). While both are "{{PRICE}}" nothing visibly changes.
 *   - The two switch buttons carry aria-pressed so screen readers announce
 *     which one is selected.
 *   - A bullet written as "Text|soon" is split on "|": the part after it
 *     triggers a grey "Coming Soon" tag (see "Civil 3D Import|soon").
 *   - Plan card links: /signup?plan=... and /government#contact. Those pages
 *     do not exist yet (404).
 *   - `track: "contact_sales"` becomes data-track="contact_sales", a label for
 *     future analytics. No tracking script reads it yet.
 *   - The "2 Months Free" tag is static text next to the switch.
 *   - Styles: app/globals.css under "pricing". The cards are 4 columns on wide
 *     screens, 2 columns at 1100px and below, 1 column at 600px and below.
 */
"use client";
import Link from "next/link";
import { useState } from "react";
import { PRICES } from "@/lib/site";
import { Icon } from "./Icon";

/**
 * The pricing section.
 * `yearly` is true when "Yearly" is selected; `k` is the matching PRICES key.
 */
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const k = yearly ? "yearly" : "monthly";
  // The four plan cards, in display order.
  //   price/unit  big price text and the small text after it
  //   for         one-line audience description
  //   bullets     feature list ("Text|soon" adds a "Coming Soon" tag)
  //   cta/href    button label and where it goes
  //   rec         true = highlighted "Recommended" card
  //   track       optional analytics label placed in data-track
  const plans = [
    { name: "Student Free", price: "$0", unit: "", for: "Learning and Portfolios", bullets: ["1 Active Project", "Compliance Check (Limited)", "2D/3D Viewer", "Community Support"], cta: "Start Free", href: "/signup?plan=student" },
    { name: "Student Pro", price: PRICES.studentPro[k], unit: "/ mo", for: "Full Features for Students", bullets: ["Unlimited Learning Projects", "Stress Tests", "Scheduling", "Ask BuildSync"], cta: "Get Started", href: "/signup?plan=student" },
    { name: "Engineer", rec: true, price: PRICES.engineer[k], unit: "/ seat / mo", for: "Professionals", bullets: ["Full Workspace", "All Analyses", "Cost & Workforce", "Agent Council", "Connectors", "PE Sign-Off Workflow", "Civil 3D Import|soon"], cta: "Get Started", href: "/signup?plan=engineer" },
    { name: "Government", price: "Annual Contract", unit: "", for: "Cities, Counties, National Authorities", bullets: ["Permit Pre-Check", "City Digital Twin", "Emergency Routing", "Jurisdiction Code Set", "Dedicated Onboarding"], cta: "Contact Sales", href: "/government#contact", track: "contact_sales" },
  ];
  return (
    <div>
      {/* Monthly / Yearly switch (selected side is dark) */}
      <div className="toggle" role="group" aria-label="Billing period">
        <button className={!yearly ? "on" : ""} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
        <button className={yearly ? "on" : ""} aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly</button>
        <span className="tag tag-accent">2 Months Free</span>
      </div>
      <div className="plans">
        {plans.map((p) => (
          <article key={p.name} className={`plan ${p.rec ? "rec" : ""}`}>
            {p.rec && <span className="rec-tag">Recommended</span>}
            <h3>{p.name}</h3>
            <p className="plan-for">{p.for}</p>
            <p className="price"><strong>{p.price}</strong> <span>{p.unit}</span></p>
            {/* feature list; split("|") separates the text from the optional "soon" marker */}
            <ul>
              {p.bullets.map((b) => {
                const [t, soon] = b.split("|");
                return <li key={b}><Icon name="check" size={16} />{t}{soon && <em className="tag">Coming Soon</em>}</li>;
              })}
            </ul>
            <Link href={p.href} className={`btn ${p.rec ? "btn-primary" : "btn-secondary"}`} data-track={p.track}>{p.cta}</Link>
          </article>
        ))}
      </div>
      <p className="center"><Link href="/pricing" className="link-arrow">Compare Every Feature <Icon name="arrow" size={16} /></Link></p>
    </div>
  );
}
