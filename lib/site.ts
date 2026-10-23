/**
 * BuildSync AI · lib/site.ts
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Holds the plain data (constants) that the homepage renders: navigation
 *   menus, discipline tiles, feature cards, prices and the compare-table rows.
 *   Pure data. No React, no side effects, nothing is fetched.
 *
 * WHAT IT IS FOR
 *   One single place to change wording, links and prices without touching any
 *   layout code. Follows the site spec: header mega-menus (spec section 2.2),
 *   and homepage Blocks 3, 4, 10 and 12.
 *
 * USED BY
 *   NAV                         -> components/Header.tsx
 *   DISCIPLINES                 -> app/(marketing)/page.tsx (Block 3 tiles)
 *   FEATURES                    -> components/Carousel.tsx (Block 4 cards)
 *   COMPETITORS, COMPARE_ROWS   -> components/Compare.tsx (Block 10 table)
 *   PRICES                      -> components/Pricing.tsx (Block 12 cards)
 *
 * IF SOMETHING BREAKS
 *   - A link goes to a 404: only "/" exists so far. Every other href here is
 *     a planned page from the spec (section 1, site map) that is not built yet.
 *   - An icon shows up as a cube: the `icon` name is not a key of PATHS in
 *     components/Icon.tsx (unknown names fall back to the cube icon).
 *   - A card thumbnail looks wrong: `view` must be one of the MockView names in
 *     components/WorkspaceMock.tsx.
 *   - NAV and FEATURES are `as const` (read-only literal types). Their
 *     consumers cast them (`as any` in Header.tsx, `as MockView` in
 *     Carousel.tsx), so a change to their shape will NOT be caught by
 *     TypeScript. Re-check those two files by eye after changing a shape.
 */

// Prices are not final. Every price slot on the site reads from here so real
// numbers drop in later without layout changes. Replace "{{PRICE}}" with the
// real text (for example "$12"). Shape: { plan: { monthly, yearly } }.
// Pricing.tsx picks "monthly" or "yearly" from the Monthly/Yearly toggle.
// "Student Free" ($0) and "Government" (annual contract) are literal text in
// Pricing.tsx because they never change with the toggle.
export const PRICES = {
  studentPro: { monthly: "{{PRICE}}", yearly: "{{PRICE}}" },
  engineer: { monthly: "{{PRICE}}", yearly: "{{PRICE}}" },
};

