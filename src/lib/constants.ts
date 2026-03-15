// Section IDs for anchor navigation
export const SECTIONS = {
  HERO: "hero",
  CAPABILITIES: "capabilities",
  PRODUCTS: "products",
  MARQUEE: "marquee",
  TESTIMONIALS: "testimonials",
  PHILOSOPHY: "philosophy",
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: "About", href: `/#${SECTIONS.PHILOSOPHY}` },
  { label: "Products", href: `/#${SECTIONS.PRODUCTS}` },
  { label: "Services", href: "/services" },
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

// Service pages data — powers individual service pages and schemas
export const SERVICES = [
  {
    slug: "ai-ml",
    name: "AI & Machine Learning Development",
    shortName: "AI/ML",
    tagline:
      "Intelligent systems, from model training to production deployment.",
    metaTitle:
      "AI & Machine Learning Development Company in Hyderabad | RavenDOS",
    metaDescription:
      "RavenDOS builds custom AI and machine learning solutions in Hyderabad. From model training to production deployment — intelligent systems architected for scale.",
    h1: "AI & Machine Learning Development in Hyderabad",
    heroDescription:
      "We design, train, and deploy intelligent systems that solve real business problems. From custom model development to MLOps pipelines, we architect AI solutions built for production scale.",
    offerings: [
      "Custom ML model development & training",
      "Natural Language Processing (NLP) solutions",
      "Computer Vision & image recognition systems",
      "Predictive analytics & recommendation engines",
      "MLOps pipelines & model monitoring",
      "AI-powered automation & workflow optimization",
    ],
    whyChoose: [
      "End-to-end ownership from research to production deployment",
      "Experience building AI products (IntiGrade) used in real-world education",
      "Local team with deep domain expertise",
      "Focus on measurable business outcomes, not just model accuracy",
    ],
    faqs: [
      {
        question:
          "What AI and ML services does RavenDOS offer?",
        answer:
          "RavenDOS offers end-to-end AI/ML development services including custom model training, NLP solutions, computer vision, predictive analytics, MLOps pipeline setup, and AI-powered automation.",
      },
      {
        question:
          "How long does it take to develop a custom AI solution?",
        answer:
          "Development timelines vary based on complexity. A proof-of-concept typically takes 4\u20136 weeks, while a production-ready AI system may take 3\u20136 months. We follow an iterative approach with regular milestones. Contact us to discuss your project timeline.",
      },
      {
        question:
          "Do you provide ongoing support for deployed AI models?",
        answer:
          "Yes. We offer comprehensive MLOps support including model monitoring, retraining pipelines, performance tracking, and continuous optimization to ensure your AI systems maintain accuracy over time.",
      },
    ],
    schemaServiceType: "AI/ML Development",
    keywords: [
      "AI development company Hyderabad",
      "machine learning services Telangana",
      "ML model training Hyderabad",
      "AI consulting Hyderabad",
      "artificial intelligence company India",
    ],
  },
  {
    slug: "devops",
    name: "DevOps & Cloud Infrastructure",
    shortName: "DevOps",
    tagline:
      "CI/CD pipelines, cloud architecture, and automated infrastructure.",
    metaTitle:
      "DevOps & Cloud Infrastructure Services in Hyderabad | RavenDOS",
    metaDescription:
      "Expert DevOps and cloud infrastructure services in Hyderabad. CI/CD pipelines, Kubernetes, AWS/Azure/GCP architecture, and infrastructure automation by RavenDOS.",
    h1: "DevOps & Cloud Infrastructure Services in Hyderabad",
    heroDescription:
      "We architect resilient cloud infrastructure and streamlined CI/CD pipelines that accelerate your delivery. From container orchestration to infrastructure-as-code, we automate your path from commit to production.",
    offerings: [
      "CI/CD pipeline design & implementation",
      "Cloud architecture (AWS, Azure, GCP)",
      "Kubernetes & container orchestration",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Monitoring, logging & observability (Grafana, Prometheus)",
      "Cost optimization & cloud migration",
    ],
    whyChoose: [
      "Battle-tested pipelines used in our own production systems",
      "Multi-cloud expertise across AWS, Azure, and GCP",
      "Automation-first mindset \u2014 we eliminate manual deployment bottlenecks",
      "Transparent pricing with no hidden infrastructure costs",
    ],
    faqs: [
      {
        question:
          "What DevOps services does RavenDOS provide?",
        answer:
          "RavenDOS provides comprehensive DevOps services including CI/CD pipeline design, cloud architecture on AWS/Azure/GCP, Kubernetes orchestration, Infrastructure as Code, monitoring setup, and cloud migration.",
      },
      {
        question: "Which cloud platforms do you work with?",
        answer:
          "We are multi-cloud experts, working with Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We help you choose the right platform based on your specific requirements, budget, and compliance needs.",
      },
      {
        question:
          "Can you help migrate our existing infrastructure to the cloud?",
        answer:
          "Absolutely. We provide end-to-end cloud migration services including assessment, planning, execution, and post-migration optimization. We ensure minimal downtime and create Infrastructure as Code templates for reproducible, maintainable environments.",
      },
    ],
    schemaServiceType: "DevOps & Cloud Infrastructure",
    keywords: [
      "DevOps services Hyderabad",
      "cloud infrastructure company Telangana",
      "CI/CD pipeline Hyderabad",
      "Kubernetes consulting India",
      "AWS Azure GCP Hyderabad",
    ],
  },
  {
    slug: "app-development",
    name: "App Development",
    shortName: "App Dev",
    tagline:
      "End-to-end mobile and web applications built for scale.",
    metaTitle:
      "App Development Company in Hyderabad | Mobile & Web Apps | RavenDOS",
    metaDescription:
      "Custom mobile and web application development in Hyderabad. React, Next.js, React Native, Flutter \u2014 end-to-end apps built for scale by RavenDOS.",
    h1: "Mobile & Web App Development in Hyderabad",
    heroDescription:
      "We build performant, scalable applications from concept to launch. Whether it\u2019s a cross-platform mobile app or a complex web platform, our engineering team delivers end-to-end \u2014 no handoffs, no gaps.",
    offerings: [
      "Cross-platform mobile apps (React Native, Flutter)",
      "Web applications (Next.js, React, Node.js)",
      "Backend API development & microservices",
      "Real-time features & WebSocket integrations",
      "Database design & optimization",
      "App Store & Play Store deployment",
    ],
    whyChoose: [
      "Proven track record with products like IntiGrade and DiagnosticWale",
      "Full-stack team \u2014 frontend, backend, mobile, and DevOps in one studio",
      "Performance-first architecture using modern frameworks",
      "Post-launch support and iterative improvement cycles",
    ],
    faqs: [
      {
        question: "What types of apps does RavenDOS build?",
        answer:
          "We build cross-platform mobile apps (React Native, Flutter), web applications (Next.js, React), backend APIs, and full-stack platforms. We have delivered products across education (IntiGrade), healthcare (DiagnosticWale), and enterprise domains.",
      },
      {
        question:
          "What is the typical timeline for app development?",
        answer:
          "Timelines depend on scope and complexity. A basic mobile app takes 2\u20133 months, while a complex platform with multiple integrations may take 4\u20138 months. Contact us for a detailed estimate based on your specific requirements.",
      },
      {
        question:
          "Do you provide post-launch app maintenance?",
        answer:
          "Yes. We offer ongoing maintenance packages including bug fixes, performance monitoring, feature updates, security patches, and user feedback-driven improvements to keep your app performant and relevant.",
      },
    ],
    schemaServiceType: "Application Development",
    keywords: [
      "app development company Hyderabad",
      "mobile app development Telangana",
      "React Native developer Hyderabad",
      "web application development India",
      "custom software development Hyderabad",
    ],
  },
  {
    slug: "web-design",
    name: "Website Design & Development",
    shortName: "Web Design",
    tagline:
      "High-performance websites that convert visitors into customers.",
    metaTitle:
      "Website Design & Development Company in Hyderabad | RavenDOS",
    metaDescription:
      "Premium website design and development in Hyderabad. Next.js, responsive design, SEO-optimized \u2014 websites that look exceptional and perform brilliantly by RavenDOS.",
    h1: "Website Design & Development in Hyderabad",
    heroDescription:
      "We craft high-performance websites that balance stunning design with technical excellence. From landing pages to complex web platforms, we build sites that load fast, rank well, and convert visitors into customers.",
    offerings: [
      "Custom website design & branding",
      "Responsive & mobile-first development",
      "SEO-optimized architecture & performance",
      "E-commerce website development",
      "Landing page design & conversion optimization",
      "Website redesign & modernization",
    ],
    whyChoose: [
      "Design-engineering hybrid team \u2014 no design-to-code translation gaps",
      "Performance obsessed: we build with Lighthouse scores in mind",
      "Modern tech stack (Next.js, Tailwind CSS, GSAP) for cutting-edge results",
      "Data-driven approach to conversion optimization",
    ],
    faqs: [
      {
        question:
          "What technologies do you use for web development?",
        answer:
          "We build with modern technologies including Next.js (React), Tailwind CSS, TypeScript, Node.js, and GSAP for animations. We choose the best tech stack for each project based on requirements, performance goals, and scalability needs.",
      },
      {
        question:
          "Do you provide SEO services with website development?",
        answer:
          "Yes. Every website we build includes SEO-optimized architecture \u2014 semantic HTML, structured data, meta tags, sitemap, fast load times, and mobile responsiveness. We also offer ongoing SEO consulting and content optimization.",
      },
      {
        question:
          "How long does it take to design and build a website?",
        answer:
          "A professional landing page typically takes 2\u20134 weeks, a multi-page business website 4\u20138 weeks, and complex web applications 2\u20134 months. Contact us to discuss your specific project timeline.",
      },
    ],
    schemaServiceType: "Website Design & Development",
    keywords: [
      "website design company Hyderabad",
      "web development Telangana",
      "Next.js developer Hyderabad",
      "responsive website design India",
      "ecommerce website Hyderabad",
    ],
  },
  {
    slug: "network-security",
    name: "Network & Cyber Security",
    shortName: "Security",
    tagline:
      "Secure architectures, threat mitigation, and resilient network design.",
    metaTitle:
      "Network Security & Cyber Security Services in Hyderabad | RavenDOS",
    metaDescription:
      "Enterprise network security and cyber security services in Hyderabad. Secure architecture design, threat assessment, and compliance consulting by RavenDOS.",
    h1: "Network & Cyber Security Services in Hyderabad",
    heroDescription:
      "We design secure network architectures and implement comprehensive cybersecurity measures that protect your business. From threat assessment to compliance consulting, we build defense-in-depth strategies that keep your systems resilient.",
    offerings: [
      "Network architecture design & security hardening",
      "Vulnerability assessment & penetration testing",
      "Firewall, IDS/IPS configuration & management",
      "Zero-trust architecture implementation",
      "Compliance consulting (ISO 27001, SOC 2)",
      "Security monitoring & incident response",
    ],
    whyChoose: [
      "Security is built into every system we architect, not bolted on after",
      "Experience securing production AI and cloud systems",
      "Compliance-aware approach aligned with Indian and global standards",
      "Proactive monitoring capabilities for critical infrastructure",
    ],
    faqs: [
      {
        question:
          "What network security services does RavenDOS offer?",
        answer:
          "RavenDOS offers comprehensive network security services including secure architecture design, vulnerability assessments, penetration testing, firewall configuration, zero-trust implementation, compliance consulting, and security monitoring.",
      },
      {
        question:
          "Do you provide security audits for existing systems?",
        answer:
          "Yes. We conduct thorough security audits including vulnerability scanning, penetration testing, code review, and compliance gap analysis. We provide detailed reports with prioritized remediation steps and can help implement the fixes.",
      },
      {
        question:
          "Can you help with regulatory compliance like ISO 27001?",
        answer:
          "Absolutely. We provide compliance consulting for ISO 27001, SOC 2, and other frameworks. We help with gap analysis, policy documentation, technical controls implementation, and audit preparation.",
      },
    ],
    schemaServiceType: "Network & Cyber Security",
    keywords: [
      "network security company Hyderabad",
      "cyber security services Telangana",
      "penetration testing Hyderabad",
      "security consulting India",
      "ISO 27001 compliance Hyderabad",
    ],
  },
] as const;

export type ServiceData = (typeof SERVICES)[number];
