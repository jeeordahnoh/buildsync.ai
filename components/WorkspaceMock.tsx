/**
 * BuildSync AI · components/WorkspaceMock.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Draws a fake BuildSync workspace "screenshot" as a single inline SVG:
 *   top ribbon, model explorer on the left, an isometric sample house in the
 *   middle, a results panel on the right, and a timeline + command line at the
 *   bottom. It can show 8 different screens (see MockView below).
 *   Exports: WorkspaceMock (the component) and the MockView type.
 *   Internal helpers: House, Plan2D, Panel, iso, poly.
 *
 * WHAT IT IS FOR
 *   A stand-in for the real read-only <Workspace demo /> and the real workspace
 *   PNG screenshots, which do not exist in this repo yet. It lets the homepage
 *   look complete now. When the real assets arrive, replace the usages listed
 *   below with the real component or <img> tags (spec Blocks 2, 4 and 8).
 *
 * USED BY
 *   components/Hero.tsx      big live preview; passes `chip` (caption pill)
 *   components/Carousel.tsx  card thumbnails; passes `crop` (zoomed viewBox)
 *   components/Showcase.tsx  large tab images
 *
 * IF SOMETHING BREAKS
 *   - Everything is positioned in a fixed 1200 x 680 coordinate box. Panels and
 *     bars use hard-coded pixel positions (for example the results panel starts
 *     at x=830). Moving one zone means checking the others.
 *   - House looks skewed or off-centre: check S, CX, CY (projection) and
 *     W, D, H, R (house size) just below.
 *   - All text in the mock takes its font from the page CSS: the rule
 *     `.mock text` in app/globals.css sets the sans font. The
 *     `fontFamily="var(--mono)"` attributes on some <text> elements are
 *     overridden by that rule (a CSS rule beats an SVG attribute), so they have
 *     no visible effect today. The SVG only looks right inside the site.
 *   - The words "{{PRICE}}" inside PANELS are placeholder text that visitors
 *     can see in the "Spent", "Hard costs" and similar rows. Replace them when
 *     prices/costs are final.
 *   - `crop` changes only the viewBox ("250 100 520 400"), it does not re-draw.
 */

// The 8 screens the mock can show. Each name matches a feature of the product:
//   compliance  code check with pass/review/fail rings on the house
//   section     house sliced by a cut plane
//   stress      wind arrows on the house, red walls
//   timeline    "first 3 months" window highlighted on the bottom bars
//   plan2d      top-down floor plan instead of the 3D house
//   connectors  grid of connected AI agents instead of the house
//   cost        cost/workforce panel
//   solar       solar panels on the roof + sun/PV panel
export type MockView =
  | "compliance" | "section" | "stress" | "timeline"
  | "plan2d" | "connectors" | "cost" | "solar";

// ── 3D to 2D projection (isometric, 30 degrees) ─────────────────────────────
// S      = SVG pixels per 1 unit of house size (zoom).
// CX, CY = SVG point where the house corner (0,0,0) is drawn.
const S = 38;
const CX = 470, CY = 330;
// Converts a 3D point into an SVG "x,y" string.
//   x = along the house length, y = depth, z = height.
//   screenX = CX + (x - y) * S * 0.866   (0.866 = cos 30 degrees)
//   screenY = CY + (x + y) * S * 0.5 - z * S   (0.5 = sin 30 degrees)
const iso = (x: number, y: number, z: number): string => {
  const px = CX + (x - y) * S * 0.866;
  const py = CY + (x + y) * S * 0.5 - z * S;
  return `${px.toFixed(1)},${py.toFixed(1)}`;
};
// Turns a list of 3D points into the `points` string of an SVG <polygon>.
const poly = (pts: [number, number, number][]) => pts.map((p) => iso(...p)).join(" ");

// House size: footprint 6 (W, along x) by 4 (D, along y); walls are 2.5 high
// (H); the gable ridge runs along x, halfway across the depth, at 4 high (R).
const W = 6, D = 4, H = 2.5, R = 4;

