"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useIsDesktop } from "@/hooks/use-media-query";
import { NAV_LINKS } from "@/lib/constants";
import { useHashNav } from "@/hooks/use-hash-nav";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const isDesktop = useIsDesktop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDesktop && isMenuOpen) setIsMenuOpen(false);
  }, [isDesktop, isMenuOpen]);

  const handleHashClick = useHashNav();
  const isHidden = scrollDirection === "down" && isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ease-out ${
          isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center px-6 md:px-12 pointer-events-auto">
          {/* Desktop: centered nav links */}
          <div className="hidden flex-1 items-center justify-center gap-12 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashClick(link.href, e)}
                className="font-[family-name:var(--font-body)] text-[13px] uppercase tracking-[0.2em] text-text/60 transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop: Contact button, right side */}
          <Link
            href="/contact"
            className="group hidden items-center gap-3 rounded-full bg-text px-5 py-2.5 transition-all duration-300 hover:bg-text/85 lg:flex"
          >
            <span className="font-[family-name:var(--font-body)] text-[13px] tracking-wide text-bg">
              Contact us
            </span>
            <svg
              className="h-3.5 w-3.5 text-bg transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 8h14M9 2l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile hamburger — right aligned */}
          <div className="flex flex-1 justify-end lg:hidden">
            <button
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[2px] w-6 bg-text transition-transform" />
              <span className="block h-[2px] w-6 bg-text transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
