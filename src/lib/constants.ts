// Section IDs for anchor navigation
export const SECTIONS = {
  HERO: "hero",
  CAPABILITIES: "capabilities",
  WORK: "work",
  PRODUCTS: "products",
  CLIENTS: "clients",
  MARQUEE: "marquee",
  TESTIMONIALS: "testimonials",
  PHILOSOPHY: "philosophy",
  CONTACT: "contact",
} as const;

// Breakpoints (matching Tailwind / design spec)
export const BREAKPOINTS = {
  MOBILE: 767,
  TABLET: 768,
  DESKTOP: 992,
} as const;

// Animation timing defaults
export const ANIMATION = {
  EASE: "power3.out",
  DURATION: 1.2,
  STAGGER: 0.05,
  SPLIT_TEXT_Y: "140%",
  CLIP_INSET_START: "inset(30%)",
  CLIP_INSET_END: "inset(0%)",
  SVG_STROKE_DURATION: 1.5,
  BUTTON_DURATION: 0.35,
  BUTTON_EASE: "cubic-bezier(0.77, 0, 0.175, 1)",
  MARQUEE_DURATION: "12s",
} as const;

// Colors
export const COLORS = {
  BG: "#0A0A0A",
  TEXT: "#FFFFFF",
  ACCENT: "#FF7C48",
  ACCENT_HOVER: "#E56A3A",
  MUTED: "#999999",
  WHITE: "#FFFFFF",
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: "About", href: `/#${SECTIONS.PHILOSOPHY}` },
  { label: "Products", href: `/#${SECTIONS.PRODUCTS}` },
  { label: "Contact", href: "/contact" },
] as const;

// Capabilities data
export const CAPABILITIES = [
  {
    heading: "AI/ML",
    body: "Intelligent systems, from model training to production deployment.",
  },
  {
    heading: "DEVOPS & INFRASTRUCTURE",
    body: "CI/CD pipelines, cloud architecture, and automated infrastructure.",
  },
  {
    heading: "NETWORK & SECURITY",
    body: "Secure architectures, threat mitigation, and resilient network design.",
  },
  {
    heading: "APP DEVELOPMENT",
    body: "End-to-end mobile and web applications built for scale.",
  },
] as const;

// Products data (RavenDOS's own products)
export const PRODUCTS = [
  {
    name: "INTIGRADE",
    tagline: "Grading Made Simple.",
    body: "AI-powered exam evaluation that bridges the gap between pen and paper. IntiGrade scans, analyzes, and grades physical tests instantly.",
    href: "https://intigrade.in",
    buttonText: "Visit IntiGrade",
    logo: "/images/products/intigrade-logo.png",
    logoDark: "/images/products/intigrade-logo-dark.png",
    screenshot: "/images/products/intigrade-screenshot.png",
  },
] as const;

// Client projects (built for external clients)
export const CLIENT_PROJECTS = [
  {
    name: "DIAGNOSTICWALE",
    tagline: "Advanced Diagnostics, Trusted Results.",
    body: "India's trusted diagnostic platform. Connecting patients with labs and providing comprehensive health monitoring and medical testing solutions.",
    href: "https://diagnosticwale.com",
    buttonText: "Visit DiagnosticWale",
    logo: "/images/clients/diagnosticwale-logo.png",
    screenshot: "/images/clients/diagnosticwale-screenshot.png",
  },
] as const;

// Testimonials data
export const TESTIMONIALS = [
  {
    quote:
      "RavenDOS built our entire web presence from scratch and delivered beyond our expectations. Their attention to detail and technical execution gave WebRocket the digital foundation we needed to grow.",
    name: "Sunil Pachigolla",
    role: "CEO",
    company: "WebRocket",
    initials: "SP",
  },
  {
    quote:
      "Managing diagnostic data across our centres was a constant challenge. RavenDOS stepped in and built a system that streamlined everything — our operations are significantly more efficient now.",
    name: "Seetha Soumya",
    role: "Director",
    company: "Diagnostic Wale",
    initials: "SS",
  },
  {
    quote:
      "RavenDOS helped us modernise our internal systems and brought a level of professionalism we hadn't experienced before. They understood our requirements and delivered exactly what we needed.",
    name: "Sathyanarayana Raju",
    role: "Director",
    company: "Sai ChitFunds",
    initials: "SR",
  },
] as const;

// Philosophy copy
export const PHILOSOPHY_TEXT =
  "We design systems that think. We architect platforms that scale. We build what we believe the world needs — then we prove it.";
