"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap-setup";
import { ContactForm } from "@/components/ui/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function ContactPageContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for all sections
      const els = contentRef.current!.querySelectorAll(".contact-reveal");
      gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Logo slide-up (Tiwis-style)
      const logo = contentRef.current!.querySelector(".contact-logo");
      if (logo) {
        gsap.fromTo(
          logo,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.5,
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      id="main-content"
      ref={contentRef}
      className="relative z-[1] flex min-h-svh flex-col lg:h-svh lg:overflow-hidden"
    >
      {/* Breadcrumbs + h1 */}
      <div className="px-6 md:px-12 lg:px-[10vw] pt-24 md:pt-28">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />
        <h1 className="sr-only">Contact RavenDOS — Software Development Studio in Hyderabad</h1>
      </div>

      {/* Form section */}
      <section className="px-6 md:px-12 lg:px-[10vw] pt-4 lg:pt-[4vh]">
        <div className="contact-reveal">
          <ContactForm />
        </div>
      </section>

      {/* Spacer — pushes bottom section down */}
      <div className="flex-1 min-h-8" />

      {/* Bottom: Tagline + Logo + Contact links (integrated footer) */}
      <div className="px-6 md:px-12 lg:px-[10vw] pb-6">
        {/* Description text */}
        <div className="contact-reveal mb-4">
          <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-text/60 leading-relaxed">
            Product-driven technology studio.
            <br />
            Intelligence, Architected.
          </p>
        </div>

        {/* Large logo + contact links */}
        <div className="contact-reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-6 lg:mb-8">
          {/* Left: company logo — slide-up reveal */}
          <div className="overflow-hidden lg:max-w-[60%]">
            <Image
              src="/images/logo-dark.png"
              alt="RavenDOS"
              width={730}
              height={120}
              className="contact-logo h-auto w-[80vw] md:w-[60vw] lg:w-[45vw]"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 45vw"
              priority
            />
          </div>

          {/* Right: contact links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col gap-2 lg:items-end lg:text-right shrink-0"
          >
            <a
              href="mailto:hello@ravendos.com"
              className="group relative inline-block font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:text-accent/70"
            >
              HELLO@RAVENDOS.COM
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full lg:left-auto lg:right-0" />
            </a>
            <a
              href="tel:+919000334021"
              className="group relative inline-block font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/70 transition-colors duration-300 hover:text-text"
            >
              +91 9000334021
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full lg:left-auto lg:right-0" />
            </a>
            <div className="h-2" />
            <Link
              href="/services"
              className="group relative inline-block font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              Services
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full lg:left-auto lg:right-0" />
            </Link>
            <Link
              href="/#philosophy"
              className="group relative inline-block font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              About
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full lg:left-auto lg:right-0" />
            </Link>
            <Link
              href="/#products"
              className="group relative inline-block font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-text/50 transition-colors duration-300 hover:text-text"
            >
              Products
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full lg:left-auto lg:right-0" />
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="contact-reveal border-t border-text/15 py-4 flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
          <p className="font-[family-name:var(--font-body)] text-xs text-text/60">
            &copy; {new Date().getFullYear()} RavenDOS Business Ventures LLP.
            All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-xs text-text/50">
            E/38, G2, 17-1-380, Santosh Nagar Main Road, Central Excise Colony,
            Saidabad, Hyderabad, Telangana 500059, India
          </p>
        </div>
      </div>
    </main>
  );
}
