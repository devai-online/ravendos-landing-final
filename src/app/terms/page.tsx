import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schemas";
import { TermsPageContent } from "./terms-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | RavenDOS",
  description:
    "The terms governing your use of the RavenDOS website — acceptable use, intellectual property, disclaimers, liability, and governing law.",
  path: "/terms",
  keywords: [
    "RavenDOS terms of service",
    "terms and conditions RavenDOS",
    "website terms technology studio",
    "terms of use India",
  ],
});

export default function TermsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://ravendos.com" },
    { name: "Terms of Service", url: "https://ravendos.com/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TermsPageContent />
    </>
  );
}
