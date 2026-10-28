/**
 * BuildSync AI · components/Icon.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports two small building blocks:
 *     - Icon: draws a line icon (inline SVG) chosen by name from the PATHS map.
 *     - Logo: the BuildSync AI logo, an image (public/buildsync-logo-ink.png).
 *
 * WHAT IT IS FOR
 *   A tiny built-in icon set so the site needs no icon library. All icons share
 *   one style (24x24 grid, 1.6 stroke, round ends) and take their colour from
 *   the surrounding text colour (stroke="currentColor").
 *
 * USED BY
 *   Almost every component: Header, Hero, Carousel, Showcase, Compare, Pricing,
 *   Footer and app/(marketing)/page.tsx. Icon names come from lib/site.ts.
 *
 * IF SOMETHING BREAKS
 *   - An icon renders as a cube: the name is misspelled or missing from PATHS
 *     (unknown names fall back to PATHS.cube on purpose).
 *   - To add an icon: add a new key to PATHS using 24x24 coordinates.
 *   - The logo is missing (broken-image icon): the file
 *     public/buildsync-logo-ink.png was moved or renamed. Next.js serves
 *     everything in public/ from the site root, so the URL is
 *     /buildsync-logo-ink.png.
 *   - The logo is the wrong size: its height is set in app/globals.css under
 *     "logo" (.logo, plus one override each for the how-it-works centre card and
 *     the mobile menu). The width follows from the image's proportions.
 *   - To change the logo, replace the PNG in public/ (keep the file name, or
 *     update `src` in Logo below). The solid blue badge version and the full
 *     square original are kept next to it (see public/README.md).
 */

// Icon drawings, keyed by the name used in <Icon name="..." />.
// Each value is one or more SVG shapes inside a 24x24 box. Groups:
//   discipline icons ... civil, gov, electrical, mechanical, automotive, aviation
//   feature icons ..... shield, calendar, cost, wind, cube, spark, sun, plug
//   interface icons ... search, arrow, left, right, close, menu, chev, check
//   other ............. book, grad, globe, user
//   social icons ...... ig (Instagram), x, in (LinkedIn), mail
const PATHS: Record<string, React.ReactNode> = {
  civil: <><path d="M3 20h18M5 20V9l7-5 7 5v11" /><path d="M9 20v-6h6v6" /></>,
  gov: <><path d="M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18" /></>,
  electrical: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
  mechanical: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  automotive: <><path d="M4 16V12l2-5h12l2 5v4M4 16h16M4 16v2h3v-2M17 16v2h3v-2" /><circle cx="8" cy="13" r=".6" /><circle cx="16" cy="13" r=".6" /></>,
  aviation: <path d="M21 4L3 11l7 2 2 7 9-16zM10 13l11-9" />,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  cost: <><circle cx="12" cy="12" r="9" /><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2.1-.5-2.6-1.5M12 6v1.5M12 16.5V18" /></>,
  wind: <path d="M3 8h11a3 3 0 10-3-3M3 12h16a3 3 0 11-3 3M3 16h8" />,
  cube: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
  plug: <><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chev: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  book: <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" /><path d="M4 19a2 2 0 012-2h13" /></>,
  grad: <><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  ig: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" /></>,
  x: <path d="M4 4l16 16M20 4L4 20" />,
  in: <><path d="M6 10v8M6 6.5v.1M11 18v-8M11 13c0-2 1.5-3 3-3s3 1 3 3v5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>,
};

/**
 * Draws one icon.
 * @param name       key of PATHS (falls back to the cube icon if unknown)
 * @param size       width and height in pixels (default 20)
 * @param className  optional extra CSS class
 * The SVG is hidden from screen readers (aria-hidden): icons are decoration,
 * the text or aria-label next to them carries the meaning.
 */
export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? PATHS.cube}
    </svg>
  );
}

/**
 * The BuildSync AI logo: public/buildsync-logo-ink.png (405 x 93 px), the
 * wordmark in the brand blue on a transparent background, with the "AI" box
 * as a blue block with white letters. It is made for LIGHT backgrounds, which is
 * everywhere the logo appears today (white header, mobile menu, footer and
 * how-it-works card). For a dark or blue background use the solid badge
 * public/buildsync-logo-wide.png instead.
 * A plain <img> is used on purpose: it is one small fixed file served from this
 * site, so Next.js image optimisation adds nothing. `width` and `height` are the
 * file's real size; they only reserve the right space while loading, because CSS
 * (.logo) sets the displayed height.
 * @param className  optional extra CSS class
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      className={`logo ${className ?? ""}`}
      src="/buildsync-logo-ink.png"
      width={405}
      height={93}
      alt="BuildSync AI"
    />
  );
}
