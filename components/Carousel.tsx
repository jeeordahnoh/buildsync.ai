/**
 * BuildSync AI · components/Carousel.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports FeatureCarousel: a horizontally scrolling row of 8 tall feature
 *   cards (homepage Block 4, "What you can do in BuildSync"). Each card shows a
 *   workspace thumbnail, an icon, a title, a one-line description and two
 *   buttons ("Explore feature" and "Try in demo"). Previous/next buttons and the
 *   left/right arrow keys scroll the row.
 *
 * WHAT IT IS FOR
 *   Lets visitors browse every product feature quickly and jump into the demo
 *   on the matching panel (spec Block 4).
 *
 * WHY "use client"
 *   It holds a DOM reference to the scrolling list and handles clicks and keys.
 *
 * USED BY
 *   app/(marketing)/page.tsx. Card data comes from FEATURES in lib/site.ts.
 *   Thumbnails are drawn by components/WorkspaceMock.tsx (with `crop`).
 *
 * IF SOMETHING BREAKS
 *   - Arrow buttons scroll the wrong distance: `go()` moves 324 px = card width
 *     304 px + gap 20 px. Keep it in step with `.fcard { flex: 0 0 304px }` and
 *     `.car-track { gap: 20px }` in app/globals.css. On phones (600px and below)
 *     cards are 272 px wide, so one click moves a little more than one card;
 *     scroll-snap then settles on the nearest card.
 *   - Arrow keys do nothing: the list itself must have keyboard focus
 *     (tabIndex=0), so click or Tab onto it first.
 *   - Screen readers: the two `sr-only` paragraphs announce "Start of 8-item
 *     list" / "End of 8-item list" (accessibility requirement in the spec).
 *   - A card thumbnail is wrong or blank: check `view` of that item in
 *     lib/site.ts. It is cast with `as MockView` because FEATURES is `as const`.
 *   - Buttons lead to 404s: /features/* and /demo are not built yet.
 *   - `data-track="feature_card_click"` is a label for future analytics; no
 *     tracking script reads it yet.
 */
"use client";
import Link from "next/link";
import { useRef } from "react";
import { FEATURES } from "@/lib/site";
import { Icon } from "./Icon";
import { WorkspaceMock, MockView } from "./WorkspaceMock";

/**
 * The feature card carousel.
 * `track` points at the scrolling <ul>. `go(d)` scrolls it by d cards
 * (d = 1 forward, -1 back) with a smooth animation.
 */
export function FeatureCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const go = (d: number) => track.current?.scrollBy({ left: d * 324, behavior: "smooth" });
  return (
    <div className="car">
      {/* read by screen readers only: marks the start of the list */}
      <p className="sr-only" id="car-label">Start of {FEATURES.length}-item list</p>
      {/* the scrolling track: keyboard focusable, left/right arrows scroll it */}
      <ul
        ref={track}
        className="car-track"
        tabIndex={0}
        aria-labelledby="car-label"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* one card per feature: thumbnail, icon, text, two buttons */}
        {FEATURES.map((f) => (
          <li key={f.name} className="fcard">
            <div className="fcard-img"><WorkspaceMock view={f.view as MockView} crop /></div>
            <div className="fcard-body">
              <span className="fcard-ico"><Icon name={f.icon} /></span>
              <h3>{f.name}</h3>
              <p>{f.line}</p>
              <div className="fcard-btns">
                <Link href={f.href} className="btn btn-primary btn-sm" data-track="feature_card_click">Explore feature</Link>
                <Link href={f.demo} className="btn btn-secondary btn-sm">Try in demo</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* read by screen readers only: marks the end of the list */}
      <p className="sr-only">End of {FEATURES.length}-item list</p>
      {/* previous / next buttons under the track */}
      <div className="car-ctl">
        <button className="round" aria-label="Previous cards" onClick={() => go(-1)}><Icon name="left" /></button>
        <button className="round" aria-label="Next cards" onClick={() => go(1)}><Icon name="right" /></button>
      </div>
    </div>
  );
}
