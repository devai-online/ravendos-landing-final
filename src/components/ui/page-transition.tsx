"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";

interface TransitionContextType {
  trigger: (onMidpoint: () => void) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const trigger = useCallback(
    (onMidpoint: () => void): Promise<void> => {
      if (busyRef.current || !panelRef.current) return Promise.resolve();
      busyRef.current = true;

      return new Promise((resolve) => {
        const panel = panelRef.current!;
        const tl = gsap.timeline({
          onComplete: () => {
            busyRef.current = false;
            resolve();
          },
        });

        // Enter from right → covers screen
        tl.set(panel, { xPercent: 100, display: "block" });
        tl.to(panel, {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.inOut",
        });

        // Midpoint — execute callback (instant scroll)
        tl.call(onMidpoint);
        tl.to({}, { duration: 0.1 }); // brief pause while covered

        // Exit to left → reveals target section
        tl.to(panel, {
          xPercent: -100,
          duration: 0.5,
          ease: "power4.inOut",
        });

        // Reset for next use
        tl.set(panel, { display: "none", xPercent: 100 });
      });
    },
    []
  );

  return (
    <TransitionContext.Provider value={{ trigger }}>
      {children}
      {/* Horizontal wipe overlay */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-[90] hidden bg-bg"
        style={{ transform: "translateX(100%)" }}
        aria-hidden="true"
      >
        {/* Accent leading edge */}
        <div
          ref={accentRef}
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
        />
      </div>
    </TransitionContext.Provider>
  );
}
