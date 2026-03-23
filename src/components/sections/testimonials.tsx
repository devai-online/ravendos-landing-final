"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";
import { TESTIMONIALS, SECTIONS, PRODUCTS } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";
import { ClipReveal } from "@/components/ui/clip-reveal";

const LOGOS = [
  { src: "/images/clients/aa-designer-studio.png", alt: "AA Designer Studio", width: 140, height: 48 },
  { src: "/images/clients/aarambh.png", alt: "Aarambh", width: 56, height: 56 },
  { src: "/images/clients/kwikit.png", alt: "Kwikit", width: 120, height: 40 },
  { src: "/images/clients/webrocket.png", alt: "WebRocket", width: 120, height: 36 },
  { src: "/images/clients/diagnosticwale-logo.png", alt: "DiagnosticWale", width: 100, height: 48 },
];

/* ── 4-column approach values (Tiwis Posture pattern) ── */
const APPROACH_VALUES = [
  {
    title: "Product Centric",
    body: "We build what we believe the world needs — then we prove it works at scale.",
  },
  {
    title: "Intelligence First",
    body: "Every system we architect starts with intelligence at its core, not as an afterthought.",
  },
  {
    title: "End-to-End Ownership",
    body: "From concept to deployment, we own the entire stack. No handoffs, no gaps.",
  },
  {
    title: "Transparent & Direct",
    body: "No detours, no ambiguity. Clear communication, honest delivery, always.",
  },
];

