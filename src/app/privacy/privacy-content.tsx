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
    <section className="privacy-reveal border-t border-text/15 pt-8">
      <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold uppercase tracking-[0.04em] mb-4">
        {title}
      </h2>
      <div className="space-y-4 font-[family-name:var(--font-body)] text-sm md:text-base text-text/70 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function PrivacyPageContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const els = contentRef.current!.querySelectorAll(".privacy-reveal");
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
        {/* Breadcrumbs + heading */}
        <div className="privacy-reveal">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>

        <header className="privacy-reveal mt-8 mb-12 max-w-3xl">
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="mt-5 font-[family-name:var(--font-body)] text-sm md:text-base text-text/60 leading-relaxed">
            RavenDOS respects your privacy. This policy explains what personal
            data we collect, why we collect it, and the choices you have.
          </p>
          <p className="mt-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] text-text/40">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="max-w-3xl space-y-10">
          <Section title="1. Who We Are">
            <p>
              This website is operated by RavenDOS Business Ventures LLP
              (&ldquo;RavenDOS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;), a product-driven technology studio registered
              in India. For any privacy-related questions, contact us at{" "}
              <a
                href="mailto:hello@ravendos.com"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                hello@ravendos.com
              </a>
              .
            </p>
            <p>
              Registered address: E/38, G2, 17-1-380, Santosh Nagar Main Road,
              Central Excise Colony, Saidabad, Hyderabad, Telangana 500059,
              India.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              <strong className="text-text/90">
                Information you give us.
              </strong>{" "}
              When you submit our contact form, we collect the details you
              provide: your name, email address, phone number, company or
              organization (optional), and the content of your message.
            </p>
            <p>
              <strong className="text-text/90">
                Information collected automatically.
              </strong>{" "}
              When you visit the site, we and our analytics/advertising
              providers automatically collect certain technical data through
              cookies and similar technologies — such as your IP address,
              browser and device type, pages viewed, referring URLs, and general
              interaction data.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-accent">
              <li>Respond to your enquiries and provide requested services;</li>
              <li>
                Operate, maintain, and improve our website and its content;
              </li>
              <li>
                Measure website traffic and understand how visitors use the site
                (analytics);
              </li>
              <li>
                Measure the performance of our advertising and marketing
                campaigns (conversion tracking);
              </li>
              <li>
                Protect the website against spam, fraud, and abuse (bot
                verification);
              </li>
              <li>Comply with our legal obligations.</li>
            </ul>
          </Section>

          <Section title="4. Cookies & Tracking Technologies">
            <p>
              We use cookies and similar technologies to make the site work, to
              understand usage, and to measure advertising performance. These
              include analytics cookies (Google Analytics) and advertising
              cookies (Google Ads). You can control or delete cookies through
              your browser settings; disabling some cookies may affect how the
              site functions.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>
              We rely on trusted third-party providers to operate this website.
              Each processes data under its own privacy policy:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-accent">
              <li>
                <strong className="text-text/90">Google Analytics</strong> —
                website usage analytics.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
                >
                  Google Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-text/90">Google Ads</strong> —
                advertising and conversion measurement.{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
                >
                  How Google uses ad data
                </a>
                .
              </li>
              <li>
                <strong className="text-text/90">Formspree</strong> — processes
                and delivers contact-form submissions to us.{" "}
                <a
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
                >
                  Formspree Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-text/90">Cloudflare Turnstile</strong> —
                verifies that form submissions come from humans, not bots.{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
                >
                  Cloudflare Privacy Policy
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="6. How We Share Information">
            <p>
              We do not sell your personal data. We share information only with
              the service providers listed above (acting on our behalf), or
              where required to comply with the law, enforce our terms, or
              protect our rights and the safety of others.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain contact-form submissions for as long as necessary to
              respond to your enquiry and for our legitimate business records,
              after which they are deleted or anonymized. Analytics and
              advertising data are retained according to the retention settings
              of the respective providers.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>
              Depending on where you live (including under the EU/UK GDPR and
              India&rsquo;s Digital Personal Data Protection Act, 2023), you may
              have the right to access, correct, delete, or restrict the
              processing of your personal data, and to withdraw consent or
              object to certain processing. To exercise any of these rights,
              email us at{" "}
              <a
                href="mailto:hello@ravendos.com"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent/70"
              >
                hello@ravendos.com
              </a>{" "}
              and we will respond within a reasonable timeframe.
            </p>
          </Section>

          <Section title="9. Data Security">
            <p>
              We take reasonable technical and organizational measures to
              protect your data, including HTTPS encryption in transit and a
              Content-Security-Policy. No method of transmission or storage is
              completely secure, so we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="10. International Transfers">
            <p>
              Our third-party providers may process and store data on servers
              located outside your country of residence. Where this happens,
              those providers implement safeguards intended to protect your data
              consistent with applicable law.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              This website is not directed at children under the age of 18, and
              we do not knowingly collect personal data from them. If you believe
              a child has provided us with personal data, please contact us so we
              can delete it.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with a revised &ldquo;Last
              updated&rdquo; date. We encourage you to review it periodically.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have questions about this policy or how we handle your data,
              reach us at{" "}
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
          </Section>
        </div>
      </main>

      <Footer showCta={false} />
    </>
  );
}
