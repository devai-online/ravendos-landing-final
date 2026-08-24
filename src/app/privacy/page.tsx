import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schemas";
import { PrivacyPageContent } from "./privacy-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | RavenDOS",
  description:
    "How RavenDOS collects, uses, and protects your personal data — including contact form submissions, analytics, advertising, and your privacy rights.",
  path: "/privacy",
  keywords: [
    "RavenDOS privacy policy",
    "data protection RavenDOS",
    "privacy policy technology studio",
    "GDPR DPDP privacy India",
  ],
});

export default function PrivacyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://ravendos.com" },
    { name: "Privacy Policy", url: "https://ravendos.com/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PrivacyPageContent />
    </>
  );
}
