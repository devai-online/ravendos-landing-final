"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/images/clients/aa-designer-studio.png", alt: "AA Designer Studio", name: "AA Designer Studio", width: 140, height: 48 },
  { src: "/images/clients/aarambh.png", alt: "Aarambh", name: "Aarambh", width: 56, height: 56 },
  { src: "/images/clients/kwikit.png", alt: "Kwikit", name: "Kwikit", width: 120, height: 40 },
  { src: "/images/clients/webrocket.png", alt: "WebRocket", name: "WebRocket", width: 120, height: 36 },
  { src: "/images/clients/diagnosticwale-logo.png", alt: "DiagnosticWale", name: "DiagnosticWale", width: 100, height: 48 },
];

function LogoSet() {
  return (
    <>
      {LOGOS.map((logo, i) => (
        <div
          key={i}
          className="shrink-0 flex flex-col items-center justify-center gap-3 px-8 md:px-12 lg:px-14"
        >
          <div
            className="bg-white rounded-2xl p-5 md:p-6 flex items-center justify-center"
            style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-body)] text-xs text-text/60 tracking-wide uppercase">
            {logo.name}
          </span>
        </div>
      ))}
    </>
  );
}

export function ClientLogos() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      {/* Section label */}
      <div className="px-6 md:px-12 lg:px-[10vw] mb-10 md:mb-14">
        <span className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] text-text/40 uppercase">
          Our Clients
        </span>
      </div>

      {/* Logo marquee */}
      <div className="overflow-hidden">
        <div
          className="flex w-max items-center"
          style={{ animation: "marquee-scroll 35s linear infinite" }}
        >
          <div className="flex items-center">
            <LogoSet />
          </div>
          <div className="flex items-center">
            <LogoSet />
          </div>
          <div className="flex items-center">
            <LogoSet />
          </div>
          <div className="flex items-center">
            <LogoSet />
          </div>
        </div>
      </div>
    </section>
  );
}
