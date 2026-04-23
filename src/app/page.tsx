import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { Footer } from "@/components/layout/footer";
import { buildPageMetadata } from "@/lib/seo";

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

export const metadata: Metadata = buildPageMetadata({
  title: "RavenDOS — AI, DevOps & Software Company in Hyderabad",
  description:
    "Product-driven technology studio in Hyderabad. AI/ML development, full stack software, DevOps, web design & cybersecurity. Intelligence, Architected.",
  path: "/",
  keywords: [
    "software development company Hyderabad",
    "technology studio India",
    "AI development company India",
    "full stack development company India",
    "AI automation company India",
    "DevOps services company India",
    "cybersecurity services company India",
    "custom software development company",
    "product development partner",
    "end-to-end technology solutions provider",
    "IT company Hyderabad",
    "outsource software development India",
    "startup tech partner India",
    "dedicated development team India",
    "digital transformation services",
    "enterprise software company India",
    "hire developers India",
    "AI cloud DevOps solutions",
    "secure software development company",
    "intelligent platform development",
  ],
});

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
