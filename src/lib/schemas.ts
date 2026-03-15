// Centralized JSON-LD schema generators for SEO

const BASE_URL = "https://ravendos.com";
const ORG_NAME = "RavenDOS";
const LEGAL_NAME = "RavenDOS Business Ventures LLP";
const LOGO_URL = `${BASE_URL}/images/logo-light.png`;
const EMAIL = "hello@ravendos.com";
const PHONE = "+919000334021";

const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress:
    "E/38, G2, 17-1-380, Santosh Nagar Main Road, Central Excise Colony, Saidabad",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500059",
  addressCountry: "IN",
};

const AREA_SERVED = [
  {
    "@type": "City" as const,
    name: "Hyderabad",
    containedInPlace: { "@type": "State" as const, name: "Telangana" },
  },
  { "@type": "State" as const, name: "Telangana" },
  { "@type": "Country" as const, name: "India" },
];

/** Root ProfessionalService schema — replaces Organization in layout.tsx */
export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: ORG_NAME,
    legalName: LEGAL_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "RavenDOS is a product-driven technology studio in Hyderabad that designs, develops, and launches intelligent platforms. Services include AI/ML development, DevOps, app development, web design, and network security.",
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.3616",
      longitude: "78.4747",
    },
    telephone: PHONE,
    email: EMAIL,
    areaServed: AREA_SERVED,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: EMAIL,
      telephone: PHONE,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
    sameAs: ["https://linkedin.com/company/ravendos"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "AI/ML Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom ML Model Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "NLP Solutions" },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Computer Vision" },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "DevOps & Cloud Infrastructure",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "CI/CD Pipeline Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Cloud Architecture",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kubernetes Orchestration",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "App Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web Application Development",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Website Design & Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Website Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-commerce Development",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Network & Cyber Security",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Security Architecture Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Penetration Testing",
              },
            },
          ],
        },
      ],
    },
  };
}

/** Service schema for individual service pages */
export function buildServiceSchema(service: {
  name: string;
  slug: string;
  tagline: string;
  schemaServiceType: string;
  offerings: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${service.slug}`,
    name: service.name,
    description: service.tagline,
    serviceType: service.schemaServiceType,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#organization`,
      name: ORG_NAME,
    },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offering },
      })),
    },
  };
}

/** FAQPage schema for service page FAQs */
export function buildFAQSchema(
  faqs: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
