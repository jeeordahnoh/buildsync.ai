<!--
  BuildSync AI · components/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for components/, the reusable pieces of the homepage.

  WHAT IT IS FOR
    Lists every component and what it draws, so you can find the right file when
    a section looks or behaves wrongly.

  USED BY
    Nothing reads this file. It is documentation only.

  IF SOMETHING BREAKS
    Open the component named below and read the header comment at the top of the
    file: it says what the file does, where it is used and what to check.
-->

# components/

React components used by the homepage (`app/(marketing)/page.tsx`) and by the
shared header and footer (`app/(marketing)/layout.tsx`). Components that need
state, timers or browser features start with `"use client"`; the rest run on
the server.

| File | What it does |
|---|---|
| `Header.tsx` | Announcement bar, sticky header, mega-menus, search overlay and mobile menu |
| `Hero.tsx` | Hero section: headline, email capture and the auto-cycling workspace preview |
| `Carousel.tsx` | Feature card carousel (8 cards) |
| `Showcase.tsx` | Dark tabbed product showcase |
| `Compare.tsx` | Competitor compare table (competitor cells stay `[verify]` until checked) |
| `Pricing.tsx` | Monthly/Yearly toggle and the four plan cards |
| `Newsletter.tsx` | "Stay in the Know" email box (not connected to an email service yet) |
| `Footer.tsx` | Site footer |
| `Icon.tsx` | Built-in icon set and the BuildSync logo |
| `WorkspaceMock.tsx` | SVG stand-in for the real workspace screenshots |

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
