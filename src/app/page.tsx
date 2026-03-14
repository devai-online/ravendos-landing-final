import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Marquee } from "@/components/sections/marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { Philosophy } from "@/components/sections/philosophy";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative z-[1]">
      <Hero />
      <Capabilities />
      <Testimonials />
      <Marquee />
      <Philosophy />
      <Footer />
    </main>
  );
}
