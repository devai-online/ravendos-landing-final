"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { SECTIONS, CLIENT_PROJECTS } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Button } from "@/components/ui/button";

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const els = sectionRef.current.querySelectorAll(".client-reveal");
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const project = CLIENT_PROJECTS[0];

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.CLIENTS}
      className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-32 lg:py-40"
    >
      {/* Section label */}
      <div className="client-reveal mb-16 md:mb-24">
        <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/40 uppercase">
          Client Work
        </span>
      </div>

      {/* Client project showcase */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[5vw] lg:items-center">
        {/* Left: content */}
        <div className="flex-1 lg:max-w-[50%]">
          <div className="client-reveal mb-6">
            <Image
              src={project.logo}
              alt={`${project.name} logo`}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>
          <SplitText
            as="h3"
            className="client-reveal font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-bold uppercase mb-4 leading-tight"
          >
            {project.name}
          </SplitText>
          <p className="client-reveal font-[family-name:var(--font-heading)] text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-text/50 mb-6 leading-snug">
            {project.tagline}
          </p>
          <p className="client-reveal font-[family-name:var(--font-body)] text-base md:text-lg text-text/60 mb-8 max-w-md">
            {project.body}
          </p>
          <div className="client-reveal">
            <Button href={project.href}>{project.buttonText}</Button>
          </div>
        </div>

        {/* Right: screenshot */}
        <div className="flex-1 w-full lg:max-w-[50%]">
          <ClipReveal>
            <div className="relative aspect-[16/10] w-full bg-text/5 rounded-lg overflow-hidden">
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
