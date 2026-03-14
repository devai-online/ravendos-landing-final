"use client";

import { useRef } from "react";
import { gsap, SplitText as GSAPSplitText, useGSAP } from "@/lib/gsap-setup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  triggerStart?: string;
  triggerEnd?: string;
  /** Pass a GSAP tween for horizontal scroll context */
  containerAnimation?: gsap.core.Tween;
}

export function SplitText({
  children,
  as: Tag = "div",
  className = "",
  triggerStart = "top 85%",
  triggerEnd = "bottom 20%",
  containerAnimation,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const split = new GSAPSplitText(ref.current, {
        type: "lines",
        linesClass: "split-line-mask",
      });

      // Wrap each line's content in an inner div for the reveal
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.transform = "translateY(140%)";
        wrapper.style.opacity = "0";
        while (line.firstChild) {
          wrapper.appendChild(line.firstChild);
        }
        line.appendChild(wrapper);
      });

      const innerWrappers = split.lines.map(
        (line) => line.firstChild as HTMLElement
      );

      gsap.to(innerWrappers, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none none",
          ...(containerAnimation ? { containerAnimation } : {}),
        },
      });
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
