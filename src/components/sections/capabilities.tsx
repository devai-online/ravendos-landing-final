"use client";

import { useRef, useEffect, useState, Fragment } from "react";
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

/* ═══════════════════════════════════════════
   WIDGET CONTAINER — IntersectionObserver + auto-loop
   Only mounts children when card is in viewport.
   Remounts via key change to restart all CSS animations.
   ═══════════════════════════════════════════ */

function WidgetContainer({ duration, children }: { duration: number; children: (cycle: number) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const wasVisible = useRef(false);

  // IO: detect when card enters/leaves viewport
  // High threshold (0.7) so widget only starts when card is mostly visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.7 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once visible, stay mounted forever (no flickering on scroll).
  // Reset cycle on re-entry for a fresh animation.
  useEffect(() => {
    if (visible) {
      if (!mounted) setMounted(true);
      if (!wasVisible.current) setCycle((c) => c + 1);
    }
    wasVisible.current = visible;
  }, [visible, mounted]);

  // Auto-loop: after duration ms, increment cycle to remount children
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setCycle((c) => c + 1), duration);
    return () => clearTimeout(timer);
  }, [visible, cycle, duration]);

  return (
    <div ref={ref}>
      {mounted && <div key={cycle}>{children(cycle)}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ANIMATED CARD WIDGETS
   ═══════════════════════════════════════════ */

/* Shared: dark terminal window chrome (3 dots + title) */
function WidgetShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-[340px] h-[220px] bg-[#141414] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
        <span className="ml-auto font-mono text-[10px] text-white/25 tracking-wider">{title}</span>
      </div>
      {/* Content */}
      <div className="px-4 py-4 font-mono text-xs leading-relaxed flex-1">
        {children}
      </div>
    </div>
  );
}

/* ── Widget 1: AI/ML — Model Training Terminal ── */
type TrainLine = { prompt: string; text: string; delay: number; check?: boolean };

const TRAIN_SCRIPTS: TrainLine[][] = [
  [
    { prompt: "$ ", text: "python train.py --model=transformer", delay: 0 },
    { prompt: "> ", text: "Loading dataset...", delay: 1.6, check: true },
    { prompt: "> ", text: "Tokenizing corpus...", delay: 2.8, check: true },
    { prompt: "> ", text: "Training epoch 1/3...", delay: 4.0, check: true },
    { prompt: "> ", text: "Training epoch 2/3...", delay: 5.2, check: true },
    { prompt: "> ", text: "Evaluating accuracy...", delay: 6.4, check: true },
  ],
  [
    { prompt: "$ ", text: "python evaluate.py --checkpoint=v2", delay: 0 },
    { prompt: "> ", text: "Loading weights...", delay: 1.6, check: true },
    { prompt: "> ", text: "Running inference...", delay: 2.8, check: true },
    { prompt: "> ", text: "Computing metrics...", delay: 4.0, check: true },
    { prompt: "> ", text: "Accuracy: 94.7%", delay: 5.2, check: true },
    { prompt: "> ", text: "Exporting model...", delay: 6.4, check: true },
  ],
];

function AiMlWidget({ cycle }: { cycle: number }) {
  const lines = TRAIN_SCRIPTS[cycle % TRAIN_SCRIPTS.length];
  return (
    <WidgetShell title="training">
      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-1" style={{ animation: `widget-fade-in 0.4s ease both`, animationDelay: `${line.delay}s` }}>
          <span className="text-white/30 select-none">{line.prompt}</span>
          <span
            className="text-white/70 overflow-hidden whitespace-nowrap inline-block"
            style={{
              animation: `widget-type-line 1s steps(${line.text.length}, end) ${line.delay + 0.15}s both`,
            }}
          >
            {line.text}
          </span>
          {line.check && (
            <span
              className="text-[#27C93F] ml-auto shrink-0"
              style={{ animation: `widget-check-in 0.5s ease both`, animationDelay: `${line.delay + 1.2}s` }}
            >
              ✓
            </span>
          )}
        </div>
      ))}
      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF7C48] rounded-full"
            style={{ animation: `widget-bar-fill 8s ease-out 0.5s both` }}
          />
        </div>
        <span className="text-[10px] text-white/30" style={{ animation: `widget-fade-in 0.3s ease both`, animationDelay: `7.5s` }}>
          Done
        </span>
      </div>
    </WidgetShell>
  );
}

