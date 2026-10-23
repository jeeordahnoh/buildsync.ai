// Single source for homepage content. Prices are not final: every price slot
// reads from PRICES so real numbers drop in without layout changes.

export const PRICES = {
  studentPro: { monthly: "{{PRICE}}", yearly: "{{PRICE}}" },
  engineer: { monthly: "{{PRICE}}", yearly: "{{PRICE}}" },
};

export const NAV = [
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
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
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

export const DISCIPLINES = [
  { name: "Civil", icon: "civil", href: "/disciplines/civil", live: true },
  { name: "Government & municipal", icon: "gov", href: "/government", live: true },
  { name: "Electrical", icon: "electrical", href: "/disciplines/electrical" },
  { name: "Mechanical", icon: "mechanical", href: "/disciplines/mechanical" },
  { name: "Automotive", icon: "automotive", href: "/disciplines/automotive" },
  { name: "Aviation", icon: "aviation", href: "/disciplines/aviation" },
];

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
