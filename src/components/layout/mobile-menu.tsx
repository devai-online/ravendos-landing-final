"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-setup";
import { useLenis } from "@/lib/lenis-provider";
import { NAV_LINKS } from "@/lib/constants";
import { useHashNav } from "@/hooks/use-hash-nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const handleHashClick = useHashNav();

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      // Lock scroll
      lenis?.stop();
      document.body.style.overflow = "hidden";

      // Animate in
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      // Stagger links
      const links = linksRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    } else {
      // Animate out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
          // Unlock scroll
          lenis?.start();
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen, lenis]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-bg"
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center"
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Links */}
      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={(e) => {
              handleHashClick(link.href, e);
              onClose();
            }}
            className="font-[family-name:var(--font-heading)] text-[clamp(2rem,8vw,3.5rem)] font-bold uppercase text-text transition-colors hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
