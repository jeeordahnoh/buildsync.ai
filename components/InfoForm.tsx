/**
 * BuildSync AI · components/InfoForm.tsx
 *
 * Author:    Giordano Bertin-Maurice
 * Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
 *
 * WHAT IT DOES
 *   Exports InfoForm: the form on the sign-up, log-in, contact, waitlist and
 *   government-pilot pages. `kind` picks the fields and the button label:
 *     signup   name, email, plan            (pre-filled from /signup?email=&plan=)
 *     login    email, password
 *     contact  name, email, topic, message
 *     waitlist email and discipline         (`discipline` pre-selects one)
 *     gov      name, agency, email, message
 *
 * WHAT IT IS FOR
 *   Gives the information pages their forms (see the "form" section in
 *   lib/pages.ts and components/InfoPage.tsx). The hero email box and the pricing
 *   cards send visitors to /signup with ?email= and ?plan= in the address.
 *
 * NOT CONNECTED YET (read this when debugging)
 *   Nothing is sent, stored or checked. Pressing the button only shows the grey
 *   notice from NOTICE below, which says so. It does NOT pretend to succeed, so a
 *   visitor is never told "thanks, you are on the list" when nothing was saved.
 *   To make a form real: replace the onSubmit handler with a request to your
 *   email provider, sign-up service or an API route, then show a success message
 *   instead of the notice (and an error message if the request fails).
 *
 * WHY "use client"
 *   It keeps the typed values and the "pressed" flag in React state and reads the
 *   address bar (window.location) after the page has loaded.
 *
 * USED BY
 *   components/InfoPage.tsx.
 *
 * IF SOMETHING BREAKS
 *   - The email or plan is not pre-filled on /signup: it is read from the address
 *     bar inside useEffect (not during render) so the server HTML and the first
 *     browser render match. Only "student" and "engineer" are accepted as ?plan=.
 *   - Styles: app/globals.css under "Information pages" (.iform, .fld, .inote).
 *   - data-track values are labels for future analytics; no tracking script reads
 *     them yet.
 */
"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

/** Which form to draw. */
export type FormKind = "signup" | "login" | "contact" | "waitlist" | "gov";

// The message shown after pressing the button. Honest on purpose: nothing was sent.
const NOTICE: Record<FormKind, string> = {
  signup: "Sign-up is not open yet, so nothing was sent. Please check back soon.",
  login: "Log-in is not open yet. The workspace is in early access and accounts are not connected.",
  contact: "This form is not connected yet, so your message was not sent.",
  waitlist: "The waitlist is not connected yet, so nothing was saved.",
  gov: "This form is not connected yet, so your message was not sent.",
};

// Button label and analytics label for each form.
const BUTTON: Record<FormKind, [string, string]> = {
  signup: ["Start Free", "start_free"],
  login: ["Log In", "log_in"],
  contact: ["Send Message", "contact_send"],
  waitlist: ["Join the Waitlist", "waitlist_join"],
  gov: ["Contact Sales", "contact_sales"],
};

/** One labelled field. */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="fld">
      <span>{label}</span>
      {children}
    </label>
  );
}

/**
 * A form for an information page.
 * State: `sent` (button was pressed, show the notice), `email`, `plan`, `disc`.
 */
export function InfoForm({ kind, discipline }: { kind: FormKind; discipline?: string }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("student");
  const [disc, setDisc] = useState(discipline ?? "electrical");

  // Sign-up only: pre-fill from /signup?email=...&plan=... (links from the hero and the pricing cards).
  useEffect(() => {
    if (kind !== "signup") return;
    const q = new URLSearchParams(window.location.search);
    const e = q.get("email");
    const p = q.get("plan");
    if (e) setEmail(e);
    if (p === "student" || p === "engineer") setPlan(p);
  }, [kind]);

  const [label, track] = BUTTON[kind];
  return (
    <form className="iform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      {kind === "signup" && (
        <>
          <Field label="Full Name"><input type="text" autoComplete="name" /></Field>
          <Field label="Email"><input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
          <Field label="Plan">
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="student">Student (Free or Pro)</option>
              <option value="engineer">Engineer</option>
            </select>
          </Field>
        </>
      )}
      {kind === "login" && (
        <>
          <Field label="Email"><input type="email" required autoComplete="email" /></Field>
          <Field label="Password"><input type="password" required autoComplete="current-password" /></Field>
        </>
      )}
      {kind === "contact" && (
        <>
          <Field label="Name"><input type="text" autoComplete="name" /></Field>
          <Field label="Email"><input type="email" required autoComplete="email" /></Field>
          <Field label="Topic">
            <select defaultValue="support">
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="education">Education</option>
              <option value="press">Press</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Message"><textarea required rows={5} /></Field>
        </>
      )}
      {kind === "waitlist" && (
        <>
          <Field label="Email"><input type="email" required autoComplete="email" /></Field>
          <Field label="Discipline">
            <select value={disc} onChange={(e) => setDisc(e.target.value)}>
              <option value="electrical">Electrical</option>
              <option value="mechanical">Mechanical</option>
              <option value="automotive">Automotive</option>
              <option value="aviation">Aviation</option>
            </select>
          </Field>
        </>
      )}
      {kind === "gov" && (
        <>
          <Field label="Name"><input type="text" autoComplete="name" /></Field>
          <Field label="Agency or Jurisdiction"><input type="text" /></Field>
          <Field label="Email"><input type="email" required autoComplete="email" /></Field>
          <Field label="Message"><textarea rows={5} /></Field>
        </>
      )}
      <button className="btn btn-primary" data-track={track}>{label}</button>
      {sent && <p className="inote" role="status">{NOTICE[kind]}</p>}
      {kind === "signup" && <p className="small">Already have an account? <Link href="/login">Log In</Link></p>}
      {kind === "login" && <p className="small">New to BuildSync? <Link href="/signup">Start Free</Link></p>}
    </form>
  );
}
