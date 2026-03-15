import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact RavenDOS — Software Development Studio in Hyderabad",
  description:
    "Get in touch with RavenDOS in Hyderabad, Telangana. Let\u2019s discuss your AI, DevOps, app development, or web design project. We respond within 24 hours.",
  path: "/contact",
  keywords: [
    "contact RavenDOS",
    "software company Hyderabad contact",
    "technology studio Telangana",
  ],
});

export default function ContactPage() {
  return <ContactPageContent />;
}