/* ── Decorative SVG icons (Tiwis Posture style — geometric, accent colored) ── */
function IconQuadrant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 58" fill="none" className={className}>
      <circle cx="29" cy="29" r="28" stroke="currentColor" strokeWidth="1" />
      <line x1="29" y1="1" x2="29" y2="57" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="29" x2="57" y2="29" stroke="currentColor" strokeWidth="1" />
      <circle cx="29" cy="29" r="8" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function IconPinwheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 58" fill="none" className={className}>
      <rect x="1" y="1" width="56" height="56" rx="2" stroke="currentColor" strokeWidth="1" />
      <path d="M29 1C29 16 16 29 1 29" stroke="currentColor" strokeWidth="1" />
      <path d="M57 29C42 29 29 16 29 1" stroke="currentColor" strokeWidth="1" />
      <path d="M29 57C29 42 42 29 57 29" stroke="currentColor" strokeWidth="1" />
      <path d="M1 29C16 29 29 42 29 57" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 58" fill="none" className={className}>
      <circle cx="29" cy="15" r="13" stroke="currentColor" strokeWidth="1" />
      <circle cx="29" cy="43" r="13" stroke="currentColor" strokeWidth="1" />
      <circle cx="15" cy="29" r="13" stroke="currentColor" strokeWidth="1" />
      <circle cx="43" cy="29" r="13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 58" fill="none" className={className}>
      <circle cx="29" cy="29" r="28" stroke="currentColor" strokeWidth="1" />
      <path d="M29 1C29 16 42 29 57 29" stroke="currentColor" strokeWidth="1" />
      <path d="M29 57C29 42 16 29 1 29" stroke="currentColor" strokeWidth="1" />
      <path d="M1 29C16 29 29 16 29 1" stroke="currentColor" strokeWidth="1" />
      <path d="M57 29C42 29 29 42 29 57" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  // Defer GSAP setup to avoid blocking main thread during initial page load.
  // This section is below the fold, so animations init when browser is idle.
  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: gsap.Context | undefined;
    const idleId =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(initAnimations, { timeout: 3000 })
        : (setTimeout(initAnimations, 100) as unknown as number);

    function initAnimations() {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        // Reveal animations for content
        const els = gsap.utils.toArray<HTMLElement>(
          ".posture-reveal",
          sectionRef.current!
        );
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
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Decorative line draw animations
        const lines = gsap.utils.toArray<HTMLElement>(
          ".posture-line",
          sectionRef.current!
        );
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: line,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // SVG icon reveals (scale + rotate)
        const icons = gsap.utils.toArray<HTMLElement>(
          ".posture-icon",
          sectionRef.current!
        );
        icons.forEach((icon) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0.6, rotation: -15 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: icon,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, sectionRef);
    }

    return () => {
      if (typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      ctx?.revert();
    };
  }, []);

  const product = PRODUCTS[0];

  return (
    <section
      ref={sectionRef}
      id={SECTIONS.PRODUCTS}
      className="bg-white relative z-30 overflow-hidden"
      data-nav-theme="light"
    >
      {/* ═══════════════════════════════════════════
          APPROACH VALUES — 4-column grid (Tiwis Posture pattern)
          ═══════════════════════════════════════════ */}
      <div className="px-6 md:px-12 lg:px-[10vw] pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl relative">
          {/* Section label + icon on same row */}
          <div className="posture-reveal flex items-center justify-between mb-4">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase">
              Our Approach
            </span>
            <div className="posture-icon w-12 h-12 text-[#FF7C48]/60 hidden lg:block">
              <IconQuadrant />
            </div>
          </div>

          {/* Structural line */}
          <div className="posture-line h-px bg-black/20 origin-left mb-8 md:mb-10" />

          {/* Large gradient heading */}
          <div className="posture-reveal mb-12 md:mb-16">
            <h2 className="text-gradient-fade font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,5rem)] font-medium uppercase leading-[1] tracking-[-0.03em]">
              Built on conviction, delivered with precision.
            </h2>
          </div>

          {/* 4-column values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {APPROACH_VALUES.map((val, i) => {
              const icons = [<IconQuadrant key="q" />, <IconPinwheel key="p" />, <IconFlower key="f" />, <IconCross key="c" />];
              return (
                <div
                  key={i}
                  className={`posture-reveal py-6 md:py-0 ${
                    i > 0 ? "border-t border-black/15 md:border-t-0 lg:border-l lg:border-black/15" : ""
                  } ${i === 1 ? "md:border-l md:border-black/15" : ""} ${i === 2 ? "md:border-t md:border-black/15 lg:border-t-0" : ""} ${i === 3 ? "md:border-l md:border-t md:border-black/15 lg:border-t-0" : ""} lg:px-6 lg:first:pl-0 lg:last:pr-0`}
                >
                  <div className="md:px-4 lg:px-0 md:py-6 lg:py-0">
                    {/* Geometric icon */}
                    <div className="posture-icon w-12 h-12 text-[#FF7C48]/60 mb-5">
                      {icons[i]}
                    </div>
                    {/* Value title */}
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wide text-[#1a1a1a] mb-2">
                      {val.title}
                    </h3>
                    {/* Value description */}
                    <p className="font-[family-name:var(--font-body)] text-sm text-black/50 leading-relaxed">
                      {val.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          OUR PRODUCTS
          ═══════════════════════════════════════════ */}
      <div className="px-6 md:px-12 lg:px-[10vw] pt-0 pb-8">
        <div className="mx-auto max-w-7xl relative">
          {/* Structural line */}
          <div className="posture-line h-px bg-black/20 origin-left mb-8 md:mb-10" />

          {/* Our Products label */}
          <div className="posture-reveal mb-8 md:mb-12">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase">
              Our Products
            </span>
          </div>

          {/* IntiGrade */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-[5vw] lg:items-center">
            {/* Left: content */}
            <div className="flex-1 lg:max-w-[45%]">
              <div className="posture-reveal mb-6">
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
                className="posture-reveal font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-medium uppercase mb-4 leading-tight tracking-[-0.02em] text-[#1a1a1a]"
              >
                {product.name}
              </SplitText>
              <p className="posture-reveal font-[family-name:var(--font-body)] text-[clamp(1rem,2.5vw,1.35rem)] text-black/45 mb-6 leading-snug">
                {product.tagline}
              </p>
              <p className="posture-reveal font-[family-name:var(--font-body)] text-base md:text-lg text-black/55 mb-8 max-w-md">
                {product.body}
              </p>
              <div className="posture-reveal">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-black/5 px-6 py-3 font-[family-name:var(--font-body)] text-sm tracking-wide text-[#1a1a1a] transition-colors hover:bg-black/10"
                >
                  {product.buttonText}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 8h14M9 2l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: screenshot */}
            <div className="flex-1 w-full lg:max-w-[50%]">
              <ClipReveal>
                <div className="relative aspect-[16/10] w-full bg-black/5 rounded-lg overflow-hidden">
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
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — 3-column grid
          ═══════════════════════════════════════════ */}
      <div
        id={SECTIONS.TESTIMONIALS}
        className="px-6 md:px-12 lg:px-[10vw] py-14 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Label row */}
          <div className="posture-reveal flex items-center justify-between mb-4">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase">
              Testimonials
            </span>
            <div className="posture-icon w-10 h-10 text-[#FF7C48]/50 hidden lg:block">
              <IconPinwheel />
            </div>
          </div>

          {/* Structural line */}
          <div className="posture-line h-px bg-black/20 origin-left mb-10 md:mb-12" />

          {/* 3-column testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`posture-reveal flex flex-col justify-between ${
                  i > 0 ? "border-t border-black/15 md:border-t-0 md:border-l md:border-black/15" : ""
                } py-8 md:py-0 md:px-6 md:first:pl-0 md:last:pr-0`}
              >
                <div className="md:py-2">
                  {/* Large opening quote mark */}
                  <span className="font-[family-name:var(--font-display)] text-4xl text-[#FF7C48]/40 leading-none block mb-3">
                    &ldquo;
                  </span>
                  {/* Quote */}
                  <p className="font-[family-name:var(--font-body)] text-sm md:text-[0.935rem] text-black/60 leading-relaxed mb-8">
                    {t.quote}
                  </p>
                </div>
                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF7C48]/12 flex items-center justify-center shrink-0">
                    <span className="font-[family-name:var(--font-body)] text-[10px] text-[#FF7C48] font-medium">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-xs font-bold text-[#1a1a1a]">
                      {t.name}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-[11px] text-black/50">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CLIENT LOGOS
          ═══════════════════════════════════════════ */}
      <div className="px-6 md:px-12 lg:px-[10vw] pb-16 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl relative">
          {/* Animated structural line — top */}
          <div className="posture-line h-px bg-black/20 origin-left mb-12" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="posture-reveal flex items-center gap-6">
              <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase">
                Our Clients
              </span>
              {/* Decorative icon inline with label */}
              <div className="posture-icon w-10 h-10 text-[#FF7C48]/50 hidden md:block">
                <IconCross />
              </div>
            </div>
            <div className="posture-reveal flex flex-wrap items-center gap-10 md:gap-14 lg:gap-16">
              {LOGOS.map((logo, i) => (
                <div key={i} className="shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-10 md:h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    sizes="(max-width: 640px) 80px, 120px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
