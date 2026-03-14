"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-setup";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  scrub?: number | boolean;
  triggerStart?: string;
  triggerEnd?: string;
  /** Pass a GSAP tween for horizontal scroll context */
  containerAnimation?: gsap.core.Tween;
}

export function ClipReveal({
  children,
  className = "",
  scrub = 1,
  triggerStart = "top bottom",
  triggerEnd = "30% bottom",
  containerAnimation,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { clipPath: "inset(30%)" },
        {
          clipPath: "inset(0%)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            end: triggerEnd,
            scrub,
            ...(containerAnimation ? { containerAnimation } : {}),
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ clipPath: "inset(30%)" }}>
      {children}
    </div>
  );
}
