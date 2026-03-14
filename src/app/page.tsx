import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { WorkTransition } from "@/components/sections/work-transition";
import { Products } from "@/components/sections/products";
import { Marquee } from "@/components/sections/marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientLogos } from "@/components/sections/client-logos";
import { Philosophy } from "@/components/sections/philosophy";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative z-[1]">
      <Hero />
      <Capabilities />
      <WorkTransition />
      <Products />
      <Marquee />
      <Testimonials />
      <ClientLogos />
      <Philosophy />
      {/* Divider line between Philosophy and Footer */}
      <div className="mx-6 md:mx-12 lg:mx-[10vw]">
        <div className="h-px bg-text/15" />
      </div>
      <Footer />
    </main>
  );
}
