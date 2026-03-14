"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { SECTIONS, PRODUCTS, CLIENT_PROJECTS } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Button } from "@/components/ui/button";

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const els = sectionRef.current.querySelectorAll(".work-reveal");
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
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

  const product = PRODUCTS[0];
  const client = CLIENT_PROJECTS[0];

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.PRODUCTS}
      className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-32 lg:py-40"
    >
      {/* ── Our Products ── */}
      <div className="work-reveal mb-16 md:mb-24">
        <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/40 uppercase">
          Our Products
        </span>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[5vw] lg:items-center mb-32 md:mb-40 lg:mb-48">
        {/* Left: content */}
        <div className="flex-1 lg:max-w-[45%]">
          <div className="work-reveal mb-6">
            <Image
              src={product.logoDark}
              alt={`${product.name} logo`}
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12 rounded-lg"
            />
          </div>
          <SplitText
            as="h3"
            className="work-reveal font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase mb-4 leading-tight"
          >
            {product.name}
          </SplitText>
          <p className="work-reveal font-[family-name:var(--font-heading)] text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-text/50 mb-6 leading-snug">
            {product.tagline}
          </p>
          <p className="work-reveal font-[family-name:var(--font-body)] text-base md:text-lg text-text/60 mb-8 max-w-md">
            {product.body}
          </p>
          <div className="work-reveal">
            <Button href={product.href}>{product.buttonText}</Button>
          </div>
        </div>

        {/* Right: screenshot */}
        <div className="flex-1 w-full lg:max-w-[50%]">
          <ClipReveal>
            <div className="relative aspect-[16/10] w-full bg-text/5 rounded-lg overflow-hidden">
              <Image
                src={product.screenshot}
                alt={`${product.name} screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ClipReveal>
        </div>
      </div>

      {/* ── Client Work ── */}
      <div className="work-reveal mb-16 md:mb-24">
        <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/40 uppercase">
          Client Work
        </span>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[5vw] lg:items-center">
        {/* Left: content */}
        <div className="flex-1 lg:max-w-[50%]">
          <div className="work-reveal mb-6">
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              width={200}
              height={80}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <SplitText
            as="h3"
            className="work-reveal font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-bold uppercase mb-4 leading-tight"
          >
            {client.name}
          </SplitText>
          <p className="work-reveal font-[family-name:var(--font-heading)] text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-text/50 mb-6 leading-snug">
            {client.tagline}
          </p>
          <p className="work-reveal font-[family-name:var(--font-body)] text-base md:text-lg text-text/60 mb-8 max-w-md">
            {client.body}
          </p>
          <div className="work-reveal">
            <Button href={client.href}>{client.buttonText}</Button>
          </div>
        </div>

        {/* Right: screenshot */}
        <div className="flex-1 w-full lg:max-w-[50%]">
          <ClipReveal>
            <div className="relative aspect-[16/10] w-full bg-text/5 rounded-lg overflow-hidden">
              <Image
                src={client.screenshot}
                alt={`${client.name} screenshot`}
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
