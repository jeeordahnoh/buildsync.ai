/**
 * BuildSync AI · components/Showcase.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports Showcase: the tabbed product gallery that sits inside the dark band
 *   on the homepage (Block 8, "A real CAD workspace. With an engineer's brain.").
 *   Five tabs (Section cut, Stress test, Compliance, 2D plan, Connectors). The
 *   selected tab shows three bullet points on the left and a large workspace
 *   image on the right, then a button to open the demo.
 *
 * WHAT IT IS FOR
 *   Lets visitors see the main workspace screens one at a time (spec Block 8).
 *
 * WHY "use client"
 *   It keeps the selected tab in React state.
 *
 * USED BY
 *   app/(marketing)/page.tsx (inside the dark band). Images come from
 *   components/WorkspaceMock.tsx; the spec says the real ones will be the
 *   workspace PNGs 03, 07, 04, 05 and 13, so swap WorkspaceMock for <img> tags
 *   when those exist.
 *
 * IF SOMETHING BREAKS
 *   - To add, remove or reword a tab, edit TABS below (label, mock view,
 *     bullets). `view` must be a valid MockView name.
 *   - Tabs change only by click / Enter / Space on the tab button (there is no
 *     arrow-key navigation between tabs yet).
 *   - Layout classes (.tabs, .show-grid, .callouts, .show-img) are in
 *     app/globals.css under "dark bands". On screens 860px wide and below the
 *     bullets move under the image (.callouts order: 2).
 *   - "Open the demo workspace" goes to /demo, which does not exist yet (404).
 */
"use client";
import Link from "next/link";
import { useState } from "react";
import { WorkspaceMock, MockView } from "./WorkspaceMock";
import { Icon } from "./Icon";

// The five tabs, in display order.
//   label    text on the tab button
//   view     which WorkspaceMock screen is drawn for this tab
//   bullets  the three selling points shown next to the image
const TABS: { label: string; view: MockView; bullets: string[] }[] = [
  { label: "Section cut", view: "section", bullets: ["Slice the model anywhere and inspect framing, fill and foundations", "Toggle structure, roof and terrain layers", "Dimensions and levels stay live as you edit"] },
  { label: "Stress test", view: "stress", bullets: ["Run wind, seismic and flood loads on your actual design", "Full math shown, with safety factors per member", "Failed members come with a suggested fix to approve"] },
  { label: "Compliance", view: "compliance", bullets: ["Pass / review / fail per item for your jurisdiction", "Every result cites the code section", "Life-safety items flagged for PE review"] },
  { label: "2D plan", view: "plan2d", bullets: ["Draw or import a plan, or start from a prompt", "Rooms, openings and dimensions in one command line", "Same model drives the 3D view and the schedule"] },
  { label: "Connectors", view: "connectors", bullets: ["Claude, ChatGPT, Kimi, Gemini, local or custom MCP", "Route each task to the agent you trust for it", "Agents propose. You approve every edit"] },
];

/**
 * The tabbed gallery. `t` is the index of the selected tab (0 = first tab);
 * `tab` is that tab's data.
 */
export function Showcase() {
  const [t, setT] = useState(0);
  const tab = TABS[t];
  return (
    <div>
      {/* tab buttons; the selected one gets the "on" class (white pill) */}
      <div className="tabs" role="tablist" aria-label="Workspace views">
        {TABS.map((x, n) => (
          <button key={x.label} role="tab" aria-selected={n === t} className={n === t ? "on" : ""} onClick={() => setT(n)}>{x.label}</button>
        ))}
      </div>
      {/* selected tab content: bullets on the left, image on the right */}
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
