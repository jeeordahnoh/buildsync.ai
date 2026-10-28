<!--
  BuildSync AI · public/README.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.

  WHAT IT IS
    The folder guide for public/, the folder of files served as-is by Next.js.

  WHAT IT IS FOR
    Says which images live here and where each one is used.

  USED BY
    Nothing reads this file. It is documentation only. (Next.js would also serve
    it at /README.md, which is harmless; delete it if you do not want that.)

  IF SOMETHING BREAKS
    - An image is missing on the site: check the file name below. A file at
      public/x.png is served at /x.png.
-->

# public/

Static files. Everything here is served from the site root without processing,
so `public/buildsync-logo-wide.png` is available at `/buildsync-logo-wide.png`.
The PNG files are binary and cannot hold a header comment.

| File | What it is |
|---|---|
| `buildsync-logo-ink.png` | The logo shown on the site (405 x 93 px), made for light backgrounds: the wordmark in the brand blue (`#004AAD`) on a transparent background, with the "AI" box as a blue block with white letters. Used by the `Logo` component in `components/Icon.tsx` in the header, mobile menu, footer and how-it-works card |
| `buildsync-logo-wide.png` | The solid blue badge version (445 x 133 px): the original wordmark cropped with 24 px of blue around it, unchanged colours. For dark or blue backgrounds. Not used on a page yet |
| `buildsync-logo.png` | The original square logo (500 x 500 px), kept unchanged as the master copy. Not used on a page yet |

Author: Giordano Bertin-Maurice. Copyright © 2026 Giordano Bertin-Maurice. All rights reserved.
