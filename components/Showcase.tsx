"use client";
import Link from "next/link";
import { useState } from "react";
import { WorkspaceMock, MockView } from "./WorkspaceMock";
import { Icon } from "./Icon";

const TABS: { label: string; view: MockView; bullets: string[] }[] = [
  { label: "Section cut", view: "section", bullets: ["Slice the model anywhere and inspect framing, fill and foundations", "Toggle structure, roof and terrain layers", "Dimensions and levels stay live as you edit"] },
  { label: "Stress test", view: "stress", bullets: ["Run wind, seismic and flood loads on your actual design", "Full math shown, with safety factors per member", "Failed members come with a suggested fix to approve"] },
  { label: "Compliance", view: "compliance", bullets: ["Pass / review / fail per item for your jurisdiction", "Every result cites the code section", "Life-safety items flagged for PE review"] },
  { label: "2D plan", view: "plan2d", bullets: ["Draw or import a plan, or start from a prompt", "Rooms, openings and dimensions in one command line", "Same model drives the 3D view and the schedule"] },
  { label: "Connectors", view: "connectors", bullets: ["Claude, ChatGPT, Kimi, Gemini, local or custom MCP", "Route each task to the agent you trust for it", "Agents propose. You approve every edit"] },
];

export function Showcase() {
  const [t, setT] = useState(0);
  const tab = TABS[t];
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Workspace views">
        {TABS.map((x, n) => (
          <button key={x.label} role="tab" aria-selected={n === t} className={n === t ? "on" : ""} onClick={() => setT(n)}>{x.label}</button>
        ))}
      </div>
      <div className="show-grid" role="tabpanel">
        <ul className="callouts">
          {tab.bullets.map((b) => (
            <li key={b}><Icon name="check" size={18} />{b}</li>
          ))}
        </ul>
        <div className="show-img"><WorkspaceMock view={tab.view} /></div>
      </div>
      <p className="center"><Link href="/demo" className="btn btn-primary">Open the demo workspace <Icon name="arrow" size={16} /></Link></p>
    </div>
  );
}
