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
      "RavenDOS is a product-driven technology studio in Hyderabad that designs, develops, and launches intelligent platforms. Services include AI/ML development, full stack software, DevOps, DevSecOps, app development, web design, and cybersecurity.",
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
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Generative AI",
      "Large Language Models",
      "AI Chatbot Development",
      "Predictive Analytics",
      "MLOps",
      "Full Stack Development",
      "MERN Stack",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "SaaS Development",
      "MVP Development",
      "Custom Software Development",
      "Enterprise Software Development",
      "Backend API Development",
      "Microservices Architecture",
      "DevOps",
      "DevSecOps",
      "CI/CD Pipelines",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Infrastructure as Code",
      "AWS",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Cloud Migration",
      "Cloud Architecture",
      "Mobile App Development",
      "React Native",
      "Flutter",
      "Progressive Web Apps",
      "Website Design",
      "E-commerce Development",
      "SEO Optimization",
      "Cybersecurity",
      "Network Security",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Zero Trust Architecture",
      "SIEM",
      "SOC",
      "Identity and Access Management",
      "ISO 27001 Compliance",
      "SOC 2 Compliance",
      "SAST",
      "DAST",
      "Container Security",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "AI/ML Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom ML Model Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "NLP Solutions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Vision" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generative AI & LLM Integration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbot Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Analytics" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "MLOps Pipelines" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Full Stack Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "MVP Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "MERN Stack Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Software Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend API & Microservices" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Legacy System Modernization" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "DevOps & Cloud Infrastructure",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "CI/CD Pipeline Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Architecture" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kubernetes Orchestration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Docker Containerization" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Terraform Infrastructure as Code" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AWS/Azure/GCP Consulting" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Migration" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "DevSecOps",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Secure CI/CD Pipelines" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SAST/DAST Integration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Container Security" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance Automation" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "App Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "React Native Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flutter App Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Progressive Web App Development" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Website Design & Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Website Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Next.js Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Redesign" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Cybersecurity & Network Security",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Architecture Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Penetration Testing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vulnerability Assessment" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zero Trust Implementation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SIEM & SOC Setup" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ISO 27001 Compliance" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed Security Services" } },
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
