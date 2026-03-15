import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schemas";
import { ServicePageContent } from "@/components/sections/service-page";

const service = SERVICES.find((s) => s.slug === "ai-ml")!;

export const metadata: Metadata = buildPageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
  keywords: [...service.keywords],
});

export default function AiMlServicePage() {
  const serviceSchema = buildServiceSchema(service);
  const faqSchema = buildFAQSchema(service.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://ravendos.com" },
    { name: "Services", url: "https://ravendos.com/services" },
    { name: service.name, url: `https://ravendos.com/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ServicePageContent
        service={service}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
    </>
  );
}
