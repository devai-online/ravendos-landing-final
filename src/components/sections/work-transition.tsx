"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-setup";
import { AnimatedTetrahedron } from "@/components/canvas/animated-tetrahedron";

export function WorkTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current || !contentRef.current)
      return;

    const ctx = gsap.context(() => {
      // Card starts below the viewport
      gsap.set(cardRef.current!, { yPercent: 100 });
      gsap.set(contentRef.current!, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.65, 1],
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Phase 1: Card enters from bottom (0 → 0.5)
      tl.to(cardRef.current!, {
        yPercent: 0,
        duration: 0.5,
        ease: "none",
      });

      // Phase 2: Content reveals (0.5 → 0.65)
      tl.to(
        contentRef.current!,
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.5
      );

      // Phase 3: Hold — pin releases, card scrolls naturally (0.65 → 1.0)
      tl.to({}, { duration: 0.35 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-30 h-svh overflow-hidden">
      <div
        ref={cardRef}
        className="absolute inset-0 bg-white rounded-t-[2rem] flex items-center justify-center"
      >
        {/* Tetrahedron background — accent colored, subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-[50vmin] h-[50vmin]">
            <AnimatedTetrahedron color="accent" />
          </div>
        </div>

        {/* Subtle label + tagline */}
        <div ref={contentRef} className="relative text-center px-6">
          <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.3em] text-black/30 uppercase block mb-4">
            Our Work
          </span>
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em] text-[#1a1a1a]/60 max-w-lg mx-auto leading-snug">
            Products and platforms we&apos;ve built.
          </p>
        </div>
      </div>
    </section>
  );
}
