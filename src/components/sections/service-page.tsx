"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap-setup";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Footer } from "@/components/layout/footer";
import { SERVICES, type ServiceData } from "@/lib/constants";

interface ServicePageProps {
  service: ServiceData;
  breadcrumbs: { name: string; href: string }[];
}

export function ServicePageContent({ service, breadcrumbs }: ServicePageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const els = gsap.utils.toArray<HTMLElement>(
        ".svc-reveal",
        sectionRef.current
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
    },
    { scope: sectionRef }
  );

  return (
    <main id="main-content" className="relative z-[1]">
      <div ref={sectionRef}>
        {/* Breadcrumbs */}
        <div className="px-6 md:px-12 lg:px-[10vw] pt-24 md:pt-28">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-[10vw] pt-10 md:pt-14 pb-20 md:pb-32">
          <div className="svc-reveal">
            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5.5vw,4rem)] font-bold uppercase leading-[1.1] mb-8 md:mb-10">
              {service.h1}
            </h1>
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl lg:text-2xl text-text/80 max-w-3xl leading-relaxed">
              {service.heroDescription}
            </p>
          </div>
        </section>

        {/* Offerings */}
        <section className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-36">
          <div className="svc-reveal mb-14 md:mb-20">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-5">
              What We Offer
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase">
              Our {service.shortName} Services
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            {service.offerings.map((item, i) => (
              <li
                key={i}
                className={`svc-reveal flex items-start gap-5 border-b border-text/30 py-7 md:py-9 ${
                  i % 2 === 0
                    ? "md:border-r md:border-text/30 md:pr-10 lg:pr-16"
                    : "md:pl-10 lg:pl-16"
                }`}
              >
                <span className="font-[family-name:var(--font-body)] text-sm text-accent tracking-wider mt-0.5 shrink-0">
                  0{i + 1}
                </span>
                <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-text/90 leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Why Choose */}
        <section className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-36">
          <div className="svc-reveal mb-14 md:mb-20">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-5">
              Why Us
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase">
              Why RavenDOS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {service.whyChoose.map((reason, i) => (
              <div
                key={i}
                className={`svc-reveal border-t border-text/30 pt-8 md:pt-10 pb-10 md:pb-14 ${
                  i % 2 === 0
                    ? "md:border-r md:border-text/30 md:pr-10 lg:pr-16"
                    : "md:pl-10 lg:pl-16"
                }`}
              >
                <span className="font-[family-name:var(--font-body)] text-sm text-accent tracking-wider block mb-5">
                  0{i + 1}
                </span>
                <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-text/80 leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-36">
          <div className="svc-reveal mb-14 md:mb-20">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-5">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-4xl">
            {service.faqs.map((faq, i) => (
              <div key={i} className="svc-reveal border-t border-text/25">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-8 md:py-10 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-[family-name:var(--font-body)] text-lg md:text-xl text-text pr-6">
                    {faq.question}
                  </span>
                  <span className="text-accent shrink-0 text-xl">
                    {openFaq === i ? "\u2212" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-text/70 pb-10 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
            <div className="border-t border-text/25" />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-[10vw] py-24 md:py-36 text-center">
          <div className="svc-reveal">
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase mb-8">
              Ready to get started?
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-text/60 mb-12 max-w-xl mx-auto leading-relaxed">
              Let&apos;s discuss your {service.shortName.toLowerCase()}{" "}
              requirements. We respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-text px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-text/90 hover:gap-6"
            >
              <span className="font-[family-name:var(--font-body)] text-base md:text-lg tracking-wide text-bg">
                Contact us
              </span>
              <svg
                className="h-5 w-5 text-bg transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Other Services */}
        <section className="px-6 md:px-12 lg:px-[10vw] py-20 md:py-28">
          <div className="svc-reveal">
            <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/50 uppercase block mb-12 md:mb-16">
              Other Services
            </span>
            <div>
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between border-t border-text/25 py-8 md:py-10 transition-colors duration-300 hover:bg-text/[0.03] -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-[10vw] lg:px-[10vw]"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold uppercase transition-colors duration-300 group-hover:text-accent">
                      {s.shortName}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-sm text-text/50 mt-2">
                      {s.tagline}
                    </p>
                  </div>
                  <svg
                    className="hidden md:block h-5 w-5 text-text/30 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1 shrink-0 ml-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M1 8h14M9 2l6 6-6 6" />
                  </svg>
                </Link>
              ))}
              <div className="border-t border-text/25" />
            </div>
          </div>
        </section>
      </div>

      <Footer showCta={false} />
    </main>
  );
}
