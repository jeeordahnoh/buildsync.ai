/**
 * BuildSync AI · components/Compare.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports CompareTable: a row of competitor buttons (Primavera P6, AutoCAD /
 *   Civil 3D, UpCodes, Procore) and, under it, a three-column table:
 *   Feature | BuildSync | the selected competitor (homepage Block 10,
 *   "How BuildSync stacks up.").
 *
 * WHAT IT IS FOR
 *   Shows how BuildSync compares with the tools visitors already use.
 *
 * IMPORTANT RULE (from the spec)
 *   Competitor cells show the placeholder "[verify]" ON PURPOSE, and the
 *   footnote shows "[Month YYYY]". Do not replace them with claims about a
 *   competitor until each cell has been checked against that vendor's own
 *   public website. Do not publish unverified claims.
 *
 * WHY "use client"
 *   It keeps the selected competitor in React state.
 *
 * USED BY
 *   app/(marketing)/page.tsx. Data comes from COMPETITORS and COMPARE_ROWS in
 *   lib/site.ts.
 *
 * IF SOMETHING BREAKS
 *   - To add a competitor or a row, edit lib/site.ts (not this file).
 *   - On narrow screens the table keeps a minimum width of 620px and scrolls
 *     sideways inside its own box (.table-wrap); the page itself must not
 *     scroll sideways. Styles: app/globals.css under "compare".
 *   - The competitor buttons are plain toggle buttons (a group with
 *     aria-pressed), not ARIA "tab" roles; they work with mouse, touch, Enter
 *     and Space.
 */
"use client";
import { useState } from "react";
import { COMPETITORS, COMPARE_ROWS } from "@/lib/site";
import { Icon } from "./Icon";

/**
 * The compare section. `c` is the name of the selected competitor
 * (starts as the first one in COMPETITORS).
 */
export function CompareTable() {
  const [c, setC] = useState<string>(COMPETITORS[0]);
  return (
    <div>
      {/* competitor selector buttons; the selected one is dark ("on") */}
      <div className="pills" role="group" aria-label="Competitor">
        {COMPETITORS.map((x) => (
          <button key={x} aria-pressed={x === c} className={x === c ? "on" : ""} onClick={() => setC(x)}>{x}</button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="cmp">
          <thead>
            <tr><th>Feature</th><th className="us">BuildSync</th><th>{c}</th></tr>
          </thead>
          <tbody>
            {/* one row per feature: BuildSync = "Included"; competitor = "[verify]" placeholder */}
            {COMPARE_ROWS.map((r) => (
              <tr key={r}>
                <td>{r}</td>
                <td className="us"><Icon name="check" size={16} /> Included</td>
                <td className="verify">[verify]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="foot">Based on each company’s public website, [Month YYYY].</p>
    </div>
  );
}
