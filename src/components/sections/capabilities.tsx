"use client";

import { useRef, useEffect, Fragment } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { SECTIONS, CAPABILITIES } from "@/lib/constants";
import { useIsDesktop } from "@/hooks/use-media-query";
import { SplitText } from "@/components/ui/split-text";

/* ── Card sub-labels (small text above huge heading) ── */
const CARD_LABELS = [
  "INTELLIGENT SYSTEMS",
  "CLOUD & AUTOMATION",
  "DEFENSE & ARCHITECTURE",
  "WEB & MOBILE",
];

/* ── Short display headings for cards (Tiwis style: punchy, fits at massive sizes) ── */
const CARD_HEADINGS = [
  "AI/ML",
  "DevOps",
  "Security",
  "App Dev",
];

/* ── Decorative SVG art (displayed in gaps between cards on dark bg) ── */
const SLIDE_ART: React.ReactNode[] = [
  // 0: Circle grid — slow rotation + staggered breathing
  <svg key="art-0" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" className="art-spin">
    {Array.from({ length: 25 }, (_, idx) => {
      const row = Math.floor(idx / 5);
      const col = idx % 5;
      const r = (row + col) % 3 === 0 ? 16 : (row + col) % 3 === 1 ? 10 : 6;
      return (
        <circle
          key={idx}
          cx={col * 80 + 40}
          cy={row * 80 + 40}
          r={r}
          className="art-breathe"
          style={{ animationDelay: `${(row + col) * 0.25}s` }}
        />
      );
    })}
  </svg>,

  // 1: Neural network — flowing data connections + pulsing nodes
  <svg key="art-1" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
    {/* Connections — animated dash flow (rendered first, behind nodes) */}
    {[120, 200, 280].flatMap((y1, i) =>
      [90, 160, 240, 310].map((y2, j) => (
        <line
          key={`c12-${i}-${j}`}
          x1={72} y1={y1} x2={188} y2={y2}
          strokeOpacity={0.5}
          className="art-dash"
          style={{ animationDelay: `${(i + j) * 0.15}s` }}
        />
      ))
    )}
    {[90, 160, 240, 310].flatMap((y1, i) =>
      [120, 200, 280].map((y2, j) => (
        <line
          key={`c23-${i}-${j}`}
          x1={212} y1={y1} x2={328} y2={y2}
          strokeOpacity={0.5}
          className="art-dash"
          style={{ animationDelay: `${(i + j) * 0.15 + 0.8}s` }}
        />
      ))
    )}
    {/* Nodes — pulsing */}
    {[120, 200, 280].map((y, i) => (
      <circle key={`l1-${i}`} cx={60} cy={y} r={12}
        className="art-breathe" style={{ animationDelay: `${i * 0.4}s` }} />
    ))}
    {[90, 160, 240, 310].map((y, i) => (
      <circle key={`l2-${i}`} cx={200} cy={y} r={12}
        className="art-breathe" style={{ animationDelay: `${i * 0.4 + 0.5}s` }} />
    ))}
    {[120, 200, 280].map((y, i) => (
      <circle key={`l3-${i}`} cx={340} cy={y} r={12}
        className="art-breathe" style={{ animationDelay: `${i * 0.4 + 1}s` }} />
    ))}
  </svg>,

  // 2: Interlocking hexagons — reverse rotation + stroke drawing
  <svg key="art-2" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" className="art-spin-reverse">
    {[
      { cx: 200, cy: 160 },
      { cx: 140, cy: 260 },
      { cx: 260, cy: 260 },
    ].map(({ cx, cy }, i) => {
      const r = 70;
      const pts = Array.from({ length: 6 }, (_, k) => {
        const angle = (Math.PI / 3) * k - Math.PI / 6;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      return (
        <polygon key={`hex-${i}`} points={pts}
          className="art-draw" style={{ animationDelay: `${i * 0.8}s` }} />
      );
    })}
    <circle cx={200} cy={227} r={4} fill="currentColor" fillOpacity={0.4}
      className="art-breathe" />
  </svg>,
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !wrapperRef.current || !trackRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current!;
      const track = trackRef.current!;
      const intro = introRef.current;
      const overlay = overlayRef.current!;
      const vw = window.innerWidth;
      const scrollDistance = track.scrollWidth - vw;

      // Phase durations in scroll pixels
      const scaleScroll = window.innerHeight * 1.2;
      const overlayScroll = window.innerHeight * 0.8;
      const totalDistance = scaleScroll + scrollDistance + overlayScroll;
      const scaleFraction = scaleScroll / totalDistance;
      const scrollFraction = scrollDistance / totalDistance;
      const overlayFraction = overlayScroll / totalDistance;

      // Wrapper starts invisible (scale 0), anchored at bottom-right
      gsap.set(wrapper, { scale: 0 });
      // Overlay starts below viewport
      gsap.set(overlay, { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalDistance}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Scale wrapper from 0 → 1 (bottom-right origin)
      tl.to(wrapper, {
        scale: 1,
        duration: scaleFraction,
        ease: "none",
      }, 0);

      // Fade out intro text during the last 40% of scale-up
      if (intro) {
        tl.to(intro, {
          opacity: 0,
          duration: scaleFraction * 0.4,
          ease: "power2.in",
        }, scaleFraction * 0.6);
      }

      // Phase 2: Horizontal scroll (after scale completes)
      tl.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        duration: scrollFraction,
      }, scaleFraction);

      // Phase 3: White overlay slides up from bottom (after h-scroll completes)
      tl.to(overlay, {
        yPercent: 0,
        ease: "none",
        duration: overlayFraction,
      }, scaleFraction + scrollFraction);

      ScrollTrigger.sort();
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} id={SECTIONS.CAPABILITIES} className="relative z-20">
      {/* Mobile: vertical stack — hidden on lg+ */}
      <div className="lg:hidden px-6 py-20 md:py-32">
        <div className="mb-10 md:mb-16">
          <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/40 uppercase block mb-4">
            Our Capabilities
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,8vw,3.5rem)] font-bold uppercase leading-tight">
            WHAT WE DO
          </h2>
        </div>
        <div>
          {CAPABILITIES.map((cap, i) => (
            <div key={i} className="border-t border-text/10 py-8 md:py-10">
              <span className="font-[family-name:var(--font-body)] text-xs text-accent tracking-wider mb-4 block">
                0{i + 1}
              </span>
              <SplitText
                as="h3"
                className="font-[family-name:var(--font-heading)] text-[clamp(1.3rem,6vw,2.2rem)] font-bold uppercase mb-3 leading-tight"
              >
                {cap.heading}
              </SplitText>
              <SplitText
                as="p"
                className="font-[family-name:var(--font-body)] text-sm text-text/50 max-w-sm leading-relaxed"
              >
                {cap.body}
              </SplitText>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Tiwis Offers pattern — hidden below lg */}
      <div className="hidden lg:block h-svh w-full relative">
        {/* ── Static intro text — behind card wrapper, fades out during scale-up ── */}
        <div ref={introRef} className="absolute inset-0 flex flex-col justify-center px-[10vw] z-0">
          <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/40 uppercase block mb-8">
            Our Capabilities
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3.5rem)] font-light text-text/70 max-w-[55vw] leading-snug tracking-[-0.01em]">
            We design, build, and ship intelligent platforms — end to end.
          </h2>
        </div>

        {/* ── White overlay — slides up at end of h-scroll (Tiwis Posture style) ── */}
        <div ref={overlayRef} className="absolute inset-0 bg-white z-20 flex items-center px-[10vw]">
          <div className="w-full max-w-7xl mx-auto">
            {/* Label */}
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/40 uppercase block mb-4">
              Our Work
            </span>

            {/* Structural line */}
            <div className="h-px bg-black/20 mb-8 w-full" />

            {/* Large heading — Tiwis Posture style */}
            <h2 className="text-gradient-fade font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-medium uppercase leading-[1] tracking-[-0.03em] max-w-[70vw] mb-6">
              Products &amp; platforms we&apos;ve built.
            </h2>

            {/* Body text with gradient */}
            <p className="text-gradient-fade font-[family-name:var(--font-body)] text-[clamp(1rem,1.8vw,1.5rem)] max-w-2xl leading-relaxed">
              From concept to scale — intelligent systems designed for real-world impact.
            </p>
          </div>
        </div>

        {/* ── Card wrapper — scales from bottom-right (transform-origin: 100% 100%) ── */}
        <div
          ref={wrapperRef}
          className="absolute inset-0 overflow-hidden z-10"
          style={{ transformOrigin: "100% 100%" }}
        >
          <div ref={trackRef} className="flex h-full">
            {/* Transparent spacer — lets intro text show through at scale 1 */}
            <div className="shrink-0 w-[50vw] h-full" />

            {/* Capability cards + art gaps */}
            {CAPABILITIES.map((cap, i) => (
              <Fragment key={i}>
                {/* Individual card — body at top, huge heading at bottom, overflow clipped */}
                <div className="shrink-0 w-[50vw] h-full bg-white flex flex-col justify-between px-[4vw] py-[5vh] overflow-hidden">
                  {/* Top: body text + accent arrow */}
                  <div className="flex justify-between items-start gap-8">
                    <p className="font-[family-name:var(--font-body)] text-base lg:text-lg text-black/55 max-w-[65%] leading-relaxed pt-2">
                      {cap.body}
                    </p>
                    <svg
                      className="h-5 w-5 text-accent shrink-0 mt-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>

                  {/* Bottom: sub-label + huge display heading */}
                  <div>
                    <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/30 uppercase block mb-3">
                      {CARD_LABELS[i]}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,9rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[#1a1a1a]">
                      {CARD_HEADINGS[i]}
                    </h3>
                  </div>
                </div>

                {/* Art gap between cards (not after last card) */}
                {i < CAPABILITIES.length - 1 && (
                  <div className="shrink-0 w-[30vw] h-full flex flex-col items-center justify-center">
                    <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.3em] text-accent/40 uppercase mb-8">
                      0{i + 1} / 0{CAPABILITIES.length}
                    </span>
                    <div className="w-[14vw] h-[14vw] text-accent/50">
                      {SLIDE_ART[i]}
                    </div>
                  </div>
                )}
              </Fragment>
            ))}

            {/* Trailing dark area — "Our Work" label visible after last card (like Tiwis "OFFER") */}
            <div className="shrink-0 w-[55vw] h-full flex flex-col items-center justify-center">
              <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.3em] text-white/60 uppercase">
                Our Work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
