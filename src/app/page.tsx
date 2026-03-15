import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Marquee } from "@/components/sections/marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { Philosophy } from "@/components/sections/philosophy";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title:
    "RavenDOS — Intelligence, Architected. | Software Company in Hyderabad",
  description:
    "RavenDOS is a product-driven technology studio in Hyderabad, India. We build AI/ML systems, DevOps infrastructure, mobile/web apps, websites, and cybersecurity solutions.",
  alternates: { canonical: "https://ravendos.com" },
};

export default function Home() {
  return (
    <main id="main-content" className="relative z-[1]">
      <Hero />
      <Capabilities />
      <Testimonials />
      <Marquee />
      <Philosophy />
      <Footer />
    </main>
  );
}
