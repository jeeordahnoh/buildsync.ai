<!--
  BuildSync AI · lib/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for lib/, the shared data used by the site.

  WHAT IT IS FOR
    Says where the site's wording, links and prices are kept, so they can be
    changed without touching any layout code.

  USED BY
    Nothing reads this file. It is documentation only.

  IF SOMETHING BREAKS
    Open site.ts and read its header comment. A wrong menu entry, card, price or
    compare row is changed there.
-->

# lib/

Plain data and helpers with no React in them.

| File | What it does |
|---|---|
| `site.ts` | All shared content: header menus, discipline tiles, feature cards, compare rows and prices. Prices show `{{PRICE}}` until they are final |

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
