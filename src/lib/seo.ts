import type { Metadata } from "next";

const BASE_URL = "https://ravendos.com";

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
