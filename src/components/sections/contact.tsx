"use client";

import { SECTIONS } from "@/lib/constants";
import { SplitText } from "@/components/ui/split-text";
import { SvgLine } from "@/components/ui/svg-line";
import { ContactForm } from "@/components/ui/contact-form";

export function Contact() {
  return (
    <section id={SECTIONS.CONTACT} className="relative">
      {/* Decorative SVG line above */}
      <div className="px-6">
        <SvgLine
          d="M0 50 Q300 10 600 50 T1200 50"
          className="mx-auto h-16 w-full max-w-7xl"
          stroke="rgba(255,255,255,0.1)"
        />
      </div>

      {/* Contact area */}
      <div className="flex min-h-[80svh] flex-col justify-center px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <SplitText
            as="h2"
            className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase mb-16 md:mb-24"
          >
            SAY HELLO
          </SplitText>

          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-text/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-[family-name:var(--font-body)] text-xs text-text/40">
            &copy; {new Date().getFullYear()} RavenDOS. All rights reserved.
          </p>
          <a
            href="mailto:hello@ravendos.com"
            className="font-[family-name:var(--font-body)] text-xs text-text/40 transition-colors hover:text-text"
          >
            hello@ravendos.com
          </a>
        </div>
      </footer>
    </section>
  );
}
