import type { Metadata } from "next";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — RavenDOS",
  description:
    "Get in touch with RavenDOS. Let's build something intelligent together.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
