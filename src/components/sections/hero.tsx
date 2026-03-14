"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { SECTIONS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

const AnimatedSphere = dynamic(
  () =>
    import("@/components/canvas/animated-sphere").then(
      (mod) => mod.AnimatedSphere
    ),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.4 },
          0.2
        );
      }

      if (taglineRef.current) {
        const lines = taglineRef.current.querySelectorAll(".tagline-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
          0.5
        );
      }

      // Scroll-driven exit (desktop only): heading shrinks, tagline/sphere fade
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          // Heading shrinks toward top-left as hero scrolls out
          const h1 = sectionRef.current!.querySelector("h1");
          if (h1) {
            gsap.to(h1, {
              scale: 0.35,
              opacity: 0,
              transformOrigin: "left top",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          // Tagline fades out faster
          if (taglineRef.current) {
            gsap.to(taglineRef.current, {
              opacity: 0,
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "70% top",
                scrub: true,
              },
            });
          }

          // Sphere fades
          const sphere = sectionRef.current!.querySelector(".hero-sphere");
          if (sphere) {
            gsap.to(sphere, {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "60% top",
                scrub: true,
              },
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.HERO}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* ASCII sphere — prominent, centered (smaller + dimmer on mobile) */}
      <div className="hero-sphere absolute inset-0 z-[1] flex items-center justify-center">
        <div className="h-[60vmin] w-[60vmin] md:h-[85vmin] md:w-[85vmin] max-h-[750px] max-w-[750px] opacity-15 md:opacity-30">
          <AnimatedSphere />
        </div>
      </div>

      {/* Tagline — right side, vertically centered (desktop) */}
      <div
        ref={taglineRef}
        className="absolute right-[5vw] top-[32%] z-10 hidden text-right lg:block"
      >
        <p className="tagline-line font-[family-name:var(--font-heading)] text-[clamp(1.2rem,2.4vw,2.4rem)] font-bold uppercase leading-tight text-text/70">
          Intelligence,
        </p>
        <p className="tagline-line font-[family-name:var(--font-heading)] text-[clamp(1.2rem,2.4vw,2.4rem)] font-bold uppercase leading-tight text-text/70">
          Architected.
        </p>
      </div>

      {/* Mobile tagline — above the name */}
      <div className="relative z-10 mb-6 px-6 lg:hidden">
        <p className="font-[family-name:var(--font-heading)] text-[clamp(1.1rem,5vw,1.8rem)] font-bold uppercase leading-tight text-text/60">
          Intelligence, Architected.
        </p>
      </div>

      {/* RAVENDOS — massive, bottom-left */}
      <div ref={nameRef} className="relative z-10 pb-[5vh] md:pb-[6vh] px-6 md:px-12">
        <h1 className="font-[family-name:var(--font-hero)] text-[clamp(3rem,11.5vw,14rem)] font-bold leading-[0.9] tracking-tight">
          RAVEN<span className="text-accent">DOS</span>
        </h1>
      </div>

      {/* Dividing line at bottom — like Tiwis */}
      <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 h-px bg-text/15" />
    </section>
  );
}
