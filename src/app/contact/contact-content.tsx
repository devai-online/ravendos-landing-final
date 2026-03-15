"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-setup";
import { ContactForm } from "@/components/ui/contact-form";

export function ContactPageContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const els = contentRef.current!.querySelectorAll(".contact-reveal");
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main id="main-content" className="relative z-[1]">
      <div ref={contentRef}>
        {/* Contact form hero */}
        <section className="flex min-h-svh flex-col justify-center px-6 md:px-12 lg:px-[10vw] pt-32 pb-24 md:pb-32">
          <div className="max-w-2xl">
            <span className="contact-reveal block font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase mb-8">
              Contact
            </span>
            <h1 className="contact-reveal font-[family-name:var(--font-heading)] text-[clamp(2.5rem,7vw,5rem)] font-bold uppercase mb-6 leading-tight">
              SAY HELLO
            </h1>
            <p className="contact-reveal font-[family-name:var(--font-body)] text-base md:text-lg text-text/50 mb-16 max-w-md leading-relaxed">
              Have an idea, a project, or simply want to explore
              what&apos;s possible? We&apos;d love to hear from you.
            </p>
            <div className="contact-reveal">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Alternative contact */}
        <div className="px-6 md:px-12 lg:px-[10vw] pb-16">
          <div className="contact-reveal border-t border-text/10 pt-12">
            <p className="font-[family-name:var(--font-body)] text-sm text-text/50 mb-3">
              Or email us directly
            </p>
            <a
              href="mailto:hello@ravendos.com"
              className="font-[family-name:var(--font-heading)] text-xl font-bold text-text/60 transition-colors duration-300 hover:text-text"
            >
              hello@ravendos.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