/**
 * The isometric sample house and its ground. Parts are drawn back to front so
 * nearer parts cover farther ones. `view` switches extras on and off:
 *   section    adds the cut plane + white cut face, hides the back roof plane
 *   solar      adds three blue solar panels on the front roof plane
 *   compliance adds three status rings (amber = review, red = fail, green = pass)
 *   stress     turns the walls red and draws five wind arrows over the scene
 */
function House({ view }: { view: MockView }) {
  const cut = view === "section";
  const stress = view === "stress";
  // Wall colours (right wall / left wall); reddish under stress.
  const wallR = stress ? "#7a3b3b" : "#2c3441";
  const wallL = stress ? "#8b4646" : "#363f4e";
  const roof = view === "solar" ? "#3b4f7a" : "#232a35";
  return (
    <g>
      {/* ground slab (2 units larger than the house on every side) */}
      <polygon points={poly([[-2, -2, 0], [W + 2, -2, 0], [W + 2, D + 2, 0], [-2, D + 2, 0]])} fill="#141922" stroke="#222a36" />
      {/* 7 faint grid lines across the ground */}
      {[...Array(7)].map((_, i) => (
        <line key={i} x1={iso(-2 + i * 1.33, -2, 0).split(",")[0]} y1={iso(-2 + i * 1.33, -2, 0).split(",")[1]} x2={iso(-2 + i * 1.33, D + 2, 0).split(",")[0]} y2={iso(-2 + i * 1.33, D + 2, 0).split(",")[1]} stroke="#1c232e" />
      ))}
      {/* left (front) wall, y = D */}
      <polygon points={poly([[0, D, 0], [W, D, 0], [W, D, H], [0, D, H]])} fill={wallL} stroke="#4a5568" strokeWidth=".8" />
      {/* right wall, x = W (pentagon: includes the gable peak) */}
      <polygon points={poly([[W, 0, 0], [W, D, 0], [W, D, H], [W, D / 2, R], [W, 0, H]])} fill={wallR} stroke="#4a5568" strokeWidth=".8" />
      {/* windows + door (two windows and a door on the front wall) */}
      <polygon points={poly([[0.8, D, 0.9], [1.9, D, 0.9], [1.9, D, 1.9], [0.8, D, 1.9]])} fill="#4C8DFF" opacity=".55" />
      <polygon points={poly([[2.5, D, 0], [3.4, D, 0], [3.4, D, 1.9], [2.5, D, 1.9]])} fill="#10141b" stroke="#4a5568" strokeWidth=".6" />
      <polygon points={poly([[4.2, D, 0.9], [5.3, D, 0.9], [5.3, D, 1.9], [4.2, D, 1.9]])} fill="#4C8DFF" opacity=".55" />
      {/* roof planes: front plane always; back plane is hidden in the section view */}
      <polygon points={poly([[0, D, H], [W, D, H], [W, D / 2, R], [0, D / 2, R]])} fill={roof} stroke="#5b6679" strokeWidth=".8" />
      {cut ? null : <polygon points={poly([[0, 0, H], [W, 0, H], [W, D / 2, R], [0, D / 2, R]])} fill="#1b212b" stroke="#5b6679" strokeWidth=".8" />}
      {/* solar view: three PV panels on the front roof plane */}
      {view === "solar" && [0, 1, 2].map((i) => (
        <polygon key={i} points={poly([[0.5 + i * 1.7, D - 0.2, H + 0.2], [1.9 + i * 1.7, D - 0.2, H + 0.2], [1.9 + i * 1.7, D / 2 + 0.3, R - 0.25], [0.5 + i * 1.7, D / 2 + 0.3, R - 0.25]])} fill="#5f95ff" opacity=".8" stroke="#a8c6ff" strokeWidth=".5" />
      ))}
      {/* section view: translucent blue cut plane at x = 3 plus the white cut face */}
      {cut && (
        <g>
          <polygon points={poly([[3, -0.6, -0.2], [3, D + 0.6, -0.2], [3, D + 0.6, R + 0.6], [3, -0.6, R + 0.6]])} fill="#4C8DFF" opacity=".16" stroke="#4C8DFF" strokeDasharray="5 4" />
          <polygon points={poly([[3, 0, 0], [3, D, 0], [3, D, H], [3, D / 2, R], [3, 0, H]])} fill="#e9eef7" opacity=".9" />
        </g>
      )}
      {/* compliance view: amber ring on left window (review), red on right window (fail), green on door (pass) */}
      {view === "compliance" && (
        <g>
          <circle cx={iso(1.35, D, 1.4).split(",")[0]} cy={iso(1.35, D, 1.4).split(",")[1]} r="13" fill="none" stroke="#f5a524" strokeWidth="2" />
          <circle cx={iso(5, D, 1.4).split(",")[0]} cy={iso(5, D, 1.4).split(",")[1]} r="13" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx={iso(2.95, D, 1).split(",")[0]} cy={iso(2.95, D, 1).split(",")[1]} r="13" fill="none" stroke="#22c55e" strokeWidth="2" />
        </g>
      )}
      {/* stress view: five wind arrows. Positions are plain screen pixels, not iso() points */}
      {stress && [0, 1, 2, 3, 4].map((i) => (
        <g key={i} stroke="#ff8c82" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d={`M${60 + i * 24},${150 + i * 62} h150`} opacity={0.9 - i * 0.1} />
          <path d={`M${200 + i * 24},${144 + i * 62} l10 6 l-10 6`} />
        </g>
      ))}
    </g>
  );
}

