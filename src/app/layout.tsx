import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { syncopate, syne, outfit, spaceGrotesk } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { TransitionProvider } from "@/components/ui/page-transition";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Navbar } from "@/components/layout/navbar";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { buildProfessionalServiceSchema } from "@/lib/schemas";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ravendos.com"),
  title: {
    default:
      "RavenDOS — Intelligence, Architected. | Technology Studio in Hyderabad",
    template: "%s | RavenDOS",
  },
  description:
    "RavenDOS is a product-driven technology studio in Hyderabad, India. AI/ML development, DevOps, app development, web design, and cybersecurity services.",
  authors: [{ name: "RavenDOS Business Ventures LLP" }],
  creator: "RavenDOS Business Ventures LLP",
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "RavenDOS — Intelligence, Architected.",
    description:
      "A product-driven technology studio in Hyderabad building intelligent platforms. AI/ML, DevOps, app development, web design, and cybersecurity.",
    url: "https://ravendos.com",
    siteName: "RavenDOS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RavenDOS — Intelligence, Architected.",
    description:
      "A product-driven technology studio in Hyderabad building intelligent platforms.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

const jsonLd = buildProfessionalServiceSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syncopate.variable} ${syne.variable} ${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
        <GradientBackground />
        <LenisProvider>
          <TransitionProvider>
            <Navbar />
            {children}
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
