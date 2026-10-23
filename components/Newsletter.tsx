"use client";
import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <form className="news" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div>
        <h3>Stay in the know</h3>
        <p>Code updates, new jurisdictions and product news. One email a month.</p>
      </div>
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
