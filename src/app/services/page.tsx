import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schemas";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = buildPageMetadata({
  title: "Technology Services — AI, DevOps, Full Stack | RavenDOS",
  description:
    "Explore RavenDOS services: AI/ML, DevOps & cloud, full stack software, web design, cybersecurity, DevSecOps & app development. Hyderabad, India.",
  path: "/services",
  keywords: [
    "software development services Hyderabad",
    "technology services company India",
    "IT services Telangana",
    "AI and DevOps solutions",
    "full stack and cloud services",
    "secure software development company",
    "end-to-end technology solutions",
    "AI cloud DevOps solutions",
    "enterprise software services India",
    "hire technology team India",
    "custom software development services",
    "managed IT services Hyderabad",
    "digital transformation services",
    "technology partner India",
  ],
});

export default function ServicesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://ravendos.com" },
    { name: "Services", url: "https://ravendos.com/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main id="main-content" className="relative z-[1]">
        <div className="px-6 md:px-12 lg:px-[10vw] pt-24 md:pt-28">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ]}
          />
        </div>

        <section className="px-6 md:px-12 lg:px-[10vw] pt-10 md:pt-14 pb-20 md:pb-32">
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-tight mb-8 md:mb-10">
            Our Services
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl lg:text-2xl text-text/80 max-w-3xl leading-relaxed mb-20 md:mb-24">
            We design, build, and ship intelligent platforms. From AI-powered
            products to secure cloud infrastructure, our team delivers
            end-to-end technology solutions.
          </p>

          <div className="space-y-0">
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between border-t border-text/10 py-8 md:py-10 transition-colors duration-300 hover:bg-text/[0.03] -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-[10vw] lg:px-[10vw]"
              >
                <div className="flex items-start gap-6 md:gap-8">
                  <span className="font-[family-name:var(--font-body)] text-xs text-accent tracking-wider mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold uppercase transition-colors duration-300 group-hover:text-accent">
                      {service.name}
                    </h2>
                    <p className="font-[family-name:var(--font-body)] text-sm text-text/50 mt-2 max-w-lg">
                      {service.tagline}
                    </p>
                  </div>
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
            <div className="border-t border-text/10" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
