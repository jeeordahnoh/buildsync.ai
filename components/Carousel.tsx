"use client";
import Link from "next/link";
import { useRef } from "react";
import { FEATURES } from "@/lib/site";
import { Icon } from "./Icon";
import { WorkspaceMock, MockView } from "./WorkspaceMock";

export function FeatureCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const go = (d: number) => track.current?.scrollBy({ left: d * 324, behavior: "smooth" });
  return (
    <div className="car">
      <p className="sr-only" id="car-label">Start of {FEATURES.length}-item list</p>
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
      <p className="sr-only">End of {FEATURES.length}-item list</p>
      <div className="car-ctl">
        <button className="round" aria-label="Previous cards" onClick={() => go(-1)}><Icon name="left" /></button>
        <button className="round" aria-label="Next cards" onClick={() => go(1)}><Icon name="right" /></button>
      </div>
    </div>
  );
}
