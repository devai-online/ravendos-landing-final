"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-setup";

interface SvgLineProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  viewBox?: string;
  triggerStart?: string;
  triggerEnd?: string;
}

export function SvgLine({
  d,
  className = "",
  strokeWidth = 1,
  stroke = "#FFFFFF",
  viewBox = "0 0 1200 100",
  triggerStart = "top 90%",
  triggerEnd = "bottom 60%",
}: SvgLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!pathRef.current) return;

      const length = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: svgRef.current,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
