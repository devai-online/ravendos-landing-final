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
      className="overflow-hidden bg-white py-12 md:py-16 relative z-30"
    >
      <div
        className="flex w-max"
        style={{ animation: "marquee-scroll 50s linear infinite" }}
      >
        <div className="flex font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-none text-[#0A0A0A]">
          <MarqueeContent />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-none text-[#0A0A0A]">
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
}
