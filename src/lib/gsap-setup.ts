"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({
  ease: "power3.out",
  duration: 1.2,
});

export { gsap, ScrollTrigger, SplitText, useGSAP };
