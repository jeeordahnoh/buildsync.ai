/**
 * BuildSync AI · components/Hero.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Renders the top section of the homepage (Block 2):
 *     - eyebrow pill, two-line headline, short description
 *     - email box + "Start free" button (goes to /signup?email=...)
 *     - "Try the demo - no signup needed" link and the trust line
 *     - a large preview frame of the workspace that changes every 4 seconds
 *       through 4 states (compliance, section cut, hurricane test, 3-month query)
 *
 * WHAT IT IS FOR
 *   The main conversion area of the site: get a visitor to sign up or open the
 *   demo, and show the product at once (spec Block 2).
 *
 * WHY "use client"
 *   It keeps state (email text, current preview state, paused flag), runs a
 *   timer, reads the "reduced motion" setting and navigates with the router.
 *
 * USED BY
 *   app/(marketing)/page.tsx. The preview itself is drawn by
 *   components/WorkspaceMock.tsx.
 *
 * IF SOMETHING BREAKS
 *   - Preview never changes: the timer is stopped while the mouse or keyboard
 *     focus is on the preview (`paused`), and it never advances when the
 *     visitor's system has "reduce motion" switched on (`reduced`).
 *   - Preview changes too fast or slow: the 4000 (ms) value in the second
 *     useEffect.
 *   - To change what the preview shows, edit STATES below (view = which
 *     WorkspaceMock screen, chip = caption text).
 *   - Submitting the email goes to /signup?email=<typed email>. /signup does
 *     not exist yet, so it shows a 404 until that page is built.
 *   - In React dev mode (Strict Mode) effects run twice on purpose; this is
 *     normal and does not happen in the production build.
 *   - `data-track="start_free"` / `"try_demo"` are click-tracking labels for
 *     future analytics (spec section 7, item 6). No tracking script is
 *     installed yet, so nothing reads them today.
 *   - Layout classes (.hero, .capture, .preview, .dots, ...) are in
 *     app/globals.css under "hero".
 */
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkspaceMock, MockView } from "./WorkspaceMock";
import { Icon } from "./Icon";

// The four states the preview cycles through, in order (spec Block 2).
// view = which WorkspaceMock screen to draw; chip = caption pill text.
const STATES: { view: MockView; chip: string }[] = [
  { view: "compliance", chip: "① Compliance check" },
  { view: "section", chip: "② Section cut" },
  { view: "stress", chip: "③ 200 mph hurricane stress test" },
  { view: "timeline", chip: "④ 3-month time-window query" },
];

/**
 * The homepage hero section.
 * State:
 *   email   text typed in the email box
 *   i       index of the current preview state in STATES
 *   paused  true while the preview is hovered or focused (stops the cycle)
 *   reduced ref (not state) holding "visitor prefers reduced motion"; a ref
 *           because changing it should not re-render the page
 */
export function Hero() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  // After mount, read the visitor's "reduce motion" system setting.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  // Auto-advance the preview every 4 seconds. The timer is rebuilt whenever
  // `paused` changes: when paused it does nothing, when resumed it starts a
  // fresh 4-second countdown. Cleaned up on unmount.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => { if (!reduced.current) setI((n) => (n + 1) % STATES.length); }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  // The state being shown right now.
  const s = STATES[i];
  return (
    <section className="hero">
      {/* top block: eyebrow, headline, description, email capture, demo link, trust line */}
      <div className="wrap hero-top">
        <span className="pill-eyebrow">Free for students · no card needed</span>
        <h1>Check every plan against code.<br />Before it’s submitted.</h1>
        <p className="lede">
          BuildSync AI reads your drawings, checks them against your jurisdiction’s building code, and turns them into a
          schedule, budget and stress-tested 3D model — in one workspace.
        </p>
        {/* email capture: on submit, go to the signup page with the email in the URL */}
        <form
          className="capture"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/signup?email=${encodeURIComponent(email)}`);
          }}
        >
          <input type="email" required placeholder="Enter your work email" aria-label="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary" data-track="start_free">Start free</button>
        </form>
        <Link href="/demo" className="link-arrow" data-track="try_demo">Try the demo — no signup needed <Icon name="arrow" size={16} /></Link>
        <p className="trust-line">Advisory output · PE sign-off built in · Bring your own AI</p>
      </div>

      {/* live preview: the whole frame is a link to the demo; hover/focus pauses the cycle */}
      <div className="wrap">
        <Link
          href="/demo"
          className="preview"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-label="Open the demo workspace"
        >
          <div className="preview-frame">
            <WorkspaceMock view={s.view} chip={s.chip} />
          </div>
          {/* progress dots: one per state, the current one is stretched */}
          <div className="dots" aria-hidden="true">
            {STATES.map((_, n) => <span key={n} className={n === i ? "on" : ""} />)}
          </div>
        </Link>
        <p className="caption">Live preview of the BuildSync workspace, filled with a sample project.</p>
      </div>
    </section>
  );
}