/**
 * Top-down 2D floor plan used by the "plan2d" view (replaces the 3D house).
 * A 440 x 300 box split into rooms by wall lines, with a door swing in blue and
 * five room labels: BED 1, BATH, BED 2, LIVING / KITCHEN, PORCH.
 */
function Plan2D() {
  return (
    <g transform="translate(120,110)" stroke="#e9eef7" fill="none" strokeWidth="2">
      <rect x="0" y="0" width="440" height="300" fill="#10151c" />
      <path d="M0 150h200M200 0v150M260 150v150M260 150h180M330 0v150" />
      <path d="M200 80a30 30 0 000-30" stroke="#4C8DFF" />
      <text x="40" y="82" fill="#8892a3" stroke="none" fontSize="13" fontFamily="var(--mono)">BED 1</text>
      <text x="230" y="82" fill="#8892a3" stroke="none" fontSize="13" fontFamily="var(--mono)">BATH</text>
      <text x="360" y="82" fill="#8892a3" stroke="none" fontSize="13" fontFamily="var(--mono)">BED 2</text>
      <text x="60" y="230" fill="#8892a3" stroke="none" fontSize="13" fontFamily="var(--mono)">LIVING / KITCHEN</text>
      <text x="320" y="230" fill="#8892a3" stroke="none" fontSize="13" fontFamily="var(--mono)">PORCH</text>
    </g>
  );
}

// One line in the results panel: [label, value text, tone].
// Tone picks the dot/value colour: ok = green, warn = amber, bad = red, info = grey.
type Row = [string, string, "ok" | "warn" | "bad" | "info"];

