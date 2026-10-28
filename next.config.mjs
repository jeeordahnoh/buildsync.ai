/**
 * BuildSync AI · next.config.mjs
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   The Next.js configuration file. Right now it only switches on React Strict
 *   Mode.
 *
 * WHAT IT IS FOR
 *   One place for framework settings (redirects, image domains, headers, ...)
 *   when the site needs them later.
 *
 * IF SOMETHING BREAKS
 *   - Strict Mode only affects `npm run dev`: React runs components and effects
 *     twice on purpose to expose bugs. Timers or listeners that seem to run
 *     twice in development (for example the hero preview) are normal; the
 *     production build runs them once.
 *   - After editing this file, restart `npm run dev` (Next reads it at start-up).
 */

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
