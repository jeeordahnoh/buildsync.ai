/**
 * BuildSync AI · lib/pages.ts
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Holds the wording of every INFORMATION PAGE of the site (product, features,
 *   solutions, disciplines, learn, trust, legal, company, sign-up and so on) as
 *   plain data, plus the types that describe it. Pure data: no React, nothing is
 *   fetched.
 *
 * WHAT IT IS FOR
 *   One place to change what a page says without touching layout code. Each
 *   entry of PAGE_LIST is one page: its route (`path`), heading, intro, a list of
 *   `sections` (cards, steps, tick lists, sample results, forms ...) and related
 *   pages. components/InfoPage.tsx draws any entry the same way, and
 *   app/(marketing)/[...slug]/page.tsx turns the list into real routes.
 *
 * USED BY
 *   PAGES / PAGE_LIST -> app/(marketing)/[...slug]/page.tsx (routes + page titles)
 *                        components/InfoPage.tsx (the "Related" cards)
 *
 * ROUTES THAT ARE NOT HERE ON PURPOSE
 *   /demo and /features/simulation are not in this list, so they still show a
 *   404 until their own pages are built (create app/(marketing)/demo/page.tsx
 *   and app/(marketing)/features/simulation/page.tsx; an explicit folder always
 *   wins over the catch-all route). Compare and Pricing are not pages: the header
 *   and footer links go to the homepage sections "/#compare" and "/#pricing".
 *
 * WRITING RULES (site style)
 *   Headings, card titles, step titles, tags and button labels are in Title Case
 *   ("Big Word"). Sentences and paragraphs stay in sentence case. Nothing here may
 *   claim more than the homepage already does: unknown details are marked
 *   "[to be confirmed]" or "Coming Soon" instead of being invented.
 *
 * IF SOMETHING BREAKS
 *   - A page shows a 404: its `path` is missing here, or has a typo. The path has
 *     no leading slash ("features/compliance" is /features/compliance).
 *   - A "Related" card is missing: the path in `related` is not a page in this
 *     list (unknown paths are skipped on purpose, for example features/simulation).
 *   - A section does not render: check its `kind` against the Section type below.
 *   - Forms (kind "form") are NOT connected to anything yet; see
 *     components/InfoForm.tsx.
 */

/** Colour of a sample-result row: green, amber, red or grey. */
export type Tone = "ok" | "warn" | "bad" | "info";

/** One card. `href` makes the whole card a link; `id` is an anchor target; `icon` is a key of components/Icon.tsx. */
export type Card = { title: string; body: string; icon?: string; href?: string; cta?: string; tag?: string; id?: string };

/** The building blocks a page is made of. components/InfoPage.tsx draws each `kind`. */
export type Section =
  | { kind: "cards"; id?: string; title?: string; intro?: string; cols?: 2 | 3; items: Card[] }
  | { kind: "steps"; id?: string; title?: string; intro?: string; items: { title: string; body: string }[] }
  | { kind: "checks"; id?: string; title?: string; intro?: string; items: string[] }
  | { kind: "prose"; id?: string; title?: string; intro?: string; paras: string[] }
  | { kind: "stats"; id?: string; title?: string; intro?: string; items: { value: string; label: string }[] }
  | { kind: "sample"; id?: string; title?: string; intro?: string; heading: string; rows: [string, string, Tone][]; note?: string }
  | { kind: "pills"; id?: string; title?: string; intro?: string; items: string[] }
  | { kind: "widget"; id?: string; title?: string; intro?: string; widget: "showcase" | "features" | "disciplines" | "newsletter" }
  | { kind: "form"; id?: string; title?: string; intro?: string; form: "signup" | "login" | "contact" | "waitlist" | "gov"; discipline?: string };

/** One information page. `path` is the route without the leading slash. */
export type PageDef = {
  path: string;
  title: string;                           // the page heading, also the browser-tab title
  eyebrow?: string;                        // small blue label above the heading
  intro: string;                           // the sentence under the heading
  description: string;                     // <meta name="description"> for search and share cards
  crumbs?: [string, string][];             // parents between "Home" and this page: [label, href]
  draft?: string;                          // when set, shows this notice under the intro (legal pages)
  actions?: { primary?: [string, string]; secondary?: [string, string] }; // buttons under the intro
  sections: Section[];
  related?: string[];                      // paths of pages shown as "Related" cards at the bottom
  cta?: false;                             // false = no dark call-to-action band at the bottom
};

const START: [string, string] = ["Start Free", "/signup"];
const DEMO: [string, string] = ["Try the Demo", "/demo"];

// The feature pages (and connectors) link to each other at the bottom.
const FEATURE_PAGES = ["features/compliance", "features/scheduling", "features/cost", "features/site-viewer", "features/prompt-to-plan", "features/solar", "features/ai", "connectors"];

/**
 * Builds one feature page (Block 4 cards link here). `gets` = tick list,
 * `steps` = [title, text] x3, `sample` = optional sample-result panel, `demo` =
 * where "Try in Demo" goes (the demo route is not built yet).
 */
