"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkspaceMock, MockView } from "./WorkspaceMock";
import { Icon } from "./Icon";

const STATES: { view: MockView; chip: string }[] = [
  { view: "compliance", chip: "① Compliance check" },
  { view: "section", chip: "② Section cut" },
  { view: "stress", chip: "③ 200 mph hurricane stress test" },
  { view: "timeline", chip: "④ 3-month time-window query" },
];

export function Hero() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => { if (!reduced.current) setI((n) => (n + 1) % STATES.length); }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const s = STATES[i];
  return (
    <section className="hero">
      <div className="wrap hero-top">
        <span className="pill-eyebrow">Free for students · no card needed</span>
        <h1>Check every plan against code.<br />Before it’s submitted.</h1>
        <p className="lede">
          BuildSync AI reads your drawings, checks them against your jurisdiction’s building code, and turns them into a
          schedule, budget and stress-tested 3D model — in one workspace.
        </p>
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
          <div className="dots" aria-hidden="true">
            {STATES.map((_, n) => <span key={n} className={n === i ? "on" : ""} />)}
          </div>
        </Link>
        <p className="caption">Live preview of the BuildSync workspace, filled with a sample project.</p>
      </div>
    </section>
  );
}
