"use client";
import Link from "next/link";
import { useState } from "react";
import { PRICES } from "@/lib/site";
import { Icon } from "./Icon";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const k = yearly ? "yearly" : "monthly";
  const plans = [
    { name: "Student Free", price: "$0", unit: "", for: "Learning and portfolios", bullets: ["1 active project", "Compliance check (limited)", "2D/3D viewer", "Community support"], cta: "Start free", href: "/signup?plan=student" },
    { name: "Student Pro", price: PRICES.studentPro[k], unit: "/ mo", for: "Full features for students", bullets: ["Unlimited learning projects", "Stress tests", "Scheduling", "Ask BuildSync"], cta: "Get started", href: "/signup?plan=student" },
    { name: "Engineer", rec: true, price: PRICES.engineer[k], unit: "/ seat / mo", for: "Professionals", bullets: ["Full workspace", "All analyses", "Cost & workforce", "Agent Council", "Connectors", "PE sign-off workflow", "Civil 3D import|soon"], cta: "Get started", href: "/signup?plan=engineer" },
    { name: "Government", price: "Annual contract", unit: "", for: "Cities, counties, national authorities", bullets: ["Permit pre-check", "City digital twin", "Emergency routing", "Jurisdiction code set", "Dedicated onboarding"], cta: "Contact sales", href: "/government#contact", track: "contact_sales" },
  ];
  return (
    <div>
      <div className="toggle" role="group" aria-label="Billing period">
        <button className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>Monthly</button>
        <button className={yearly ? "on" : ""} onClick={() => setYearly(true)}>Yearly</button>
        <span className="tag tag-accent">2 months free</span>
      </div>
      <div className="plans">
        {plans.map((p) => (
          <article key={p.name} className={`plan ${p.rec ? "rec" : ""}`}>
            {p.rec && <span className="rec-tag">Recommended</span>}
            <h3>{p.name}</h3>
            <p className="plan-for">{p.for}</p>
            <p className="price"><strong>{p.price}</strong> <span>{p.unit}</span></p>
            <ul>
              {p.bullets.map((b) => {
                const [t, soon] = b.split("|");
                return <li key={b}><Icon name="check" size={16} />{t}{soon && <em className="tag">Coming soon</em>}</li>;
              })}
            </ul>
            <Link href={p.href} className={`btn ${p.rec ? "btn-primary" : "btn-secondary"}`} data-track={p.track}>{p.cta}</Link>
          </article>
        ))}
      </div>
      <p className="center"><Link href="/pricing" className="link-arrow">Compare every feature <Icon name="arrow" size={16} /></Link></p>
    </div>
  );
}