function feature(f: {
  path: string; title: string; intro: string; description: string; demo: string;
  gets: string[]; steps: [string, string][]; sample?: { heading: string; rows: [string, string, Tone][] }; extra?: Section[];
}): PageDef {
  const sections: Section[] = [
    { kind: "checks", title: "What You Get", items: f.gets },
    { kind: "steps", title: "How It Works", items: f.steps.map(([title, body]) => ({ title, body })) },
  ];
  if (f.sample) sections.push({ kind: "sample", title: "See It in Action", heading: f.sample.heading, rows: f.sample.rows, note: "Sample project, shown for illustration. Not a real calculation." });
  if (f.extra) sections.push(...f.extra);
  return {
    path: `features/${f.path}`, title: f.title, eyebrow: "Feature", intro: f.intro, description: f.description,
    crumbs: [["Product", "/product"]],
    actions: { primary: ["Try in Demo", f.demo], secondary: START },
    sections,
    related: FEATURE_PAGES.filter((p) => p !== `features/${f.path}`).slice(0, 3),
  };
}

/** Builds a "Coming Soon" discipline page with a waitlist form (Electrical, Mechanical, Automotive, Aviation). */
function soon(slug: string, name: string): PageDef {
  return {
    path: `disciplines/${slug}`, title: `${name} Engineering`, eyebrow: "Coming Soon",
    intro: `${name} is not available yet. Join the waitlist and we will tell you when it opens.`,
    description: `${name} engineering is coming to BuildSync AI. Join the waitlist to hear when it opens.`,
    crumbs: [["Disciplines", "/disciplines"]],
    sections: [
      { kind: "form", form: "waitlist", discipline: slug, title: "Join the Waitlist", intro: `Tell us where to reach you and pick ${name.toLowerCase()} (or another discipline).` },
      { kind: "cards", cols: 2, title: "While You Wait", items: [
        { title: "Civil Engineering Is Live", body: "The civil engineering workspace is open today, with code compliance, scheduling, cost, a 2D/3D viewer and more.", icon: "civil", href: "/disciplines/civil", cta: "See Civil" },
        { title: "The Same Approach", body: "AI drafts, the system flags what needs review, and a licensed engineer signs. That is how every discipline will work.", icon: "shield", href: "/trust", cta: "Read How We Work" },
      ] },
    ],
    related: ["disciplines/civil", "disciplines"],
  };
}

