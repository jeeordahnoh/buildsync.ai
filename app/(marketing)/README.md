<!--
  BuildSync AI · app/(marketing)/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for app/(marketing)/, the route group that holds the public
    marketing pages.

  WHAT IT IS FOR
    Explains why the folder name has brackets, what the files here do and how
    every information page gets its route.

  USED BY
    Nothing reads this file. It is documentation only (Next.js ignores README.md
    inside app/).

  IF SOMETHING BREAKS
    - A page shows a 404: only /demo and /features/simulation are not built yet
      (on purpose). Any other address must be an entry in lib/pages.ts.
    - The header or footer is missing or doubled: see layout.tsx.
-->

# app/(marketing)/

The public marketing website of BuildSync AI. The brackets make this a Next.js
"route group": it shares one header and footer between the pages inside it, but
the name `(marketing)` never appears in the URL (`page.tsx` here is `/`).

| Item | What it does |
|---|---|
| `layout.tsx` | Shared frame for every marketing page: announcement bar, sticky header, the page itself, footer |
| `page.tsx` | The homepage (`/`). Puts Blocks 2-15 of the spec in order; the interactive pieces live in `components/` and the text, links and prices in `lib/site.ts`. Its sections `#compare` and `#pricing` are where the header and footer Compare and Pricing links go |
| `[...slug]/page.tsx` | The route for every other page. The brackets and dots make it a "catch-all": `/product`, `/features/compliance`, `/legal/privacy` and so on all land here, and the page is looked up in `lib/pages.ts` |

## Pages

Everything below is an entry in `lib/pages.ts` (edit the wording there):

- Product: `/product`, `/features/compliance`, `/features/scheduling`, `/features/cost`,
  `/features/site-viewer`, `/features/prompt-to-plan`, `/features/solar`, `/features/ai`, `/connectors`
- Solutions: `/solutions/engineers`, `/solutions/students`, `/solutions/government`, `/government`
- Disciplines: `/disciplines`, `/disciplines/civil`, `/disciplines/electrical`, `/disciplines/mechanical`,
  `/disciplines/automotive`, `/disciplines/aviation`
- Learn and trust: `/learn`, `/blog`, `/education`, `/trust`
- Legal (drafts): `/legal/ai-risk-disclosure`, `/legal/privacy`, `/legal/terms`
- Company and help: `/company/about`, `/company/careers`, `/contact`, `/status`
- Accounts (forms not connected): `/signup`, `/login`

Not built yet, on purpose: `/demo` and `/features/simulation` show a 404. To build one,
create its own folder here (for example `demo/page.tsx`); an explicit folder always wins
over the catch-all. There are no `/compare` or `/pricing` pages: those links go to the
homepage sections `/#compare` and `/#pricing`.

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
