"use client";

import { SECTIONS } from "@/lib/constants";

const MARQUEE_TEXT = "INTELLIGENCE, ARCHITECTED";
const SEPARATOR = " — ";
const REPEAT_COUNT = 10;

function MarqueeContent() {
  return (
    <>
      {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
        <span key={i} className="whitespace-nowrap">
          {MARQUEE_TEXT}
          <span className="mx-4 text-accent">{SEPARATOR}</span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <section
      id={SECTIONS.MARQUEE}
      className="overflow-hidden border-y border-text/10 py-8 md:py-12"
    >
      <div
        className="flex w-max"
        style={{ animation: "marquee-scroll 50s linear infinite" }}
      >
        <div className="flex font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-none">
          <MarqueeContent />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-none">
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
}
