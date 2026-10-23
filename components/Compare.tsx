"use client";
import { useState } from "react";
import { COMPETITORS, COMPARE_ROWS } from "@/lib/site";
import { Icon } from "./Icon";

export function CompareTable() {
  const [c, setC] = useState<string>(COMPETITORS[0]);
  return (
    <div>
      <div className="pills" role="tablist" aria-label="Competitor">
        {COMPETITORS.map((x) => (
          <button key={x} role="tab" aria-selected={x === c} className={x === c ? "on" : ""} onClick={() => setC(x)}>{x}</button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="cmp">
          <thead>
            <tr><th>Feature</th><th className="us">BuildSync</th><th>{c}</th></tr>
          </thead>
          <tbody>
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