/* ── Widget 2: DevOps — Deployment Pipeline ── */
type PipelineScript = { cmd: string; stages: string[] };

const PIPELINE_SCRIPTS: PipelineScript[] = [
  { cmd: "deploy --env=production", stages: ["BUILD", "TEST", "STAGE", "DEPLOY"] },
  { cmd: "kubectl rollout --cluster=main", stages: ["PULL", "BUILD", "SCAN", "PUSH"] },
];

function DevOpsWidget({ cycle }: { cycle: number }) {
  const script = PIPELINE_SCRIPTS[cycle % PIPELINE_SCRIPTS.length];
  return (
    <WidgetShell title="pipeline">
      {/* Command line */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-white/30 select-none">$ </span>
        <span
          className="text-white/70 overflow-hidden whitespace-nowrap inline-block"
          style={{ animation: `widget-type-line 1.2s steps(${script.cmd.length}, end) 0.3s both` }}
        >
          {script.cmd}
        </span>
      </div>

      {/* Pipeline stages */}
      <div className="flex items-center gap-0 mb-4">
        {script.stages.map((stage, i) => (
          <Fragment key={stage}>
            <div
              className="flex flex-col items-center gap-1.5"
              style={{ animation: `widget-stage-in 0.6s ease both`, animationDelay: `${1.8 + i * 1.0}s` }}
            >
              <span className="text-[10px] tracking-wider text-white/50">
                {stage}
              </span>
              <div className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center">
                {i < 3 ? (
                  <span
                    className="text-[#27C93F] text-xs"
                    style={{ animation: `widget-check-in 0.4s ease both`, animationDelay: `${2.4 + i * 1.0}s` }}
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    className="w-2 h-2 rounded-full bg-[#FF7C48]"
                    style={{ animation: `widget-pulse-dot 1.5s ease-in-out infinite`, animationDelay: `${2.4 + i * 1.0}s` }}
                  />
                )}
              </div>
            </div>
            {i < script.stages.length - 1 && (
              <div className="flex-1 h-px bg-white/10 mx-1 mt-5" />
            )}
          </Fragment>
        ))}
      </div>

      {/* Status line */}
      <div className="flex items-center gap-1" style={{ animation: `widget-fade-in 0.4s ease both`, animationDelay: `5.5s` }}>
        <span className="text-white/30 select-none">&gt; </span>
        <span className="text-white/50">Deploying to prod...</span>
        <div className="ml-auto flex gap-[2px]">
          {[0, 1, 2, 3].map((j) => (
            <div
              key={j}
              className={`w-1.5 h-3 rounded-sm ${j < 2 ? "bg-[#FF7C48]" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

/* ── Widget 3: Security — Threat Monitor ── */
const SPARK_HEIGHTS = [3, 5, 8, 12, 6, 3, 7, 11, 16, 10, 6, 3, 5, 8, 14];
const THREAT_TARGETS = [2847, 4213, 1956];

function SecurityWidget({ cycle }: { cycle: number }) {
  const [count, setCount] = useState(0);
  const target = THREAT_TARGETS[cycle % THREAT_TARGETS.length];

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / 80);
    let animFrame: number;

    const tick = () => {
      current += step;
      if (current >= target) {
        current = target;
        setCount(target);
        return;
      }
      setCount(current);
      animFrame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      animFrame = requestAnimationFrame(tick);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrame);
    };
  }, [target]);

  return (
    <WidgetShell title="monitor">
      {/* Rows */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between" style={{ animation: `widget-fade-in 0.4s ease both`, animationDelay: `0.3s` }}>
          <span className="text-white/40">Firewall</span>
          <div className="flex items-center gap-2">
            <span className="text-[#27C93F] text-[11px]">Active</span>
            <span
              className="w-2 h-2 rounded-full bg-[#27C93F]"
              style={{ animation: `widget-pulse-dot 2s ease-in-out infinite` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between" style={{ animation: `widget-fade-in 0.4s ease both`, animationDelay: `0.7s` }}>
          <span className="text-white/40">Threats Blocked</span>
          <span className="text-[#FF7C48] tabular-nums font-medium">
            {count.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between" style={{ animation: `widget-fade-in 0.4s ease both`, animationDelay: `1.1s` }}>
          <span className="text-white/40">Encryption</span>
          <span className="text-white/70 text-[11px]">AES-256</span>
        </div>
      </div>

      {/* Sparkline */}
      <div
        className="flex items-end gap-[3px] h-5 mt-1"
        style={{ animation: `widget-fade-in 0.5s ease both`, animationDelay: `1.8s` }}
      >
        {SPARK_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[#FF7C48]/60 origin-bottom"
            style={{
              height: `${(h / 16) * 100}%`,
              animation: `widget-spark 3s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </WidgetShell>
  );
}

/* ── Widget 4: App Dev — Code Editor ── */
type CodeLine = { num: number; content: React.ReactNode; indent: number; delay: number };

const CODE_SCRIPTS: CodeLine[][] = [
  [
    {
      num: 1, indent: 0, delay: 0.3,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">div</span>
          <span className="text-white/40">{" "}</span>
          <span className="text-[#82AAFF]">className</span>
          <span className="text-white/40">={'"'}</span>
          <span className="text-[#C3E88D]">hero</span>
          <span className="text-white/40">{'">'}</span>
        </>
      ),
    },
    {
      num: 2, indent: 1, delay: 1.5,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">h1</span>
          <span className="text-white/40">{">"}</span>
          <span className="text-white/70">Your Brand</span>
          <span className="text-white/40">{"</"}</span>
          <span className="text-[#FF7C48]">h1</span>
          <span className="text-white/40">{">"}</span>
        </>
      ),
    },
    {
      num: 3, indent: 1, delay: 2.7,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">p</span>
          <span className="text-white/40">{">"}</span>
          <span className="text-white/70">Built for performance.</span>
          <span className="text-white/40">{"</"}</span>
          <span className="text-[#FF7C48]">p</span>
          <span className="text-white/40">{">"}</span>
        </>
      ),
    },
    {
      num: 4, indent: 1, delay: 3.9,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">Button</span>
          <span className="text-white/40">{" "}</span>
          <span className="text-[#82AAFF]">variant</span>
          <span className="text-white/40">={'"'}</span>
          <span className="text-[#C3E88D]">primary</span>
          <span className="text-white/40">{'"'}</span>
          <span className="text-white/40">{" />"}</span>
        </>
      ),
    },
    {
      num: 5, indent: 0, delay: 5.1,
      content: (
        <>
          <span className="text-white/40">{"</"}</span>
          <span className="text-[#FF7C48]">div</span>
          <span className="text-white/40">{">"}</span>
        </>
      ),
    },
  ],
  [
    {
      num: 1, indent: 0, delay: 0.3,
      content: (
        <>
          <span className="text-[#C792EA]">export</span>
          <span className="text-white/40">{" "}</span>
          <span className="text-[#C792EA]">function</span>
          <span className="text-white/40">{" "}</span>
          <span className="text-[#82AAFF]">Nav</span>
          <span className="text-white/40">{"() {"}</span>
        </>
      ),
    },
    {
      num: 2, indent: 1, delay: 1.5,
      content: (
        <>
          <span className="text-[#C792EA]">return</span>
          <span className="text-white/40">{" ("}</span>
        </>
      ),
    },
    {
      num: 3, indent: 2, delay: 2.7,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">nav</span>
          <span className="text-white/40">{" "}</span>
          <span className="text-[#82AAFF]">className</span>
          <span className="text-white/40">={'"'}</span>
          <span className="text-[#C3E88D]">fixed top-0</span>
          <span className="text-white/40">{'">'}</span>
        </>
      ),
    },
    {
      num: 4, indent: 3, delay: 3.9,
      content: (
        <>
          <span className="text-white/40">{"<"}</span>
          <span className="text-[#FF7C48]">Logo</span>
          <span className="text-white/40">{" />"}</span>
        </>
      ),
    },
    {
      num: 5, indent: 2, delay: 5.1,
      content: (
        <>
          <span className="text-white/40">{"</"}</span>
          <span className="text-[#FF7C48]">nav</span>
          <span className="text-white/40">{">"}</span>
        </>
      ),
    },
  ],
];

