import type { Metadata } from "next";

const BASE_URL = "https://ravendos.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo/sig.png`;

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/**
 * Builds Next.js Metadata object with consistent OG/Twitter tags.
 * Use in each page's `export const metadata`.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetaOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords && { keywords: keywords.join(", ") }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "RavenDOS",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "RavenDOS — Intelligence, Architected.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
