"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { AnimatedTetrahedron } from "@/components/canvas/animated-tetrahedron";

export function WorkTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardRef.current || !headingRef.current)
        return;

      // Card starts below the viewport
      gsap.set(cardRef.current, { yPercent: 100 });
      gsap.set(headingRef.current, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.45, 1],
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Phase 1: Card enters from bottom (0 → 0.35)
      tl.to(cardRef.current, {
        yPercent: 0,
        duration: 0.35,
        ease: "none",
      });

      // Phase 2: Heading reveals (0.35 → 0.45)
      tl.to(
        headingRef.current,
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
        0.35
      );

      // Phase 3: Hold (0.45 → 0.60)
      tl.to({}, { duration: 0.15 });

      // Phase 4: Card exits up (0.60 → 1.0)
      tl.to(cardRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "none",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative z-30 h-svh overflow-hidden">
      <div
        ref={cardRef}
        className="absolute inset-0 bg-white rounded-t-[2rem] flex items-center justify-center"
      >
        {/* Tetrahedron background — accent colored, subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <div className="w-[70vmin] h-[70vmin]">
            <AnimatedTetrahedron color="accent" />
          </div>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="relative font-[family-name:var(--font-heading)] text-[clamp(3.5rem,12vw,12rem)] font-extrabold uppercase leading-[0.9] text-[#0A0A0A] text-center tracking-tight"
        >
          OUR
          <br />
          WORK
        </h2>
      </div>
    </section>
  );
}
