import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { Footer } from "@/components/layout/footer";

/* Below-fold sections: lazy-loaded to reduce initial JS and TBT. */
const Capabilities = dynamic(
  () => import("@/components/sections/capabilities").then((m) => m.Capabilities),
);
const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const Marquee = dynamic(
  () => import("@/components/sections/marquee").then((m) => m.Marquee),
);
const Philosophy = dynamic(
  () => import("@/components/sections/philosophy").then((m) => m.Philosophy),
);

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