// Text shown in the right-hand results panel for each view (title + rows).
// This is sample content for the marketing page, not real calculations.
const PANELS: Record<MockView, { title: string; rows: Row[] }> = {
  compliance: {
    title: "Code compliance · Antigua & Barbuda",
    rows: [
      ["Egress window, bedroom 1", "Review §R310.2", "warn"],
      ["Roof uplift connectors", "Fail §R802.11", "bad"],
      ["Door clear width", "Pass §R311.2", "ok"],
      ["Setback, front", "Pass §3.4.1", "ok"],
      ["Stair rise / run", "Pass §R311.7", "ok"],
    ],
  },
  section: {
    title: "Layers · Section A–A",
    rows: [["Structure", "On", "info"], ["Roof", "On", "info"], ["Terrain", "On", "info"], ["Cut plane", "x = 3.0 m", "info"]],
  },
  stress: {
    title: "Stress test · 200 mph west wind",
    rows: [
      ["Truss T-4 uplift", "SF 1.08", "bad"],
      ["Wall racking", "SF 1.62", "ok"],
      ["Roof deck", "SF 1.21", "warn"],
      ["Foundation", "SF 2.10", "ok"],
    ],
  },
  timeline: {
    title: "First 3 months",
    rows: [["Built", "Foundation, slab, framing", "info"], ["Spent", "{{PRICE}}", "info"], ["On site", "14 crew", "info"], ["Materials", "Concrete, rebar, lumber", "info"]],
  },
  plan2d: { title: "Prompt-to-Plan", rows: [["Brief", "Affordable 2-bed 1-bath", "info"], ["Area", "72 m²", "info"], ["Code check", "8 pass · 1 review", "ok"]] },
  connectors: { title: "Connectors", rows: [["Claude", "Connected", "ok"], ["ChatGPT", "Connected", "ok"], ["Kimi", "Connected", "ok"], ["Local (Ollama)", "Idle", "info"]] },
  cost: { title: "Cost & workforce", rows: [["Hard costs", "{{PRICE}}", "info"], ["Soft costs", "{{PRICE}}", "info"], ["Land", "{{PRICE}}", "info"], ["Masons · phase 2", "6", "info"]] },
  solar: { title: "Solar & site", rows: [["Sun path", "Summer solstice", "info"], ["PV capacity", "4.2 kW", "ok"], ["Grading", "2% fall", "ok"]] },
};

// Tone name to colour (green / amber / red / grey) for the panel rows.
const TONE = { ok: "#22c55e", warn: "#f5a524", bad: "#ef4444", info: "#8892a3" } as const;

/**
 * The results panel on the right of the workspace: a 350 x 470 box at
 * (830, 64) with a title and one block per row (coloured dot, label, value).
 * Rows are spaced 52 px apart. Content comes from PANELS[view].
 */
function Panel({ view }: { view: MockView }) {
  const p = PANELS[view];
  return (
    <g transform="translate(830,64)">
      <rect width="350" height="470" rx="10" fill="#10151c" stroke="#222a36" />
      <text x="18" y="32" fill="#e9eef7" fontSize="14" fontWeight="600">{p.title}</text>
      <line x1="18" x2="332" y1="46" y2="46" stroke="#222a36" />
      {p.rows.map(([a, b, t], i) => (
        <g key={a} transform={`translate(18,${72 + i * 52})`}>
          <circle cx="5" cy="-4" r="4" fill={TONE[t]} />
          <text x="20" y="0" fill="#c8cfdb" fontSize="13">{a}</text>
          <text x="20" y="20" fill={t === "info" ? "#8892a3" : TONE[t]} fontSize="12" fontFamily="var(--mono)">{b}</text>
        </g>
      ))}
    </g>
  );
}

/**
 * The whole fake workspace.
 * @param view  which screen to draw (default "compliance"), see MockView
 * @param chip  optional caption pill drawn top-left of the viewport, for
 *              example "① Compliance check" (Hero.tsx uses this)
 * @param crop  when true, zoom the SVG viewBox to the middle of the scene so it
 *              works as a small card thumbnail (Carousel.tsx uses this)
 * Zones, top to bottom / left to right (all in the 1200 x 680 box):
 *   ribbon (y 0-44) | explorer (x 0-190) | viewport (x 190-810) |
 *   results panel (x 830-1180) | timeline + command line (y 614-680)
 */
