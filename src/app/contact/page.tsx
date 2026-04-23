import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact RavenDOS — Free Consultation | Hyderabad",
  description:
    "Get in touch with RavenDOS. Free consultation for AI, DevOps, full stack development, web design & cybersecurity projects. Response within 24 hours.",
  path: "/contact",
  keywords: [
    "contact RavenDOS",
    "software company Hyderabad contact",
    "free technology consultation India",
    "hire developers Hyderabad",
    "get quote software development",
    "IT consulting Hyderabad",
    "project inquiry software company",
    "technology studio contact Telangana",
    "AI consulting free quote",
    "DevOps consulting India contact",
  ],
});

export default function ContactPage() {
  return <ContactPageContent />;
}