export const PAGE_LIST: PageDef[] = [
  // ------------------------------------------------------------------ Product
  {
    path: "product", title: "The BuildSync Workspace", eyebrow: "Product",
    intro: "BuildSync AI reads your drawings, checks them against your jurisdiction’s building code, and turns them into a schedule, budget and stress-tested 3D model, in one workspace.",
    description: "A tour of the BuildSync AI workspace: code compliance, scheduling, cost, a 3D viewer, stress tests and AI connectors in one place.",
    actions: { primary: START, secondary: DEMO },
    sections: [
      { kind: "widget", widget: "showcase", title: "A Real CAD Workspace. With an Engineer’s Brain." },
      { kind: "widget", widget: "features", id: "features", title: "Every Feature", intro: "Eight things you can do in BuildSync. Each one runs on the same model." },
      { kind: "cards", cols: 2, title: "One Model. Four Things It Knows About Your Project.", intro: "Every check, schedule and simulation runs on the same four inputs.", items: [
        { title: "The Plan", body: "Drawings, DWG/PDF, or a prompt", icon: "civil" },
        { title: "The Jurisdiction", body: "The code set that actually applies there", icon: "gov" },
        { title: "The Site", body: "Location, topography, soil, climate, sun", icon: "sun" },
        { title: "The Timeline & Budget", body: "Phases, crews, materials, cost basis", icon: "calendar" },
      ] },
      { kind: "cards", id: "whats-new", cols: 2, title: "What’s New", intro: "BuildSync is in early access. Here is where things stand.", items: [
        { title: "Early Access Is Open", body: "The civil engineering workspace is open.", icon: "spark" },
        { title: "Eight Workspace Features", body: "Code compliance, scheduling, cost, stress tests, the 2D/3D viewer, Prompt-to-Plan, solar and site analysis, and AI connectors.", icon: "cube" },
        { title: "Civil 3D Import", body: "Import from Civil 3D is planned for the Engineer plan.", icon: "plug", tag: "Coming Soon" },
        { title: "More Disciplines", body: "Electrical, mechanical, automotive and aviation are on the waitlist.", icon: "globe", tag: "Coming Soon", href: "/disciplines", cta: "See Disciplines" },
      ] },
    ],
  },

  // ----------------------------------------------------------------- Features
  feature({
    path: "compliance", title: "Code Compliance", demo: "/demo?panel=compliance",
    intro: "Pass, review or fail against your local code, with the section cited and a fix.",
    description: "BuildSync checks your plan against your jurisdiction’s building code and cites the code section for every result.",
    gets: [
      "A pass, review or fail for every checked item, for your jurisdiction",
      "The code section cited on every result, so you can read the source yourself",
      "A suggested fix for failed items, shown for you to approve",
      "Life-safety items flagged automatically for PE review",
    ],
    steps: [
      ["Bring Your Plan", "Upload drawings (DWG or PDF), draw in the workspace, or start from a prompt."],
      ["BuildSync Checks It", "Each item is checked against the code set for your jurisdiction."],
      ["You Review the Result", "Every result cites its section. Failed items come with a suggested fix to approve."],
    ],
    sample: { heading: "Code Compliance · Antigua & Barbuda", rows: [
      ["Egress window, bedroom 1", "Review §R310.2", "warn"],
      ["Roof uplift connectors", "Fail §R802.11", "bad"],
      ["Door clear width", "Pass §R311.2", "ok"],
      ["Setback, front", "Pass §3.4.1", "ok"],
      ["Stair rise / run", "Pass §R311.7", "ok"],
    ] },
    extra: [{ kind: "prose", title: "Where It Works", paras: [
      "Compliance checks run only in jurisdictions that BuildSync has validated. We start with one pilot jurisdiction in the Caribbean, and each new jurisdiction opens only after it has been checked against held-out plans.",
      "Results are advisory. Every output is labelled AI-generated, unstamped until a licensed engineer reviews and signs it.",
    ] }],
  }),
  feature({
    path: "scheduling", title: "Scheduling & Time-Window Queries", demo: "/demo?timeline=3mo",
    intro: "Ask for “the first 3 months” and see what is built, spent and on site.",
    description: "Ask time-window questions in plain English and see what is built, spent and on site in that window.",
    gets: [
      "A schedule that comes from the same model as the plan",
      "Time-window questions in plain English at the command line",
      "For any window: what is built, what is spent, which materials and which crews are on site",
      "A timeline that stays in step with the 3D view as the plan changes",
    ],
    steps: [
      ["Build the Schedule", "The model is broken into construction phases, with crews and materials for each."],
      ["Ask a Time-Window Question", "Type something like “show me what’s built in the first 3 months.”"],
      ["Read the Answer", "The timeline highlights the window and the panel lists what is built and who is on site."],
    ],
    sample: { heading: "First 3 Months", rows: [
      ["Built", "Foundation, slab, framing", "info"],
      ["On site", "14 crew", "info"],
      ["Materials", "Concrete, rebar, lumber", "info"],
    ] },
  }),
  feature({
    path: "cost", title: "Cost, Materials & Workforce", demo: "/demo?panel=cost",
    intro: "Automatic take-off, hard, soft and land costs, and trades by phase.",
    description: "Quantities, costs, materials and crews calculated from the BuildSync model, phase by phase.",
    gets: [
      "Quantities taken off automatically from the model",
      "Costs split into hard costs, soft costs and land",
      "Trades and crew counts for each construction phase",
      "Materials listed for each phase, from the same model as the schedule",
    ],
    steps: [
      ["Model the Plan", "Draw, import or describe the plan. The model holds the quantities."],
      ["Take-Off Runs Automatically", "Materials and quantities are measured from the model, with no manual counting."],
      ["Read Costs by Phase", "See hard, soft and land costs next to the trades and crews each phase needs."],
    ],
    sample: { heading: "Cost & Workforce", rows: [
      ["Masons · phase 2", "6", "info"],
      ["Materials", "Concrete, rebar, lumber", "info"],
    ] },
  }),
  feature({
    path: "site-viewer", title: "2D/3D Site Viewer", demo: "/demo?section=1",
    intro: "Your plan on real terrain, with layers, compass and section cut.",
    description: "View your plan in 2D and 3D on real terrain, toggle layers and cut sections anywhere.",
    gets: [
      "Slice the model anywhere and inspect framing, fill and foundations",
      "Toggle structure, roof and terrain layers",
      "Dimensions and levels stay live as you edit",
      "Draw or import a plan, or start from a prompt",
      "Rooms, openings and dimensions in one command line",
      "The same model drives the 3D view and the schedule",
    ],
    steps: [
      ["Start a Plan", "Draw it, import it or describe it in a prompt."],
      ["Switch Views", "Move between the 2D plan, the 3D model and the section cut."],
      ["Cut and Inspect", "Place a section plane anywhere to look inside the structure."],
    ],
    sample: { heading: "Layers · Section A–A", rows: [
      ["Structure", "On", "info"], ["Roof", "On", "info"], ["Terrain", "On", "info"], ["Cut plane", "x = 3.0 m", "info"],
    ] },
  }),
  feature({
    path: "prompt-to-plan", title: "Prompt-to-Plan", demo: "/demo?tab=ai",
    intro: "“Affordable 2-bed 1-bath” becomes a code-checked starter plan.",
    description: "Describe a building in plain English and get a code-checked starter plan to refine in the workspace.",
    gets: [
      "Describe the building in plain English",
      "A starter plan drawn in the workspace for you to edit",
      "A first code check of the starter plan, with items marked for review",
      "Everything labelled AI-generated, unstamped until a PE signs it",
    ],
    steps: [
      ["Write a Brief", "Say what you need, for example “Affordable 2-bed 1-bath.”"],
      ["Review the Starter Plan", "BuildSync drafts the plan and checks it against your jurisdiction’s code."],
      ["Refine in the Workspace", "Edit rooms, openings and dimensions, then cost and schedule it."],
    ],
    sample: { heading: "Prompt-to-Plan", rows: [
      ["Brief", "Affordable 2-bed 1-bath", "info"], ["Area", "72 m²", "info"], ["Code check", "8 pass · 1 review", "ok"],
    ] },
  }),
  feature({
    path: "solar", title: "Solar & Site Analysis", demo: "/demo?tab=analyze",
    intro: "Sun path, window and PV placement, grading and traffic radius.",
    description: "Analyse sun path, window and solar panel placement, grading and traffic radius for your site.",
    gets: [
      "Sun path for your site, such as the summer solstice",
      "Window placement and PV (solar panel) placement",
      "Grading, including the fall across the site",
      "A traffic radius around the site",
    ],
    steps: [
      ["Set the Site", "Location, topography, soil, climate and sun are part of the project."],
      ["Run the Analysis", "Check the sun path, place windows and panels, and review grading."],
      ["Adjust the Plan", "Change the design and see the analysis follow the model."],
    ],
    sample: { heading: "Solar & Site", rows: [
      ["Sun path", "Summer solstice", "info"], ["PV capacity", "4.2 kW", "ok"], ["Grading", "2% fall", "ok"],
    ] },
  }),
  {
    path: "features/ai", title: "Plan Health Score & Agent Council", eyebrow: "Feature",
    intro: "Ask BuildSync like you would ask an engineer, and bring big decisions to a council of AI agents.",
    description: "Ask BuildSync about your plan in plain English, and use the Agent Council to get several AI agents to argue a decision out and vote.",
    crumbs: [["Product", "/product"]],
    actions: { primary: DEMO, secondary: START },
    sections: [
      { kind: "cards", title: "Three Ways AI Helps", items: [
        { title: "Ask BuildSync", body: "Your AI engineer in the command line. Ask about your plan in plain English. BuildSync reads the model, cites the code and drafts changes for you to approve.", icon: "spark" },
        { title: "Agent Council", tag: "Engineer and Up", body: "Several AIs, one decision. Your connected agents take the roles of Structural Engineer, Cost Estimator, Code Reviewer and Project Manager, argue it out using your model, then vote.", icon: "user" },
        { title: "Plan Health Score", body: "An at-a-glance score for how healthy your plan is. [Details to be confirmed]", icon: "shield" },
      ] },
      { kind: "sample", title: "See It in Action", heading: "“Should we switch to a steel frame?”", rows: [
        ["Structural Engineer", "Support", "ok"], ["Cost Estimator", "Conditional", "warn"], ["Code Reviewer", "Support", "ok"], ["Project Manager", "Oppose", "bad"],
      ], note: "Sample vote from the homepage, not live AI output. Agents only propose changes. You approve every edit." },
      { kind: "cards", cols: 2, title: "Bring Your Own AI", items: [
        { title: "AI Connectors", body: "Use Claude, ChatGPT, Kimi, Gemini, a local model or your own agent inside BuildSync.", icon: "plug", href: "/connectors", cta: "See Connectors" },
        { title: "How We Keep You in Charge", body: "AI drafts, we flag it, and a PE signs. Read how responsibility is shared.", icon: "shield", href: "/trust", cta: "Read the Trust Center" },
      ] },
    ],
    related: ["features/compliance", "features/prompt-to-plan", "connectors"],
  },
  {
    path: "connectors", title: "AI Connectors", eyebrow: "Feature",
    intro: "Use Claude, ChatGPT, Kimi or your own model inside BuildSync.",
    description: "Connect Claude, ChatGPT, Kimi, Gemini, a local model or any custom agent to BuildSync. Agents propose changes and you approve every edit.",
    crumbs: [["Product", "/product"]],
    actions: { primary: START, secondary: DEMO },
    sections: [
      { kind: "pills", title: "Bring Your Own AI", intro: "Connect the agents you already use.", items: ["Claude", "ChatGPT", "Kimi", "Gemini", "Local (Ollama)", "Custom / MCP"] },
      { kind: "checks", title: "What You Get", items: [
        "Connect the agents you already use, or run a local model with Ollama",
        "Bring any custom agent over MCP",
        "Route each task to the agent you trust for it",
        "Agents only propose changes. You approve every edit.",
        "Connectors are included in the Engineer plan",
      ] },
      { kind: "steps", title: "How It Works", items: [
        { title: "Connect an Agent", body: "Add the AI you want to work with. Connected agents show their status in the workspace." },
        { title: "Give It a Task", body: "Ask BuildSync a question, or bring a big decision to the Agent Council." },
        { title: "Approve the Changes", body: "Agents draft changes with a preview. Nothing is applied until you approve it." },
      ] },
    ],
    related: ["features/ai", "features/compliance", "features/prompt-to-plan"],
  },

  // ---------------------------------------------------------------- Solutions
  {
    path: "solutions/engineers", title: "For Engineers", eyebrow: "Solutions",
    intro: "Pre-check plans before submission, plan the build, and coordinate trades in one place.",
    description: "BuildSync AI helps engineers pre-check plans against code, plan the build and coordinate trades in one workspace.",
    actions: { primary: START, secondary: DEMO },
    sections: [
      { kind: "cards", title: "What Engineers Use It For", items: [
        { title: "Pre-Check Before You Submit", body: "Check the plan against your jurisdiction’s code before submission. Every result cites its section.", icon: "shield", href: "/features/compliance", cta: "Code Compliance" },
        { title: "Plan the Build", body: "Turn the plan into a schedule, a budget and a crew plan, all from the same model.", icon: "calendar", href: "/features/scheduling", cta: "Scheduling" },
        { title: "Coordinate Trades", body: "See which trades and how many crew are on site in each phase.", icon: "cost", href: "/features/cost", cta: "Cost & Workforce" },
      ] },
      { kind: "cards", id: "affordable-housing", cols: 2, title: "Use Case: Affordable Housing", intro: "Start from a short brief and get to a checked, costed plan quickly.", items: [
        { title: "Start From a Prompt", body: "Describe the home, for example “Affordable 2-bed 1-bath,” and get a code-checked starter plan.", icon: "spark", href: "/features/prompt-to-plan", cta: "Prompt-to-Plan" },
        { title: "Cost and Schedule It", body: "Check the budget and the build schedule from the same model.", icon: "cost", href: "/features/cost", cta: "Cost, Materials & Workforce" },
      ] },
      { kind: "cards", cols: 2, title: "You Stay in Charge", items: [
        { title: "AI Drafts, You Decide", body: "Agents only propose changes. You approve every edit, and life-safety items are flagged for PE review.", icon: "user", href: "/trust", cta: "Trust Center" },
        { title: "The Engineer Plan", body: "Full workspace, all analyses, cost and workforce, Agent Council, connectors and a PE sign-off workflow.", icon: "check", href: "/#pricing", cta: "See Pricing" },
      ] },
    ],
    related: ["solutions/students", "solutions/government", "features/ai"],
  },
  {
    path: "solutions/students", title: "For Students", eyebrow: "Solutions",
    intro: "Learn on real projects: see how a plan becomes a schedule, budget and code result. Free to start.",
    description: "BuildSync AI is free for students. Learn on real projects and see how a plan becomes a schedule, a budget and a code result.",
    actions: { primary: START, secondary: DEMO },
    sections: [
      { kind: "cards", title: "Learn the Whole Picture", items: [
        { title: "Real Projects", body: "Work on a project from plan to schedule, budget and code result, not on isolated exercises.", icon: "civil" },
        { title: "Student Free", body: "$0 for learning and portfolios: 1 active project, a limited compliance check, the 2D/3D viewer and community support.", icon: "grad" },
        { title: "Student Pro", body: "Full features for students: unlimited learning projects, stress tests, scheduling and Ask BuildSync. Price to be announced.", icon: "spark" },
      ] },
      { kind: "steps", title: "How to Start", items: [
        { title: "Sign Up", body: "Create a free account. No card is needed for students." },
        { title: "Verify Your School Email", body: "Verify with a school email to get the workspace at no cost." },
        { title: "Open the Demo Project", body: "Start with the demo project: a sample house, fully loaded." },
      ] },
    ],
    related: ["education", "solutions/engineers", "learn"],
  },
  {
    path: "solutions/government", title: "For Governments", eyebrow: "Solutions",
    intro: "Pre-check permits, build a city digital twin and plan emergency routes.",
    description: "BuildSync AI helps cities, counties and national authorities pre-check permits, build a digital twin and plan emergency routes.",
    actions: { primary: ["Join the Pilot Program", "/government"], secondary: DEMO },
    sections: [
      { kind: "cards", title: "What Governments Use It For", items: [
        { id: "permit-pre-check", title: "Permit Pre-Check", body: "Pre-check permit applications against your jurisdiction’s code set.", icon: "gov" },
        { id: "city-digital-twin", title: "City Digital Twin", body: "Build a digital twin of your city in the same workspace.", icon: "globe" },
        { title: "Emergency Routing", body: "Plan emergency routes for your city.", icon: "wind" },
      ] },
      { kind: "cards", cols: 2, title: "Built and Validated for Your Jurisdiction", items: [
        { title: "Your Code Set", body: "We train and test BuildSync on your full local code set and real reference plans.", icon: "book" },
        { title: "Dedicated Onboarding", body: "Government plans are an annual contract and include dedicated onboarding.", icon: "user", href: "/government", cta: "See the Pilot Program" },
      ] },
    ],
    related: ["government", "solutions/engineers", "trust"],
  },
  {
    path: "government", title: "Government Pilot Program", eyebrow: "Pilot Program",
    intro: "Open BuildSync for your jurisdiction.",
    description: "BuildSync AI is validated one jurisdiction at a time. Learn how the pilot works and contact us to bring BuildSync to your jurisdiction.",
    actions: { primary: ["Contact Sales", "#contact"], secondary: ["For Governments", "/solutions/government"] },
    sections: [
      { kind: "stats", title: "Built and Validated One Jurisdiction at a Time", intro: "We train and test BuildSync on a full local code set and real reference plans, starting in the Caribbean.", items: [
        { value: "1", label: "Pilot Jurisdiction" }, { value: "~100", label: "Reference Plans" }, { value: "Held-Out", label: "Plan Testing" },
      ] },
      { kind: "steps", title: "How a Jurisdiction Opens", items: [
        { title: "Load the Code Set", body: "We load the full local code set that applies in your jurisdiction." },
        { title: "Test on Real Plans", body: "We test against real reference plans and against held-out plans." },
        { title: "Open the Jurisdiction", body: "Each new jurisdiction is checked against held-out plans before it opens." },
      ] },
      { kind: "cards", title: "What the Pilot Includes", items: [
        { title: "Permit Pre-Check", body: "Pre-check permit applications against your code set.", icon: "gov" },
        { title: "City Digital Twin", body: "Build a digital twin of your city.", icon: "globe" },
        { title: "Emergency Routing", body: "Plan emergency routes.", icon: "wind" },
        { title: "Jurisdiction Code Set", body: "Your local code set, tested before it opens.", icon: "book" },
        { title: "Dedicated Onboarding", body: "A dedicated onboarding process for your team.", icon: "user" },
      ] },
      { kind: "form", id: "contact", form: "gov", title: "Bring BuildSync to Your Jurisdiction", intro: "Tell us about your jurisdiction. Government plans are an annual contract." },
    ],
    related: ["solutions/government", "trust", "contact"],
  },

  // -------------------------------------------------------------- Disciplines
  {
    path: "disciplines", title: "Disciplines", eyebrow: "Disciplines",
    intro: "BuildSync is built and validated one step at a time. Civil is live today.",
    description: "Explore the disciplines BuildSync AI covers. Civil engineering is live; electrical, mechanical, automotive and aviation are coming soon.",
    sections: [
      { kind: "widget", widget: "disciplines", title: "Explore BuildSync by Discipline" },
      { kind: "form", form: "waitlist", id: "waitlist", title: "Join the Waitlist", intro: "Pick a discipline that is not live yet and we will tell you when it opens." },
    ],
    related: ["disciplines/civil", "government"],
  },
  {
    path: "disciplines/civil", title: "Civil Engineering", eyebrow: "Live Now",
    intro: "The civil engineering workspace is open. Check plans against code, schedule, cost and test them in one place.",
    description: "BuildSync AI civil engineering workspace: code compliance, scheduling, cost, a 2D/3D viewer, Prompt-to-Plan, solar analysis and AI connectors.",
    crumbs: [["Disciplines", "/disciplines"]],
    actions: { primary: START, secondary: DEMO },
    sections: [
      { kind: "widget", widget: "features", title: "What You Can Do in Civil", intro: "Every feature below is available in the civil engineering workspace." },
      { kind: "cards", cols: 2, title: "Who It Is For", items: [
        { title: "Engineers", body: "Pre-check plans, plan the build and coordinate trades.", icon: "civil", href: "/solutions/engineers", cta: "For Engineers" },
        { title: "Students and Governments", body: "Learn on real projects, or pre-check permits and plan for your city.", icon: "grad", href: "/solutions/students", cta: "For Students" },
      ] },
    ],
    related: ["disciplines", "product"],
  },
  soon("electrical", "Electrical"),
  soon("mechanical", "Mechanical"),
  soon("automotive", "Automotive"),
  soon("aviation", "Aviation"),

  // -------------------------------------------------------------------- Learn
  {
    path: "learn", title: "Learn BuildSync", eyebrow: "Learn",
    intro: "Tutorials, a demo project walkthrough and webinars. Free to learn.",
    description: "Learn BuildSync AI: tutorials, a demo project walkthrough, docs, webinars and community.",
    sections: [
      { kind: "cards", title: "Start Learning", cols: 2, items: [
        { id: "tutorials", title: "Tutorials", body: "Start with the demo project: a sample house, fully loaded.", icon: "book", href: "/demo", cta: "Open the Demo Project" },
        { id: "docs", title: "Docs", body: "Reference documentation for the workspace.", icon: "cube", tag: "Coming Soon" },
        { id: "webinars", title: "Webinars", body: "Live and recorded sessions on using BuildSync.", icon: "calendar", tag: "Coming Soon" },
        { id: "community", title: "Community", body: "Ask questions and learn from other users. Community support comes with Student Free.", icon: "user", tag: "Coming Soon" },
      ] },
      { kind: "cards", cols: 2, title: "Learning With a School?", items: [
        { title: "Education Access", body: "Free for students and educators. Verify with a school email.", icon: "grad", href: "/education", cta: "Get Education Access" },
        { title: "For Students", body: "How a plan becomes a schedule, a budget and a code result.", icon: "civil", href: "/solutions/students", cta: "For Students" },
      ] },
      { kind: "widget", widget: "newsletter", title: "Stay in the Know" },
    ],
    related: ["education", "blog", "product"],
  },
  {
    path: "blog", title: "Newsroom", eyebrow: "Blog",
    intro: "Code updates, new jurisdictions and product news.",
    description: "News from BuildSync AI: building code updates, new jurisdictions and product news.",
    sections: [
      { kind: "prose", title: "No Posts Yet", paras: [
        "The first posts will appear here. They will cover code updates, new jurisdictions and product news.",
        "Subscribe below to get one email a month.",
      ] },
      { kind: "widget", widget: "newsletter", title: "Stay in the Know" },
    ],
    related: ["learn", "product"],
  },
  {
    path: "education", title: "Education Access", eyebrow: "Education",
    intro: "Free for students and educators. Verify with a school email and get the workspace at no cost.",
    description: "BuildSync AI is free for students and educators. Verify with a school email to get the workspace at no cost.",
    actions: { primary: ["Get Education Access", "/signup?plan=student"], secondary: ["For Students", "/solutions/students"] },
    sections: [
      { kind: "steps", title: "How It Works", items: [
        { title: "Sign Up", body: "Create a free account with your school email." },
        { title: "Verify", body: "Verify your school email to unlock education access." },
        { title: "Start Learning", body: "Open the demo project and work on a real plan." },
      ] },
      { kind: "cards", title: "What Is Included", items: [
        { title: "Student Free", body: "$0: 1 active project, a limited compliance check, the 2D/3D viewer and community support.", icon: "grad" },
        { title: "Student Pro", body: "Full features for students: unlimited learning projects, stress tests, scheduling and Ask BuildSync. Price to be announced.", icon: "spark", href: "/#pricing", cta: "See Pricing" },
        { title: "For Educators", body: "Educators get the workspace at no cost after verifying with a school email.", icon: "book" },
      ] },
      { kind: "cards", id: "support", cols: 2, title: "Education Support", items: [
        { title: "Questions About Verification?", body: "Tell us which school you are with and what is not working.", icon: "mail", href: "/contact", cta: "Contact Support" },
        { title: "Learn the Basics First", body: "Start with tutorials and the demo project.", icon: "book", href: "/learn", cta: "Open Learn" },
      ] },
    ],
    related: ["solutions/students", "learn"],
  },
  {
    path: "trust", title: "Trust Center", eyebrow: "Trust",
    intro: "AI-assisted. Engineer-approved.",
    description: "How BuildSync AI keeps licensed engineers in charge: advisory output, PE review flags, human approval of every edit and an audit trail.",
    sections: [
      { kind: "steps", title: "How Responsibility Is Shared", items: [
        { title: "AI Drafts.", body: "Every result is labelled AI-generated, unstamped." },
        { title: "We Flag It.", body: "Life-safety and load-bearing items are automatically marked Requires PE Review." },
        { title: "A PE Signs.", body: "Licensed engineers review, edit and digitally sign, with a full audit trail." },
      ] },
      { kind: "cards", title: "Our Principles", items: [
        { title: "Advisory Output", body: "Results are advice, not a stamp. They are labelled until a licensed engineer signs them.", icon: "shield" },
        { title: "You Approve Every Edit", body: "Agents only propose changes. Nothing is applied until you approve it.", icon: "check" },
        { title: "Validated Jurisdiction by Jurisdiction", body: "Each new jurisdiction is checked against held-out plans before it opens.", icon: "gov" },
        { title: "Bring Your Own AI", body: "Use the AI you trust: Claude, ChatGPT, Kimi, Gemini, a local model or your own.", icon: "plug", href: "/connectors", cta: "See Connectors" },
        { title: "Audit Trail", body: "Reviews and signatures are recorded in a full audit trail.", icon: "book" },
        { title: "Security and Data Handling", body: "Details will be published here before general availability.", icon: "cube", tag: "Coming Soon" },
      ] },
      { kind: "cards", cols: 2, title: "Read the Fine Print", items: [
        { title: "AI Risk Disclosure", body: "What AI can and cannot do in BuildSync.", href: "/legal/ai-risk-disclosure", cta: "Read the Disclosure" },
        { title: "Privacy and Terms", body: "How the site handles data today, and the terms of use.", href: "/legal/privacy", cta: "Read the Privacy Policy" },
      ] },
    ],
    related: ["legal/ai-risk-disclosure", "features/ai"],
  },

  // -------------------------------------------------------------------- Legal
  {
    path: "legal/ai-risk-disclosure", title: "AI Risk Disclosure", eyebrow: "Legal",
    intro: "What AI can and cannot do in BuildSync AI.",
    description: "The AI Risk Disclosure for BuildSync AI: output is advisory and life-safety items need review by a licensed engineer.",
    draft: "Draft. This page is a working draft and has not been reviewed by a lawyer. It will change before launch.",
    cta: false,
    sections: [
      { kind: "prose", title: "AI Can Be Wrong", paras: [
        "BuildSync AI uses artificial intelligence to read plans, check them against building code, and draft schedules, budgets and simulations. AI output can be wrong, incomplete or out of date.",
      ] },
      { kind: "prose", title: "Output Is Advisory", paras: [
        "Every result is labelled AI-generated, unstamped until a licensed engineer reviews and signs it. BuildSync output is advice, not an engineering stamp or a permit decision.",
      ] },
      { kind: "prose", title: "PE Review", paras: [
        "Life-safety and load-bearing items are automatically marked Requires PE Review. Do not rely on BuildSync output for construction, permitting or safety decisions without review by a licensed professional engineer.",
      ] },
      { kind: "prose", title: "Validated Jurisdictions Only", paras: [
        "Code checks cover only jurisdictions that BuildSync has validated. Building codes change, so confirm the edition that currently applies with your authority.",
      ] },
      { kind: "prose", title: "Connected Agents", paras: [
        "Agents you connect only propose changes. You approve every edit, and you remain responsible for what you approve.",
      ] },
      { kind: "prose", title: "Sample Results", paras: [
        "Sample results shown on this website are illustrations. They are not real calculations for a real project.",
      ] },
    ],
    related: ["trust", "legal/terms", "legal/privacy"],
  },
  {
    path: "legal/privacy", title: "Privacy Policy", eyebrow: "Legal",
    intro: "What the BuildSync AI website does with your data today.",
    description: "Privacy policy draft for the BuildSync AI marketing website.",
    draft: "Draft. This page describes the website as it works today and has not been reviewed by a lawyer. It will change before launch.",
    cta: false,
    sections: [
      { kind: "prose", title: "What This Page Covers", paras: [
        "This draft covers the BuildSync AI marketing website only. The workspace and user accounts are not open yet and are not covered.",
      ] },
      { kind: "prose", title: "What the Site Stores in Your Browser", paras: [
        "When you dismiss the announcement bar, the site remembers that choice with one entry in your browser’s local storage (the key is bs-ann). Nothing else is stored by the site itself.",
      ] },
      { kind: "prose", title: "Forms", paras: [
        "The newsletter, waitlist, search, sign-up, log-in and contact forms are not connected to any service yet. What you type into them is not sent or stored.",
      ] },
      { kind: "prose", title: "Fonts, Analytics and Third Parties", paras: [
        "Fonts are served from this site, so your browser does not contact a font service. No analytics or tracking script is installed yet.",
      ] },
      { kind: "prose", title: "Still to Be Completed", paras: [
        "[To be completed with legal counsel before launch: who we are and how to contact us, what we collect once accounts open, how long we keep it, your rights, international transfers and children’s data.]",
      ] },
    ],
    related: ["legal/terms", "legal/ai-risk-disclosure", "trust"],
  },
  {
    path: "legal/terms", title: "Terms of Service", eyebrow: "Legal",
    intro: "The terms for using the BuildSync AI website.",
    description: "Terms of service draft for the BuildSync AI website.",
    draft: "Draft. This page is an outline and has not been reviewed by a lawyer. It will change before launch.",
    cta: false,
    sections: [
      { kind: "prose", title: "Using This Website", paras: [
        "You may browse this website for information about BuildSync AI. The workspace, accounts and paid plans are not open yet and are not covered by these terms.",
      ] },
      { kind: "prose", title: "AI Output Is Advisory", paras: [
        "Anything BuildSync AI produces is advisory and must be reviewed by a licensed professional engineer before it is relied on. See the AI Risk Disclosure.",
      ] },
      { kind: "prose", title: "Ownership", paras: [
        "© 2026 BuildSync AI. All rights reserved. The website’s content, design and code may not be copied without permission.",
      ] },
      { kind: "prose", title: "Still to Be Completed", paras: [
        "[To be completed with legal counsel before launch: accounts and acceptable use, payment terms, intellectual property in your projects, limitation of liability, termination, governing law and how to reach us.]",
      ] },
    ],
    related: ["legal/privacy", "legal/ai-risk-disclosure", "trust"],
  },

  // ------------------------------------------------------------------ Company
  {
    path: "company/about", title: "About BuildSync AI", eyebrow: "Company",
    intro: "An AI workspace for engineering plans.",
    description: "BuildSync AI is an AI workspace for engineering plans. We check every plan against code before it is submitted.",
    sections: [
      { kind: "cards", title: "What We Believe", items: [
        { title: "Check Before You Submit", body: "Every plan should be checked against the code that applies, before it is submitted.", icon: "shield" },
        { title: "Engineers Stay in Charge", body: "AI drafts, the system flags what needs review, and a licensed engineer signs.", icon: "user", href: "/trust", cta: "Trust Center" },
        { title: "One Jurisdiction at a Time", body: "We train and test on a full local code set and real reference plans, starting in the Caribbean.", icon: "gov", href: "/government", cta: "Pilot Program" },
      ] },
      { kind: "cards", cols: 2, title: "Where We Are Today", items: [
        { title: "Civil Is Live", body: "The civil engineering workspace is open in early access.", icon: "civil", href: "/disciplines/civil", cta: "See Civil" },
        { title: "More Disciplines Coming", body: "Electrical, mechanical, automotive and aviation are on the waitlist.", icon: "globe", href: "/disciplines", cta: "Join the Waitlist" },
      ] },
    ],
    related: ["company/careers", "contact", "trust"],
  },
  {
    path: "company/careers", title: "Careers", eyebrow: "Company",
    intro: "There are no open roles listed right now.",
    description: "Careers at BuildSync AI. No open roles are listed yet; get in touch if you want to help.",
    sections: [
      { kind: "prose", title: "Want to Help Build This?", paras: [
        "If you work in civil engineering, building codes or AI and want to help check every plan against code, tell us about yourself. We will keep your note in mind when roles open.",
      ] },
      { kind: "cards", cols: 2, title: "Get in Touch", items: [
        { title: "Contact Us", body: "Send a short note about what you do and what you would like to work on.", icon: "mail", href: "/contact", cta: "Contact Us" },
        { title: "About BuildSync AI", body: "Read what we believe and where we are today.", icon: "book", href: "/company/about", cta: "About Us" },
      ] },
    ],
    related: ["company/about", "contact"],
  },
  {
    path: "contact", title: "Contact Us", eyebrow: "Contact",
    intro: "Questions, support, sales or press? Send us a message.",
    description: "Contact BuildSync AI for support, sales, education, government pilots or press.",
    sections: [
      { kind: "cards", title: "Who to Talk To", items: [
        { title: "Support", body: "Help with the workspace or your account.", icon: "user" },
        { title: "Government and Sales", body: "Bring BuildSync to your jurisdiction.", icon: "gov", href: "/government#contact", cta: "Pilot Program" },
        { title: "Education", body: "Verification and classroom questions.", icon: "grad", href: "/education#support", cta: "Education Support" },
      ] },
      { kind: "form", form: "contact", title: "Send a Message", intro: "We read every message." },
    ],
    related: ["learn", "company/about"],
  },
  {
    path: "status", title: "Product Status", eyebrow: "Support",
    intro: "Live service status will appear here once the public workspace is running.",
    description: "Service status for BuildSync AI.",
    sections: [
      { kind: "prose", title: "No Live Status Yet", paras: [
        "The workspace is in early access and is not monitored by a public status page yet. When it is, you will see the current state of the workspace and the AI connectors here.",
        "If something is not working, please contact support.",
      ] },
      { kind: "cards", cols: 2, title: "Need Help Now?", items: [
        { title: "Contact Support", body: "Tell us what you see and we will look into it.", icon: "mail", href: "/contact", cta: "Contact Support" },
        { title: "Learn BuildSync", body: "Tutorials and the demo project.", icon: "book", href: "/learn", cta: "Open Learn" },
      ] },
    ],
  },

  // ------------------------------------------------------------ Sign up / in
  {
    path: "signup", title: "Start Free", eyebrow: "Get Started",
    intro: "Free for students. No card needed.",
    description: "Create your free BuildSync AI account. Free for students, no card needed.",
    cta: false,
    sections: [
      { kind: "form", form: "signup", title: "Create Your Account", intro: "Choose a plan to start with. You can change it later." },
      { kind: "cards", cols: 2, title: "Not Sure Which Plan?", items: [
        { title: "See the Plans", body: "Student Free, Student Pro, Engineer and Government.", icon: "check", href: "/#pricing", cta: "See Pricing" },
        { title: "Try the Demo First", body: "Open a sample house, fully loaded, with no signup.", icon: "spark", href: "/demo", cta: "Try the Demo" },
      ] },
    ],
  },
  {
    path: "login", title: "Log In", eyebrow: "Welcome Back",
    intro: "Log in to your BuildSync AI workspace.",
    description: "Log in to your BuildSync AI account.",
    cta: false,
    sections: [
      { kind: "form", form: "login", title: "Log In to Your Account" },
    ],
  },
];

/** Every information page by route (no leading slash). */
export const PAGES: Record<string, PageDef> = Object.fromEntries(PAGE_LIST.map((p) => [p.path, p]));