function AppDevWidget({ cycle }: { cycle: number }) {
  const lines = CODE_SCRIPTS[cycle % CODE_SCRIPTS.length];
  return (
    <WidgetShell title="editor.tsx">
      {lines.map((line) => (
        <div
          key={line.num}
          className="flex items-center gap-3"
          style={{ animation: `widget-fade-in 0.3s ease both`, animationDelay: `${line.delay}s` }}
        >
          <span className="text-white/20 w-4 text-right select-none text-[10px]">{line.num}</span>
          <div
            className="overflow-hidden whitespace-nowrap"
            style={{ paddingLeft: `${line.indent * 16}px` }}
          >
            <span
              className="inline-block overflow-hidden whitespace-nowrap"
              style={{
                animation: `widget-type-line 0.7s steps(20, end) ${line.delay + 0.1}s both`,
              }}
            >
              {line.content}
            </span>
          </div>
        </div>
      ))}
      {/* Saved indicator */}
      <div
        className="flex items-center gap-2 mt-2 justify-end"
        style={{ animation: `widget-fade-in 0.3s ease both`, animationDelay: `6s` }}
      >
        <span className="text-[#27C93F] text-[10px]">✓ Saved</span>
      </div>
    </WidgetShell>
  );
}

/* Cycle durations (ms) — how long before each widget restarts */
const WIDGET_DURATIONS = [9000, 8000, 7000, 8000];

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
          <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-4">
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
          <span className="font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] text-text/50 uppercase block mb-8">
            Our Capabilities
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3.5rem)] font-light text-text/70 max-w-[55vw] leading-snug tracking-[-0.01em]">
            We design, build, and ship intelligent platforms — end to end.
          </h2>
        </div>

        {/* ── White overlay — slides up at end of h-scroll (Tiwis Posture style) ── */}
        <div ref={overlayRef} className="absolute inset-0 bg-white z-20 flex items-center px-[10vw]" data-nav-theme="light">
          <div className="w-full max-w-7xl mx-auto">
            {/* Label */}
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase block mb-4">
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
                {/* Individual card — body at top, widget in middle, huge heading at bottom */}
                <div className="shrink-0 w-[50vw] h-full bg-white flex flex-col px-[4vw] py-[5vh] overflow-hidden" data-nav-theme="light">
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

                  {/* Middle: animated widget — only active when card is in viewport */}
                  <div className="flex-1 flex items-center py-6">
                    <WidgetContainer duration={WIDGET_DURATIONS[i]}>
                      {(cycle) =>
                        i === 0 ? <AiMlWidget cycle={cycle} /> :
                        i === 1 ? <DevOpsWidget cycle={cycle} /> :
                        i === 2 ? <SecurityWidget cycle={cycle} /> :
                        <AppDevWidget cycle={cycle} />
                      }
                    </WidgetContainer>
                  </div>

                  {/* Bottom: sub-label + huge display heading */}
                  <div>
                    <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-black/50 uppercase block mb-3">
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
                      0{i + 1} / 0{CAPABILITIES.length - 1}
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
