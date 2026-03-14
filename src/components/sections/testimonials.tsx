"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { TESTIMONIALS } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".testimonial-card",
        sectionRef.current
      );
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <SplitText
          as="h2"
          className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4rem)] font-bold uppercase mb-16 md:mb-24"
        >
          WHAT THEY SAY
        </SplitText>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl border border-white/15 bg-white/[0.1] p-8 md:p-10 flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              {/* Quote mark */}
              <div>
                <svg
                  className="w-8 h-8 text-accent/60 mb-6"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M6 18h4l-2 8h4l2-8V8H6v10zm14 0h4l-2 8h4l2-8V8H20v10z" />
                </svg>

                {/* Quote text */}
                <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-text/85 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Divider + attribution */}
              <div className="mt-8">
                <div className="h-px bg-white/15 mb-6" />
                <div className="flex items-center gap-3">
                  {/* Initials avatar */}
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <span className="font-[family-name:var(--font-body)] text-xs text-accent font-medium">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-text/90">
                      {t.name}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-xs text-text/40">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
