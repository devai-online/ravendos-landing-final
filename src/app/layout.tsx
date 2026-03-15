import type { Metadata, Viewport } from "next";
import { syncopate, syne, outfit, spaceGrotesk } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ravendos.com"),
  title: "RavenDOS — Intelligence, Architected.",
  description:
    "RavenDOS is a product-driven technology studio that designs, develops, and launches intelligent platforms.",
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
      "A product-driven technology studio building intelligent platforms.",
    url: "https://ravendos.com",
    siteName: "RavenDOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RavenDOS — Intelligence, Architected.",
    description:
      "A product-driven technology studio building intelligent platforms.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RavenDOS",
  legalName: "RavenDOS Business Ventures LLP",
  url: "https://ravendos.com",
  logo: "https://ravendos.com/images/logo-light.png",
  description:
    "A product-driven technology studio that designs, develops, and launches intelligent platforms.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "E/38, G2, 17-1-380, Santosh Nagar Main Road, Central Excise Colony, Saidabad",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500059",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@ravendos.com",
    telephone: "+919000334021",
    contactType: "customer service",
  },
};

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
        <GradientBackground />
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
