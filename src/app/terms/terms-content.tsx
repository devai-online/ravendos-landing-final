"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-setup";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Footer } from "@/components/layout/footer";

const LAST_UPDATED = "24 August 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="terms-reveal border-t border-text/15 pt-8">
      <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold uppercase tracking-[0.04em] mb-4">
        {title}
      </h2>
      <div className="space-y-4 font-[family-name:var(--font-body)] text-sm md:text-base text-text/70 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function TermsPageContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const els = contentRef.current!.querySelectorAll(".terms-reveal");
      gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main
        id="main-content"
        ref={contentRef}
        className="relative z-[1] flex min-h-svh flex-col px-6 md:px-12 lg:px-[10vw] pt-24 md:pt-28 pb-16"
      >
        {/* Breadcrumbs */}
        <div className="terms-reveal">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Terms of Service", href: "/terms" },
            ]}
          />
        </div>

        <header className="terms-reveal mt-8 mb-12 max-w-3xl">
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[1.05]">
            Terms of Service
          </h1>
          <p className="mt-5 font-[family-name:var(--font-body)] text-sm md:text-base text-text/60 leading-relaxed">
            These terms govern your use of the RavenDOS website. By accessing or
            using the site, you agree to be bound by them.
          </p>
          <p className="mt-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] text-text/40">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="max-w-3xl space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              This website is operated by RavenDOS Business Ventures LLP
              (&ldquo;RavenDOS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;). By accessing, browsing, or otherwise using this
              website (the &ldquo;Site&rdquo;), you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service
              and our{" "}
              <Link
                href="/privacy"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                Privacy Policy
              </Link>
              . If you do not agree, please do not use the Site.
            </p>
          </Section>

          <Section title="2. About Our Services">
            <p>
              RavenDOS is a product-driven technology studio that designs,
              develops, and launches intelligent platforms and provides related
              technology services. This Site presents information about our work,
              products, and services. Any engagement for professional services
              is governed by a separate written agreement between you and
              RavenDOS; nothing on this Site constitutes such an agreement or a
              binding offer.
            </p>
          </Section>

          <Section title="3. Use of the Site">
            <p>You agree to use the Site only for lawful purposes. You must not:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-accent">
              <li>
                Use the Site in any way that breaches applicable local, national,
                or international law or regulation;
              </li>
              <li>
                Attempt to gain unauthorized access to the Site, its servers, or
                any connected systems or networks;
              </li>
              <li>
                Introduce malware, viruses, or any other malicious or
                technologically harmful material;
              </li>
              <li>
                Use automated systems (bots, scrapers, crawlers) to access or
                copy the Site in a manner that places unreasonable load on our
                infrastructure;
              </li>
              <li>
                Submit false information, spam, or abusive content through our
                forms;
              </li>
              <li>
                Reproduce, duplicate, or resell any part of the Site in breach of
                these terms.
              </li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content on this Site — including text, graphics, logos, the
              RavenDOS name and branding, product names, designs, code, and
              visual elements — is owned by or licensed to RavenDOS and is
              protected by intellectual property laws. You may view and use the
              Site for your personal, informational purposes only. You may not
              copy, modify, distribute, publish, or exploit any content without
              our prior written permission.
            </p>
          </Section>

          <Section title="5. Submissions & Communications">
            <p>
              When you contact us through the Site (for example, via our contact
              form), you are responsible for ensuring the information you provide
              is accurate and lawful. Any feedback, ideas, or suggestions you
              voluntarily send us may be used by RavenDOS without obligation or
              compensation to you. Your submissions are handled in accordance
              with our{" "}
              <Link
                href="/privacy"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="6. Third-Party Links & Services">
            <p>
              The Site may contain links to third-party websites or rely on
              third-party services (such as analytics, advertising, form
              processing, and bot protection). We do not control and are not
              responsible for the content, policies, or practices of any
              third-party site or service. Accessing them is at your own risk and
              subject to their terms.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              The Site and its content are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis, without warranties of any kind,
              whether express or implied. We do not warrant that the Site will be
              uninterrupted, error-free, secure, or free of harmful components,
              or that the information on it is complete, accurate, or current.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, RavenDOS and its partners,
              members, and employees shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any
              loss of profits, revenue, data, or goodwill, arising out of or in
              connection with your use of, or inability to use, the Site — even
              if we have been advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="9. Indemnification">
            <p>
              You agree to indemnify and hold harmless RavenDOS from any claims,
              liabilities, damages, losses, and expenses (including reasonable
              legal fees) arising out of your misuse of the Site or your breach
              of these Terms of Service.
            </p>
          </Section>

          <Section title="10. Changes to the Site & Terms">
            <p>
              We may modify, suspend, or discontinue any part of the Site at any
              time without notice. We may also update these Terms of Service from
              time to time; changes will be posted on this page with a revised
              &ldquo;Last updated&rdquo; date. Your continued use of the Site
              after changes take effect constitutes acceptance of the revised
              terms.
            </p>
          </Section>

          <Section title="11. Governing Law & Jurisdiction">
            <p>
              These Terms of Service are governed by and construed in accordance
              with the laws of India. Any disputes arising in connection with the
              Site or these terms shall be subject to the exclusive jurisdiction
              of the courts of Hyderabad, Telangana, India.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have any questions about these Terms of Service, contact us
              at{" "}
              <a
                href="mailto:hello@ravendos.com"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                hello@ravendos.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919000334021"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                +91 9000334021
              </a>
              . You can also reach us through our{" "}
              <Link
                href="/contact"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                contact page
              </Link>
              .
            </p>
            <p>
              RavenDOS Business Ventures LLP, E/38, G2, 17-1-380, Santosh Nagar
              Main Road, Central Excise Colony, Saidabad, Hyderabad, Telangana
              500059, India.
            </p>
          </Section>
        </div>
      </main>

      <Footer showCta={false} />
    </>
  );
}
