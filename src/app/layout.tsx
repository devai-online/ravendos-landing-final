import type { Metadata } from "next";
import { syncopate, syne, outfit, spaceGrotesk } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "RavenDOS — Intelligence, Architected.",
  description:
    "RavenDOS is a product-driven technology studio that designs, develops, and launches intelligent platforms.",
  openGraph: {
    title: "RavenDOS — Intelligence, Architected.",
    description:
      "A product-driven technology studio building intelligent platforms.",
    type: "website",
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
        <GradientBackground />
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
