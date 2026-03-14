"use client";

import { useRef, useEffect, Fragment } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-setup";
import { SECTIONS, CAPABILITIES } from "@/lib/constants";
import { useIsDesktop } from "@/hooks/use-media-query";
import { SplitText } from "@/components/ui/split-text";

/* ── Decorative SVG art (displayed between cards on dark bg) ── */
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
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (!isDesktop || !sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const vw = window.innerWidth;
      const scrollDistance = track.scrollWidth - vw;
      const totalDistance = window.innerHeight * 0.3 + scrollDistance;
      const scrollStart = 0.08;

      // ── Compute snap points (intro + each card center) ──
      const cards = gsap.utils.toArray<HTMLElement>(".cap-card", track);
      const snapPoints: number[] = [0, 0.06]; // start + intro visible
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const centerFraction = Math.max(0, Math.min(1, (cardCenter - vw / 2) / scrollDistance));
        snapPoints.push(scrollStart + centerFraction * (1 - scrollStart));
      });
      snapPoints.push(1);

      // ── Intro content starts hidden ──
      const introHeading = track.querySelector(".cap-intro-heading");
      const introBody = track.querySelector(".cap-intro-body");
      if (introHeading) gsap.set(introHeading, { opacity: 0, y: 40 });
      if (introBody) gsap.set(introBody, { opacity: 0, y: 30 });

      // ── Main timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // ── Phase 1: Intro reveals (0 → 0.06) ──
      if (introHeading) {
        tl.to(introHeading, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0);
      }
      if (introBody) {
        tl.to(introBody, { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.02);
      }

      // ── Phase 2: Horizontal scroll (0.08 → 1.0) ──
      tl.to(
        track,
        {
          x: () => -scrollDistance,
          ease: "none",
          duration: 1 - scrollStart,
        },
        scrollStart
      );

      // ── Phase 3: Per-card content reveals ──
      cards.forEach((card) => {
        const counter = card.querySelector(".cap-counter");
        const heading = card.querySelector(".cap-heading");
        const body = card.querySelector(".cap-body");

        // Calculate when this card's center reaches viewport center
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const enterProgress = Math.max(0, (cardCenter - vw) / scrollDistance);
        const revealTime = scrollStart + enterProgress * (1 - scrollStart);
        const dur = 0.06;

        if (counter) {
          tl.fromTo(counter, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: dur * 0.6 }, revealTime);
        }
        if (heading) {
          tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur }, revealTime + dur * 0.1);
        }
        if (body) {
          tl.fromTo(body, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: dur }, revealTime + dur * 0.3);
        }
      });

      // ── Art reveals ──
      const artEls = gsap.utils.toArray<HTMLElement>(".cap-gap-art", track);
      artEls.forEach((art) => {
        const artCenter = art.offsetLeft + art.offsetWidth / 2;
        const enterProgress = Math.max(0, (artCenter - vw) / scrollDistance);
        const revealTime = scrollStart + enterProgress * (1 - scrollStart);
        tl.fromTo(art, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.08 }, revealTime);
      });

      ScrollTrigger.sort();
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  /* ── Live canvas capture: project WebGL gradient into heading text ── */
  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;
    let cancelled = false;

    // Give the OGL canvas time to initialize (dynamic import)
    const initTimeout = setTimeout(() => {
      if (cancelled) return;

      const sourceCanvas = document.querySelector(
        ".gradient-canvas"
      ) as HTMLCanvasElement | null;
      if (!sourceCanvas) return;

      const headings = sectionRef.current?.querySelectorAll(
        ".cap-heading"
      ) as NodeListOf<HTMLElement> | undefined;
      if (!headings?.length) return;

      // Small offscreen canvas — low-res is fine for text background
      const offscreen = document.createElement("canvas");
      const OW = 320;
      const OH = 180;
      offscreen.width = OW;
      offscreen.height = OH;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;

      let lastCapture = 0;
      let currentUrl = "";
      let appliedUrl = "";
      const CAPTURE_MS = 150; // ~6 fps texture update

      function loop(ts: number) {
        if (cancelled) return;
        animId = requestAnimationFrame(loop);

        // Capture texture at a lower frequency
        if (ts - lastCapture > CAPTURE_MS) {
          lastCapture = ts;
          try {
            ctx!.drawImage(sourceCanvas!, 0, 0, OW, OH);
            currentUrl = offscreen.toDataURL("image/jpeg", 0.35);
          } catch {
            // WebGL canvas unavailable — skip
            return;
          }
        }

        if (!currentUrl) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        headings!.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Skip off-screen headings
          if (rect.right < 0 || rect.left > vw) return;

          // Only swap the image src when a new capture is available
          if (currentUrl !== appliedUrl) {
            el.style.backgroundImage = `url(${currentUrl})`;
            appliedUrl = currentUrl;
          }

          // Reposition every frame so the gradient tracks the viewport
          el.style.backgroundSize = `${vw}px ${vh}px`;
          el.style.backgroundPosition = `${-rect.left}px ${-rect.top}px`;
        });
      }

      animId = requestAnimationFrame(loop);
    }, 600);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
      if (animId) cancelAnimationFrame(animId);
    };
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

      {/* Desktop: pinned horizontal scroll with separate cards — hidden below lg */}
      <div className="hidden lg:block h-svh w-full overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center">
          {/* Intro: "What We Do" on dark bg (white text) — takes one viewport width */}
          <div className="shrink-0 w-screen h-full flex items-center px-[10vw]">
            <div>
              <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/40 uppercase block mb-8">
                Our Capabilities
              </span>
              <h2
                className="cap-intro-heading font-[family-name:var(--font-heading)] text-[clamp(3rem,5vw,6rem)] font-bold uppercase mb-6 leading-tight"
              >
                WHAT WE DO
              </h2>
              <p
                className="cap-intro-body font-[family-name:var(--font-body)] text-lg md:text-xl text-text/50 max-w-lg"
              >
                We design, build, and ship intelligent platforms — end to end.
              </p>
            </div>
            {/* Accent arrow */}
            <div className="absolute bottom-[12%] right-[10vw]">
              <svg className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          {/* Capability cards + art gaps */}
          {CAPABILITIES.map((cap, i) => (
            <Fragment key={i}>
              {/* Individual card */}
              <div
                className="cap-card shrink-0 w-[52vw] h-[82vh] bg-white rounded-2xl flex items-center px-[4vw] relative"
                style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3)" }}
              >
                <div className="max-w-[85%]">
                  <span className="cap-counter font-[family-name:var(--font-body)] text-sm text-black/35 mb-5 block">
                    0{i + 1} / 0{CAPABILITIES.length}
                  </span>
                  <h3 className="cap-heading font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,3.5rem)] font-bold uppercase mb-5 leading-tight text-gradient-cutout">
                    {cap.heading}
                  </h3>
                  <p className="cap-body font-[family-name:var(--font-body)] text-base md:text-lg text-black/55 max-w-md">
                    {cap.body}
                  </p>
                </div>
              </div>

              {/* Art gap between cards (not after last card) */}
              {i < CAPABILITIES.length - 1 && (
                <div className="cap-gap-art shrink-0 w-[20vw] h-full flex items-center justify-center text-white/50">
                  <div className="w-[14vw] h-[14vw]">
                    {SLIDE_ART[i]}
                  </div>
                </div>
              )}
            </Fragment>
          ))}

          {/* Trailing space so last card can sit comfortably */}
          <div className="shrink-0 w-[8vw]" />
        </div>
      </div>
    </section>
  );
}
