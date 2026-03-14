"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { useHashNav } from "@/hooks/use-hash-nav";

interface FooterProps {
  showCta?: boolean;
}

export function Footer({ showCta = true }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const handleHashClick = useHashNav();

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const els = gsap.utils.toArray<HTMLElement>(
        ".footer-reveal",
        footerRef.current
      );
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Logo slide-up (Tiwis-style: y 120% → 0%)
      const logo = footerRef.current.querySelector(".footer-logo");
      if (logo) {
        gsap.fromTo(
          logo,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: logo,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative flex min-h-svh flex-col pt-24 md:pt-28 px-6 md:px-12 lg:px-[10vw] pb-6"
    >
      {/* ── Top: CTA (right-aligned, Tiwis-style) ── */}
      {showCta ? (
        <div className="footer-reveal flex flex-1 items-center justify-end">
          <div className="text-right max-w-xl">
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold leading-snug">
              An idea, a project,
              <br />
              or simply need to challenge
              <br />
              the status quo?
            </h2>
            <div className="mt-10 flex justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 rounded-full bg-text px-8 py-4 md:px-10 md:py-5 transition-all duration-300 hover:bg-text/90 hover:gap-6"
              >
                <span className="font-[family-name:var(--font-body)] text-sm md:text-base tracking-wide text-bg">
                  Let&apos;s talk !
                </span>
                <svg
                  className="h-5 w-5 text-bg transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 8h14M9 2l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* ── Bottom: Logo + Links ── */}
      <div>
        {/* Description text */}
        <div className="footer-reveal mb-6">
          <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-text/60 leading-relaxed">
            Product-driven technology studio.
            <br />
            Intelligence, Architected.
          </p>
        </div>

        {/* Large logo + stacked links side by side */}
        <div className="footer-reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-8 md:mb-10">
          {/* Left: company logo — Tiwis-style slide-up reveal */}
          <div className="overflow-hidden lg:max-w-[60%]">
            <Image
              src="/images/logo-dark.png"
              alt="RavenDOS"
              width={730}
              height={120}
              className="footer-logo h-auto w-[80vw] md:w-[60vw] lg:w-[45vw]"
              priority
            />
          </div>

          {/* Right: stacked links */}
          <nav className="flex flex-col gap-2.5 lg:items-end lg:text-right shrink-0">
            <a
              href="mailto:hello@ravendos.com"
              className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:text-accent/70"
            >
              HELLO@RAVENDOS.COM
            </a>
            <a
              href="tel:+919000334021"
              className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/70 transition-colors duration-300 hover:text-text"
            >
              +91 9000334021
            </a>
            <div className="h-2" />
            <Link
              href="/#philosophy"
              onClick={(e) => handleHashClick("/#philosophy", e)}
              className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              About
            </Link>
            <Link
              href="/#products"
              onClick={(e) => handleHashClick("/#products", e)}
              className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Copyright + Company info */}
        <div className="border-t border-text/15 py-5 flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
          <p className="font-[family-name:var(--font-body)] text-xs text-text/40">
            &copy; {new Date().getFullYear()} RavenDOS Business Ventures LLP.
            All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-xs text-text/30">
            E/38, G2, 17-1-380, Santosh Nagar Main Road, Central Excise Colony, Saidabad, Hyderabad, Telangana 500059, India
          </p>
        </div>
      </div>
    </footer>
  );
}