export function WorkspaceMock({ view = "compliance", chip, crop }: { view?: MockView; chip?: string; crop?: boolean }) {
  return (
    <svg viewBox={crop ? "250 100 520 400" : "0 0 1200 680"} role="img" aria-label={`BuildSync workspace sample project: ${view}`} className="mock">
      {/* background */}
      <rect width="1200" height="680" fill="#0b0e13" />
      {/* ribbon: logo square, five tab names ("Draw" is shown as active), and the unstamped label */}
      <rect width="1200" height="44" fill="#10151c" />
      <rect x="16" y="12" width="20" height="20" rx="5" fill="#4C8DFF" />
      {["Home", "Draw", "Analyze", "AI", "Output"].map((t, i) => (
        <text key={t} x={60 + i * 76} y="28" fill={i === 1 ? "#fff" : "#8892a3"} fontSize="13">{t}</text>
      ))}
      <text x="1010" y="28" fill="#8892a3" fontSize="11" fontFamily="var(--mono)">AI-generated · unstamped</text>
      {/* explorer: model tree on the left (first item highlighted, leading spaces = indent) */}
      <rect y="44" width="190" height="570" fill="#0e1218" />
      {["Sample house", "  Site", "  Structure", "  Envelope", "  MEP", "Schedule", "Reports"].map((t, i) => (
        <text key={t} x="18" y={80 + i * 28} fill={i === 0 ? "#e9eef7" : "#8892a3"} fontSize="12.5">{t}</text>
      ))}
      {/* viewport: the 3D house (or 2D plan), plus the connector cards for that view */}
      <g transform="translate(0,0)">
        <rect x="190" y="44" width="620" height="570" fill="#0b0e13" />
        {/* the whole scene is nudged 30 px up and left (visual centring tweak; change if the house looks off-centre) */}
        <g transform="translate(-30,-30)">
          {view === "plan2d" ? <Plan2D /> : <House view={view} />}
        </g>
        {/* connectors view: a 2 x 2 grid of agent cards drawn over the viewport */}
        {view === "connectors" && (
          <g fontSize="13" fill="#c8cfdb">
            {["Claude", "ChatGPT", "Kimi", "Gemini"].map((n, i) => (
              <g key={n} transform={`translate(${260 + (i % 2) * 260},${150 + Math.floor(i / 2) * 140})`}>
                <rect width="230" height="100" rx="12" fill="#10151c" stroke="#222a36" />
                <circle cx="34" cy="50" r="14" fill="#4C8DFF" opacity={0.9 - i * 0.12} />
                <text x="62" y="46">{n}</text>
                <text x="62" y="66" fill="#22c55e" fontSize="11" fontFamily="var(--mono)">MCP · connected</text>
              </g>
            ))}
          </g>
        )}
        {/* viewport footer text (compass + 2D/3D/section switch labels) */}
        <text x="214" y="596" fill="#4a5568" fontSize="11" fontFamily="var(--mono)">N ↑   ·   2D  3D  SECTION   ·   Layers</text>
      </g>
      {/* results panel on the right */}
      <Panel view={view} />
      {/* timeline: 12 phase bars. Normally the first 5 are blue (done) at 70% opacity.
          In the "timeline" view only the first 3 (the 3-month window) are blue and
          fully opaque, and a dashed box outlines them. */}
      <rect x="190" y="614" width="1010" height="66" fill="#10151c" />
      {[...Array(12)].map((_, i) => (
        <g key={i}>
          <rect x={214 + i * 60} y="628" width="52" height="10" rx="5" fill={i < 3 || view !== "timeline" ? (i < 5 ? "#4C8DFF" : "#222a36") : "#222a36"} opacity={view === "timeline" && i < 3 ? 1 : 0.7} />
        </g>
      ))}
      {view === "timeline" && <rect x="208" y="620" width="186" height="26" rx="8" fill="none" stroke="#4C8DFF" strokeDasharray="4 3" />}
      {/* command line text under the timeline bars */}
      <text x="214" y="666" fill="#8892a3" fontSize="12" fontFamily="var(--mono)">&gt; show me what’s built in the first 3 months</text>
      {/* caption chip (only when the `chip` prop is given). Width is estimated at
          about 7.6 px per character plus 30 px padding. */}
      {chip && (
        <g transform="translate(214,66)">
          <rect width={chip.length * 7.6 + 30} height="28" rx="14" fill="#4C8DFF" />
          <text x="15" y="19" fill="#fff" fontSize="12.5" fontWeight="600">{chip}</text>
        </g>
      )}
    </svg>
  );
}
