"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { SECTIONS, PHILOSOPHY_TEXT } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";

const AnimatedTetrahedron = dynamic(
  () =>
    import("@/components/canvas/animated-tetrahedron").then(
      (mod) => mod.AnimatedTetrahedron
    ),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax on the tetrahedron background
      const bg = sectionRef.current.querySelector(".philosophy-bg");
      if (bg) {
        gsap.to(bg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.PHILOSOPHY}
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6"
    >
      {/* ASCII tetrahedron background with parallax */}
      <div className="philosophy-bg absolute inset-0 z-0 flex items-center justify-center opacity-25">
        <div className="h-[40vmin] w-[40vmin] md:h-[60vmin] md:w-[60vmin] max-h-[500px] max-w-[500px]">
          <AnimatedTetrahedron />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center px-2">
        <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-10 md:mb-14">
          Our Philosophy
        </span>
        <SplitText
          as="p"
          className="font-[family-name:var(--font-heading)] text-[clamp(1.3rem,3.5vw,2.8rem)] font-bold uppercase leading-snug"
        >
          {PHILOSOPHY_TEXT}
        </SplitText>
      </div>
    </section>
  );
}
