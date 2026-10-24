/**
 * BuildSync AI · components/Newsletter.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports Newsletter: the "Stay in the Know" box with an email field and a
 *   Subscribe button (homepage Block 14). After pressing Subscribe it replaces
 *   the form with "Thanks. You're on the list."
 *
 * WHAT IT IS FOR
 *   Collect emails for the monthly product / code-update newsletter.
 *
 * NOT CONNECTED YET (read this when debugging)
 *   The email address is NOT sent or stored anywhere. The submit handler only
 *   switches `done` to true so the thank-you message appears. To make it real,
 *   replace the onSubmit handler with a request to your email provider or to
 *   an API route, and show an error state if it fails.
 *
 * WHY "use client"
 *   It keeps the "submitted" flag in React state.
 *
 * USED BY
 *   app/(marketing)/page.tsx.
 *
 * IF SOMETHING BREAKS
 *   - `data-track="newsletter_subscribe"` is a label for future analytics; no
 *     tracking script reads it yet.
 *   - Styles: app/globals.css under "learn / news" (.news) and "hero"
 *     (.capture, .capture-sm).
 */
"use client";
import { useState } from "react";

/**
 * The newsletter box. `done` is false until the visitor submits the form.
 */
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <form className="news" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div>
        <h3>Stay in the Know</h3>
        <p>Code updates, new jurisdictions and product news. One email a month.</p>
      </div>
      {/* before submit: email field + button; after submit: thank-you message */}
      {done ? (
        <p className="ok">Thanks. You’re on the list.</p>
      ) : (
        <div className="capture capture-sm">
          <input type="email" required placeholder="you@company.com" aria-label="Email" />
          <button className="btn btn-primary" data-track="newsletter_subscribe">Subscribe</button>
        </div>
      )}
    </form>
  );
}
