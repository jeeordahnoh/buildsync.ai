<!--
  BuildSync AI · app/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for app/, the Next.js "App Router" folder.

  WHAT IT IS FOR
    Tells you what lives in app/ and what each item does, so a missing page,
    wrong icon or broken style is easy to trace.

  USED BY
    Nothing reads this file. It is documentation only (Next.js ignores README.md
    inside app/).

  IF SOMETHING BREAKS
    Use the table below to find the file, then read the header comment at the
    top of that file.
-->

# app/

Everything the website serves lives here: the shared page frame, the global
stylesheet, the browser-tab icons and the pages themselves. In the App Router,
a folder is a URL path and special file names (`layout.tsx`, `page.tsx`) are
the pages.

| Item | What it does |
|---|---|
| `layout.tsx` | Root layout: `<html>`/`<body>`, fonts, global CSS, default page title and share-card metadata. Wraps every page |
| `globals.css` | The one stylesheet: design tokens, every homepage section and the responsive rules |
| `icon.svg`, `favicon.ico`, `apple-icon.png` | Browser-tab icon (modern browsers), favicon (older browsers) and iPhone/iPad home-screen icon. The same blue "B" mark; keep the three in step. The .ico and .png are binary, so they carry no header |
| `(marketing)/` | The public marketing pages and their shared header and footer. The folder name in parentheses is a route group and is not part of the URL. See its own README |

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
