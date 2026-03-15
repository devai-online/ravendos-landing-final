"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useIsDesktop } from "@/hooks/use-media-query";
import { NAV_LINKS } from "@/lib/constants";
import { useHashNav } from "@/hooks/use-hash-nav";
import { useLenis } from "@/lib/lenis-provider";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const isDesktop = useIsDesktop();
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);

  // Detect scroll position + whether navbar overlaps a white section
  useEffect(() => {
    const check = () => {
      setIsScrolled(window.scrollY > 50);

      const navBottom = 60; // check within top 60px
      const centerX = window.innerWidth / 2; // sample at viewport center
      const lightEls = document.querySelectorAll('[data-nav-theme="light"]');
      let overLight = false;

      lightEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          rect.top < navBottom &&
          rect.bottom > 0 &&
          rect.left <= centerX &&
          rect.right >= centerX
        ) {
          overLight = true;
        }
      });

      setIsOverLight(overLight);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (isDesktop && isMenuOpen) setIsMenuOpen(false);
  }, [isDesktop, isMenuOpen]);

  const handleHashClick = useHashNav();
  const isHidden = scrollDirection === "down" && isScrolled;

  // Logo click → scroll to top on homepage, navigate to / on other pages
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/");
      } else if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [lenis, pathname, router]
  );

  // All nav elements switch based on isOverLight
  const logoSrc = isOverLight ? "/images/logo-light.png" : "/images/logo-dark.png";
  const linkColor = isOverLight
    ? "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
    : "text-white/70 hover:text-white";
  const pillBg = isOverLight
    ? "bg-black/8 hover:bg-black/12"
    : "bg-white/10 hover:bg-white/20";
  const pillText = isOverLight ? "text-[#1a1a1a]" : "text-white";
  const hamburgerBg = isOverLight ? "bg-[#1a1a1a]" : "bg-white";

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ease-out ${
          isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12 pointer-events-auto">
          {/* Left: Logo → scroll to top */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="shrink-0"
          >
            <Image
              src={logoSrc}
              alt="RavenDOS"
              width={120}
              height={20}
              className="h-4 w-auto opacity-90 transition-opacity hover:opacity-100"
              priority
            />
          </a>

          {/* Center: nav links (desktop) */}
          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === "/" && link.href.startsWith("/#");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleHashClick(link.href, e)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative font-[family-name:var(--font-body)] text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 ${linkColor}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* Right: Contact button (desktop) */}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`group hidden items-center gap-3 rounded-full backdrop-blur-[30px] px-5 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] lg:flex ${pillBg}`}
          >
            <span className={`font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-wide transition-colors duration-300 ${pillText}`}>
              Contact us
            </span>
            <svg
              className={`h-3.5 w-3.5 transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0.5 ${pillText}`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 8h14M9 2l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className={`block h-[2px] w-6 transition-all duration-300 ${hamburgerBg}`} />
              <span className={`block h-[2px] w-6 transition-all duration-300 ${hamburgerBg}`} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
