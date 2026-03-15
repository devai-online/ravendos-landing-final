"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({
  ease: "power4.out",
  duration: 1.2,
});

// Respect prefers-reduced-motion: make all GSAP animations instant
if (typeof window !== "undefined") {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  const apply = (matches: boolean) => {
    gsap.globalTimeline.timeScale(matches ? 1000 : 1);
  };
  apply(mql.matches);
  mql.addEventListener("change", (e) => apply(e.matches));
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
