<!--
  BuildSync AI · app/(marketing)/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for app/(marketing)/, the route group that holds the public
    marketing pages.

  WHAT IT IS FOR
    Explains why the folder name has brackets and what the two files here do.

  USED BY
    Nothing reads this file. It is documentation only (Next.js ignores README.md
    inside app/).

  IF SOMETHING BREAKS
    - A page shows a 404: only the homepage ("/") is built so far. Other links
      point at planned pages that do not exist yet.
    - The header or footer is missing or doubled: see layout.tsx.
-->

# app/(marketing)/

The public marketing website of BuildSync AI. The brackets make this a Next.js
"route group": it shares one header and footer between the pages inside it, but
the name `(marketing)` never appears in the URL (`page.tsx` here is `/`).

| File | What it does |
|---|---|
| `layout.tsx` | Shared frame for every marketing page: announcement bar, sticky header, the page itself, footer |
| `page.tsx` | The homepage (`/`). Puts Blocks 2-15 of the spec in order; the interactive pieces live in `components/` and the text, links and prices in `lib/site.ts` |

Only the homepage is built so far. Pages such as `/demo`, `/signup`, `/pricing`
and `/features/*` are planned and show a 404 until they are added to this folder.

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