// Header navigation (spec section 2.2).
//  - An entry with `cols` is a dropdown: mega-menu on desktop, accordion in the
//    mobile menu. Each column has a `title` and a list of `links`.
//  - An entry with only `href` is a plain link (Compare, Pricing).
//  - `spotlight` is the highlighted card in the right of a mega-menu.
//  - `waitlist: true` shows the waitlist form in the mega-menu instead.
//  - `soon: true` on a link adds a grey "Coming soon" tag.
export const NAV = [
  // Product: workspace links, the 8 feature pages, and a connectors spotlight.
  {
    label: "Product",
    cols: [
      {
        title: "Workspace",
        links: [
          { label: "Tour the workspace", href: "/product" },
          { label: "Try the demo", href: "/demo" },
          { label: "What's new", href: "/product#whats-new" },
        ],
      },
      {
        title: "Features",
        links: [
          { label: "Code compliance", href: "/features/compliance" },
          { label: "Scheduling & time-window queries", href: "/features/scheduling" },
          { label: "Cost, materials & workforce", href: "/features/cost" },
          { label: "2D/3D site viewer", href: "/features/site-viewer" },
          { label: "Stress test & disaster simulation", href: "/features/simulation" },
          { label: "Prompt-to-Plan", href: "/features/prompt-to-plan" },
          { label: "Solar & site analysis", href: "/features/solar" },
          { label: "Plan Health Score & Agent Council", href: "/features/ai" },
        ],
      },
    ],
    spotlight: {
      title: "Connect Claude, ChatGPT or Kimi",
      body: "Bring your own AI into the workspace.",
      href: "/connectors",
    },
  },
  // Solutions: the three audiences, four use cases, and the government pilot.
  {
    label: "Solutions",
    cols: [
      {
        title: "Audiences",
        links: [
          { label: "For engineers", href: "/solutions/engineers" },
          { label: "For students", href: "/solutions/students" },
          { label: "For governments", href: "/solutions/government" },
        ],
      },
      {
        title: "Use cases",
        links: [
          { label: "Permit pre-check", href: "/solutions/government" },
          { label: "Affordable housing", href: "/solutions/engineers" },
          { label: "Hurricane-zone design", href: "/features/simulation" },
          { label: "City digital twin", href: "/solutions/government" },
        ],
      },
    ],
    spotlight: {
      title: "Government pilot program",
      body: "Open BuildSync for your jurisdiction.",
      href: "/government",
    },
  },
  // Disciplines: Civil is live, the rest are "Coming soon". Right side of the
  // menu is the waitlist form (`waitlist: true`) instead of a spotlight card.
  {
    label: "Disciplines",
    cols: [
      {
        title: "Disciplines",
        links: [
          { label: "Civil", href: "/disciplines/civil" },
          { label: "Electrical", href: "/disciplines/electrical", soon: true },
          { label: "Mechanical", href: "/disciplines/mechanical", soon: true },
          { label: "Automotive", href: "/disciplines/automotive", soon: true },
          { label: "Aviation", href: "/disciplines/aviation", soon: true },
        ],
      },
    ],
    waitlist: true,
  },
  // Plain links (no dropdown).
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
  // Learn: tutorials/docs/webinars/blog, education + community, demo spotlight.
  {
    label: "Learn",
    cols: [
      {
        title: "Learn",
        links: [
          { label: "Tutorials", href: "/learn" },
          { label: "Docs", href: "/learn#docs" },
          { label: "Webinars", href: "/learn#webinars" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Education access", href: "/education" },
          { label: "Community", href: "/learn#community" },
        ],
      },
    ],
    spotlight: {
      title: "Start with the demo project",
      body: "A sample house, fully loaded.",
      href: "/demo",
    },
  },
] as const;

// Tiles in "Explore BuildSync by discipline" (homepage Block 3).
// `icon` = key in components/Icon.tsx. `live: true` hides the "Coming soon"
// tag (only Civil and Government & municipal are live).
export const DISCIPLINES = [
  { name: "Civil", icon: "civil", href: "/disciplines/civil", live: true },
  { name: "Government & municipal", icon: "gov", href: "/government", live: true },
  { name: "Electrical", icon: "electrical", href: "/disciplines/electrical" },
  { name: "Mechanical", icon: "mechanical", href: "/disciplines/mechanical" },
  { name: "Automotive", icon: "automotive", href: "/disciplines/automotive" },
  { name: "Aviation", icon: "aviation", href: "/disciplines/aviation" },
];

// Cards in the "What you can do in BuildSync" carousel (homepage Block 4).
//   name  card title                    icon  key in components/Icon.tsx
//   view  which WorkspaceMock state is  line  the one-line description
//         drawn as the card thumbnail   href  "Explore feature" button target
//   demo  "Try in demo" deep link (opens the demo workspace on that panel)
export const FEATURES = [
  { name: "Code Compliance", icon: "shield", view: "compliance", line: "Pass / review / fail against your local code, with the section cited and a fix", href: "/features/compliance", demo: "/demo?panel=compliance" },
  { name: "Scheduling & Time-Window Queries", icon: "calendar", view: "timeline", line: "Ask \"first 3 months\" and see what's built, spent and on site", href: "/features/scheduling", demo: "/demo?timeline=3mo" },
  { name: "Cost, Materials & Workforce", icon: "cost", view: "cost", line: "Automatic take-off, hard/soft/land costs and trades by phase", href: "/features/cost", demo: "/demo?panel=cost" },
  { name: "Stress Test & Disaster Simulation", icon: "wind", view: "stress", line: "Run a 200 mph hurricane against your actual design", href: "/features/simulation", demo: "/demo?panel=stress-test" },
  { name: "2D/3D Site Viewer", icon: "cube", view: "section", line: "Your plan on real terrain, with layers, compass and section cut", href: "/features/site-viewer", demo: "/demo?section=1" },
  { name: "Prompt-to-Plan", icon: "spark", view: "plan2d", line: "\"Affordable 2-bed 1-bath\" becomes a code-checked starter plan", href: "/features/prompt-to-plan", demo: "/demo?tab=ai" },
  { name: "Solar & Site Analysis", icon: "sun", view: "solar", line: "Sun path, window and PV placement, grading, traffic radius", href: "/features/solar", demo: "/demo?tab=analyze" },
  { name: "AI Connectors", icon: "plug", view: "connectors", line: "Use Claude, ChatGPT, Kimi or your own model inside BuildSync", href: "/connectors", demo: "/connectors" },
] as const;

// Compare table (homepage Block 10). COMPETITORS are the selector pills.
// COMPARE_ROWS are the feature rows; BuildSync is "Included" on every row.
// The competitor column intentionally shows "[verify]" (see Compare.tsx):
// do not publish claims about a competitor until each cell has been checked
// against that vendor's public website.
export const COMPETITORS = ["Primavera P6", "AutoCAD / Civil 3D", "UpCodes", "Procore"] as const;

export const COMPARE_ROWS = [
  "Code compliance check per jurisdiction, with sections cited",
  "Schedule with time-window queries (built / spent / materials / crew)",
  "Cost, materials & workforce from the model",
  "Disaster simulation (wind, seismic, flood) on your design",
  "2D/3D site viewer with section cut",
  "Prompt-to-Plan",
  "Bring your own AI agent (Claude, ChatGPT, Kimi, MCP)",
];
