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
      "AI & Machine Learning Development Company | RavenDOS",
    metaDescription:
      "Custom AI development services: ML models, NLP, computer vision, generative AI, predictive analytics & AI automation. Hyderabad-based, serving India.",
    h1: "AI & Machine Learning Development Company",
    heroDescription:
      "We design, train, and deploy intelligent systems that solve real business problems. From custom machine learning models and generative AI to NLP, computer vision, and MLOps pipelines, we architect AI solutions built for production scale.",
    offerings: [
      "Custom ML model development & training",
      "Natural Language Processing (NLP) solutions",
      "Computer Vision & image recognition systems",
      "Generative AI & Large Language Model (LLM) integration",
      "AI chatbot & conversational AI development",
      "Predictive analytics & recommendation engines",
      "MLOps pipelines & model monitoring",
      "AI-powered automation & workflow optimization",
    ],
    whyChoose: [
      "End-to-end ownership from research to production deployment",
      "Experience building AI products (IntiGrade) used in real-world education",
      "Local team with deep domain expertise across Hyderabad and India",
      "Focus on measurable business outcomes, not just model accuracy",
    ],
    faqs: [
      {
        question: "What AI and ML services does RavenDOS offer?",
        answer:
          "RavenDOS offers end-to-end AI development services including custom machine learning model training, NLP, computer vision, generative AI and LLM integration, AI chatbot development, predictive analytics, MLOps pipeline setup, and AI-powered business automation.",
      },
      {
        question: "How long does it take to develop a custom AI solution?",
        answer:
          "Development timelines vary based on complexity. A proof-of-concept typically takes 4–6 weeks, while a production-ready AI system may take 3–6 months. We follow an iterative approach with regular milestones.",
      },
      {
        question: "Do you provide ongoing support for deployed AI models?",
        answer:
          "Yes. We offer comprehensive MLOps support including model monitoring, retraining pipelines, performance tracking, drift detection, and continuous optimization to ensure your AI systems maintain accuracy over time.",
      },
      {
        question: "How much does custom AI development cost?",
        answer:
          "AI development costs depend on scope, data complexity, and infrastructure. A focused proof-of-concept typically starts in the low-to-mid five figures (USD), while production systems with MLOps scale accordingly. We offer transparent, fixed-scope estimates after an initial discovery call.",
      },
      {
        question: "Can AI automate my business operations?",
        answer:
          "Yes. We help businesses identify high-impact automation opportunities — from document processing and customer support chatbots to predictive analytics and workflow automation. We build AI solutions that deliver measurable ROI, not just tech demos.",
      },
      {
        question: "What is the difference between AI and machine learning?",
        answer:
          "Artificial Intelligence (AI) is the broad field of building systems that mimic intelligent behavior. Machine Learning (ML) is a subset of AI where systems learn patterns from data. Deep Learning is a further subset using neural networks. We work across all three, selecting the right approach for each problem.",
      },
      {
        question: "What industries do you build AI solutions for?",
        answer:
          "We have built AI systems across education (IntiGrade exam evaluation), healthcare (diagnostic workflows), SaaS, and enterprise automation. Our team works with structured data, images, audio, and text across domains.",
      },
    ],
    schemaServiceType: "AI/ML Development",
    keywords: [
      "AI development company India",
      "AI development company Hyderabad",
      "AI solutions provider",
      "AI automation services",
      "machine learning development company",
      "AI chatbot development",
      "NLP development services",
      "computer vision company India",
      "generative AI development company",
      "AI powered business automation",
      "predictive analytics solutions",
      "custom ML model development",
      "AI consulting services",
      "artificial intelligence company India",
      "hire AI developers India",
      "AI development company for startups",
      "affordable AI development services",
      "custom AI solutions company",
      "AI integration services",
      "cost of AI development services",
      "AI use cases in healthcare",
      "AI solutions for small business",
      "future of AI in business automation",
      "machine learning solutions company",
      "Indian AI startup solutions company",
    ],
  },
  {
    slug: "devops",
    name: "DevOps & Cloud Infrastructure",
    shortName: "DevOps",
    tagline:
      "CI/CD pipelines, cloud architecture, and automated infrastructure.",
    metaTitle:
      "DevOps & Cloud Infrastructure Services Company | RavenDOS",
    metaDescription:
      "DevOps consulting: CI/CD pipelines, Kubernetes, Docker, Terraform, AWS/Azure/GCP cloud architecture & infrastructure automation. Hyderabad, India.",
    h1: "DevOps & Cloud Infrastructure Services",
    heroDescription:
      "We architect resilient cloud infrastructure and streamlined CI/CD pipelines that accelerate your delivery. From container orchestration and Infrastructure as Code to multi-cloud architecture, we automate your path from commit to production.",
    offerings: [
      "CI/CD pipeline design & implementation",
      "Cloud architecture (AWS, Azure, GCP)",
      "Kubernetes & container orchestration",
      "Docker containerization services",
      "Infrastructure as Code (Terraform, Pulumi)",
      "GitHub Actions, Jenkins & GitLab CI/CD automation",
      "Monitoring, logging & observability (Grafana, Prometheus)",
      "Cloud migration, cost optimization & managed DevOps",
    ],
    whyChoose: [
      "Battle-tested pipelines used in our own production systems",
      "Multi-cloud expertise across AWS, Azure, and GCP",
      "Automation-first mindset — we eliminate manual deployment bottlenecks",
      "Transparent pricing with no hidden infrastructure costs",
    ],
    faqs: [
      {
        question: "What DevOps services does RavenDOS provide?",
        answer:
          "RavenDOS provides comprehensive DevOps services including CI/CD pipeline design, cloud architecture on AWS/Azure/GCP, Kubernetes orchestration, Docker containerization, Infrastructure as Code with Terraform, monitoring setup, and cloud migration.",
      },
      {
        question: "Which cloud platforms do you work with?",
        answer:
          "We are multi-cloud experts, working with Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We help you choose the right platform based on specific requirements, budget, and compliance needs.",
      },
      {
        question: "Can you help migrate our existing infrastructure to the cloud?",
        answer:
          "Absolutely. We provide end-to-end cloud migration services including assessment, planning, execution, and post-migration optimization. We ensure minimal downtime and create Infrastructure as Code templates for reproducible, maintainable environments.",
      },
      {
        question: "How much do DevOps consulting services cost?",
        answer:
          "DevOps engagements are typically scoped as project-based implementations (CI/CD setup, cloud migration) or ongoing managed services. We offer flexible engagement models including hourly consulting, fixed-scope projects, and dedicated DevOps team augmentation.",
      },
      {
        question: "What is Infrastructure as Code and why does it matter?",
        answer:
          "Infrastructure as Code (IaC) means defining your servers, networks, and cloud resources in version-controlled code (e.g., Terraform, Pulumi). This makes environments reproducible, auditable, and recoverable from disaster — eliminating the chaos of manually configured infrastructure.",
      },
      {
        question: "How can CI/CD pipelines accelerate our software delivery?",
        answer:
          "CI/CD pipelines automate testing, building, and deployment on every code change. This catches bugs early, removes manual release bottlenecks, and lets teams ship confidently multiple times per day instead of once per quarter. Most teams see 5-10x faster delivery after CI/CD adoption.",
      },
    ],
    schemaServiceType: "DevOps & Cloud Infrastructure",
    keywords: [
      "DevOps services company India",
      "DevOps consulting services",
      "DevOps automation services",
      "CI/CD pipeline setup",
      "cloud DevOps solutions",
      "DevOps implementation services",
      "infrastructure as code services",
      "DevOps for startups",
      "DevOps managed services",
      "Kubernetes deployment services",
      "Docker containerization services",
      "Terraform infrastructure automation",
      "Jenkins CI/CD pipeline setup",
      "GitHub Actions CI/CD services",
      "AWS DevOps consulting",
      "Azure DevOps services",
      "GCP DevOps solutions",
      "microservices deployment architecture",
      "DevOps monitoring and logging setup",
      "cloud native application deployment",
      "hire DevOps engineer India",
      "DevOps outsourcing company",
      "DevOps consulting for startups",
      "cloud infrastructure automation services",
      "scalable cloud deployment services",
      "DevOps services Hyderabad",
    ],
  },
  {
    slug: "app-development",
    name: "App Development",
    shortName: "App Dev",
    tagline:
      "End-to-end mobile and web applications built for scale.",
    metaTitle:
      "Mobile & Web App Development Company | RavenDOS",
    metaDescription:
      "Custom mobile and web application development: React Native, Flutter, Next.js, Node.js. Cross-platform apps built for scale. Hyderabad, India.",
    h1: "Mobile & Web App Development Company",
    heroDescription:
      "We build performant, scalable applications from concept to launch. Whether it's a cross-platform mobile app or a complex web platform, our engineering team delivers end-to-end — no handoffs, no gaps.",
    offerings: [
      "Cross-platform mobile apps (React Native, Flutter)",
      "Progressive Web Apps (PWA) & responsive web apps",
      "Web applications (Next.js, React, Node.js)",
      "Backend API development & microservices",
      "Real-time features & WebSocket integrations",
      "Database design & optimization",
      "App Store & Play Store deployment",
    ],
    whyChoose: [
      "Proven track record with products like IntiGrade and DiagnosticWale",
      "Full-stack team — frontend, backend, mobile, and DevOps in one studio",
      "Performance-first architecture using modern frameworks",
      "Post-launch support and iterative improvement cycles",
    ],
    faqs: [
      {
        question: "What types of apps does RavenDOS build?",
        answer:
          "We build cross-platform mobile apps (React Native, Flutter), progressive web apps, web applications (Next.js, React), backend APIs, and full-stack platforms. We have delivered products across education (IntiGrade), healthcare (DiagnosticWale), and enterprise domains.",
      },
      {
        question: "What is the typical timeline for app development?",
        answer:
          "Timelines depend on scope and complexity. A basic mobile app takes 2–3 months, while a complex platform with multiple integrations may take 4–8 months. Contact us for a detailed estimate based on your specific requirements.",
      },
      {
        question: "Do you provide post-launch app maintenance?",
        answer:
          "Yes. We offer ongoing maintenance packages including bug fixes, performance monitoring, feature updates, security patches, and user feedback-driven improvements to keep your app performant and relevant.",
      },
      {
        question: "How much does mobile app development cost in India?",
        answer:
          "Costs vary significantly with scope. A simple cross-platform app may start from ₹5-10 lakh, mid-complexity apps ₹15-30 lakh, and enterprise-grade platforms higher. We offer transparent fixed-scope estimates after discovery, with optional milestone-based billing.",
      },
      {
        question: "Should I choose React Native or Flutter for my app?",
        answer:
          "Both are excellent for cross-platform apps. React Native has better JavaScript ecosystem integration and is ideal if your team already uses React. Flutter offers more consistent UI across platforms and strong animation performance. We recommend based on your team's skills and product needs.",
      },
      {
        question: "Do you build progressive web apps (PWAs)?",
        answer:
          "Yes. We build PWAs that work offline, install like native apps, and deliver near-native performance using a single codebase. PWAs are a cost-effective alternative to separate iOS/Android apps for many use cases.",
      },
    ],
    schemaServiceType: "Mobile & Web Application Development",
    keywords: [
      "app development company India",
      "app development company Hyderabad",
      "mobile app development Hyderabad",
      "React Native developer India",
      "Flutter app development",
      "web application development company",
      "cross-platform mobile app development",
      "custom app development services",
      "backend API development",
      "hire app developers India",
      "app development cost India",
      "progressive web app development",
      "enterprise mobile app development",
      "iOS and Android app development",
      "Next.js React developer",
    ],
  },
  {
    slug: "web-design",
    name: "Website Design & Development",
    shortName: "Web Design",
    tagline:
      "High-performance websites that convert visitors into customers.",
    metaTitle:
      "Website Design & Development Company | RavenDOS",
    metaDescription:
      "Premium website design and development: Next.js, responsive design, SEO-optimized, e-commerce. High-performance websites that convert. Hyderabad, India.",
    h1: "Website Design & Development Company",
    heroDescription:
      "We craft high-performance websites that balance stunning design with technical excellence. From landing pages to complex web platforms, we build sites that load fast, rank well, and convert visitors into customers.",
    offerings: [
      "Custom website design & branding",
      "Responsive & mobile-first development",
      "SEO-optimized architecture & performance",
      "E-commerce website development",
      "Landing page design & conversion optimization",
      "Website redesign & modernization",
      "Next.js, React & Tailwind CSS development",
    ],
    whyChoose: [
      "Design-engineering hybrid team — no design-to-code translation gaps",
      "Performance obsessed: we build with Lighthouse scores in mind",
      "Modern tech stack (Next.js, Tailwind CSS, GSAP) for cutting-edge results",
      "Data-driven approach to conversion optimization",
    ],
    faqs: [
      {
        question: "What technologies do you use for web development?",
        answer:
          "We build with modern technologies including Next.js (React), Tailwind CSS, TypeScript, Node.js, and GSAP for animations. We choose the best tech stack for each project based on requirements, performance goals, and scalability needs.",
      },
      {
        question: "Do you provide SEO services with website development?",
        answer:
          "Yes. Every website we build includes SEO-optimized architecture — semantic HTML, structured data, meta tags, sitemap, fast load times, and mobile responsiveness. We also offer ongoing SEO consulting and content optimization.",
      },
      {
        question: "How long does it take to design and build a website?",
        answer:
          "A professional landing page typically takes 2–4 weeks, a multi-page business website 4–8 weeks, and complex web applications 2–4 months. Contact us to discuss your specific project timeline.",
      },
      {
        question: "How much does a custom website cost in India?",
        answer:
          "A professional landing page starts from ₹40k-80k, a multi-page business website ₹1-3 lakh, and complex web platforms ₹5 lakh+. All projects include responsive design, SEO foundation, and Lighthouse-verified performance.",
      },
      {
        question: "What is the benefit of building a website with Next.js?",
        answer:
          "Next.js delivers server-side rendering, static site generation, and built-in image optimization — giving you fast load times, strong SEO, and excellent Core Web Vitals out of the box. It's the modern standard for high-performance websites.",
      },
      {
        question: "Do you offer website maintenance and ongoing support?",
        answer:
          "Yes. We offer maintenance packages covering security updates, content changes, performance monitoring, uptime monitoring, and ongoing SEO optimization. Most clients continue with us for long-term support after launch.",
      },
    ],
    schemaServiceType: "Website Design & Development",
    keywords: [
      "website design company India",
      "web development company Hyderabad",
      "Next.js developer India",
      "responsive website design",
      "ecommerce website development India",
      "landing page design company",
      "website redesign services",
      "SEO website development",
      "custom website development",
      "frontend development services",
      "Tailwind CSS developer",
      "hire web developers India",
      "best website design company Hyderabad",
      "business website design services",
      "modern web development company",
    ],
  },
  {
    slug: "network-security",
    name: "Network & Cyber Security",
    shortName: "Security",
    tagline:
      "Secure architectures, threat mitigation, and resilient network design.",
    metaTitle:
      "Cybersecurity & Network Security Services Company | RavenDOS",
    metaDescription:
      "Enterprise cybersecurity: vulnerability assessment, penetration testing, zero trust, SIEM/SOC, firewall management, ISO 27001 compliance. Hyderabad, India.",
    h1: "Network & Cybersecurity Services Company",
    heroDescription:
      "We design secure network architectures and implement comprehensive cybersecurity measures that protect your business. From vulnerability assessment and penetration testing to zero-trust implementation and compliance consulting, we build defense-in-depth strategies that keep your systems resilient.",
    offerings: [
      "Network architecture design & security hardening",
      "Vulnerability assessment & penetration testing",
      "Firewall, IDS/IPS configuration & management",
      "Zero-trust architecture implementation",
      "SIEM deployment & Security Operations Center (SOC) setup",
      "Identity and Access Management (IAM) implementation",
      "Compliance consulting (ISO 27001, SOC 2, PCI-DSS)",
      "Managed security monitoring & incident response",
    ],
    whyChoose: [
      "Security is built into every system we architect, not bolted on after",
      "Experience securing production AI and cloud systems",
      "Compliance-aware approach aligned with Indian and global standards",
      "Proactive monitoring capabilities for critical infrastructure",
    ],
    faqs: [
      {
        question: "What network security services does RavenDOS offer?",
        answer:
          "RavenDOS offers comprehensive network and cybersecurity services including secure architecture design, vulnerability assessments, penetration testing, firewall configuration, zero-trust implementation, SIEM/SOC setup, IAM, compliance consulting, and managed security monitoring.",
      },
      {
        question: "Do you provide security audits for existing systems?",
        answer:
          "Yes. We conduct thorough security audits including vulnerability scanning, penetration testing, code review, and compliance gap analysis. We provide detailed reports with prioritized remediation steps and can help implement the fixes.",
      },
      {
        question: "Can you help with regulatory compliance like ISO 27001?",
        answer:
          "Absolutely. We provide compliance consulting for ISO 27001, SOC 2, PCI-DSS, and other frameworks. We help with gap analysis, policy documentation, technical controls implementation, and audit preparation.",
      },
      {
        question: "What is zero trust architecture and do I need it?",
        answer:
          "Zero trust assumes no user or device is trustworthy by default — every access request is authenticated, authorized, and encrypted. It's increasingly essential for businesses with remote workforces, cloud infrastructure, or sensitive data. We can assess whether your organization would benefit.",
      },
      {
        question: "How often should we conduct penetration testing?",
        answer:
          "Industry best practice is at least annually, plus after major system changes, new deployments, or security incidents. High-risk industries (finance, healthcare) often benefit from quarterly testing. We offer both one-time engagements and recurring test schedules.",
      },
      {
        question: "What is the difference between SIEM and SOC?",
        answer:
          "A SIEM (Security Information and Event Management) is a tool that aggregates and analyzes security logs. A SOC (Security Operations Center) is the team and process that uses SIEM data to detect and respond to threats. We help implement both — the technology and the operational capability.",
      },
      {
        question: "Do you provide managed security monitoring services?",
        answer:
          "Yes. We offer managed security services including 24/7 monitoring, threat detection, incident response, and regular security reviews. This is ideal for organizations that need enterprise-grade security without building an in-house SOC.",
      },
    ],
    schemaServiceType: "Cybersecurity & Network Security",
    keywords: [
      "cybersecurity services company India",
      "cyber security services Hyderabad",
      "IT security solutions provider",
      "managed security services India",
      "cyber security consulting services",
      "information security services",
      "endpoint security solutions",
      "network security services",
      "data protection services",
      "vulnerability assessment services",
      "penetration testing services",
      "cloud security implementation",
      "firewall security configuration",
      "endpoint protection services",
      "zero trust security architecture",
      "SIEM implementation services",
      "SOC setup consulting",
      "identity and access management services",
      "encryption implementation services",
      "security audit services",
      "web application security testing",
      "API security implementation",
      "network infrastructure services",
      "enterprise networking solutions",
      "network setup and configuration services",
      "managed networking services",
      "IT network consulting",
      "network architecture design",
      "LAN WAN network setup services",
      "VPN setup for businesses",
      "cloud networking services",
      "hire cybersecurity experts",
      "cybersecurity services for startups",
      "ISO 27001 compliance consulting",
      "SOC 2 compliance India",
      "data breach prevention services",
    ],
  },
  {
    slug: "full-stack-development",
    name: "Full Stack Development",
    shortName: "Full Stack",
    tagline:
      "End-to-end custom software, SaaS platforms, and MVPs built by one team.",
    metaTitle:
      "Full Stack Development Company — MERN, SaaS, MVP | RavenDOS",
    metaDescription:
      "Full stack development services: MERN stack, React, Node.js, SaaS platforms, MVP development & scalable web architecture. Custom software built end to end.",
    h1: "Full Stack Software Development Company",
    heroDescription:
      "We build complete software products from database to deployment. Whether you need a SaaS platform, a startup MVP, or enterprise-grade custom software, our full-stack team delivers scalable architecture using modern technologies — React, Node.js, Next.js, and more.",
    offerings: [
      "Custom SaaS platform development",
      "MVP development & rapid prototyping",
      "MERN / MEAN stack web applications",
      "Enterprise software solutions",
      "Backend API & microservices architecture",
      "Database design, optimization & migration",
      "Third-party API integration & automation",
      "Legacy system modernization & re-architecture",
    ],
    whyChoose: [
      "Product-proven engineering — our own products run on the same stack we build for clients",
      "One team, zero handoffs — frontend, backend, database, DevOps under one roof",
      "Startup-friendly engagement models — MVPs in weeks, scale as you grow",
      "Modern architecture that scales — microservices, serverless, containerized deployments",
    ],
    faqs: [
      {
        question: "What is full stack development and why does it matter?",
        answer:
          "Full stack development means building every layer of an application — frontend UI, backend APIs, database, infrastructure. A full-stack team eliminates handoffs between specialists, delivers faster, and ensures all layers are optimized together for performance and maintainability.",
      },
      {
        question: "How much does custom software development cost in India?",
        answer:
          "Custom software costs depend on scope. An MVP typically starts from ₹5-15 lakh, a production SaaS platform ₹15-50 lakh, and enterprise systems scale higher. We offer transparent fixed-scope estimates and milestone-based billing after a discovery call.",
      },
      {
        question: "How long does it take to build an MVP?",
        answer:
          "A focused MVP can ship in 6-12 weeks. The key is ruthless scope discipline — we help you identify the minimum feature set that validates your core hypothesis, then build it fast without cutting engineering corners.",
      },
      {
        question: "What tech stack do you use for full stack development?",
        answer:
          "We primarily use Next.js, React, Node.js, TypeScript, PostgreSQL, and MongoDB for web applications. For mobile, React Native or Flutter. For infrastructure, Docker, Kubernetes, and cloud platforms (AWS/Azure/GCP). We choose the stack based on project requirements, not dogma.",
      },
      {
        question: "Can you take over and improve an existing codebase?",
        answer:
          "Yes. We regularly take over codebases — whether to add features, fix technical debt, improve performance, or modernize legacy systems. We start with a code audit, document findings, and propose a remediation plan with clear tradeoffs.",
      },
      {
        question: "Do you offer dedicated development teams for long-term projects?",
        answer:
          "Yes. We offer dedicated team engagements where a full-stack squad (developers, designers, DevOps) works exclusively on your product. This is ideal for startups and enterprises that need ongoing velocity without hiring overhead.",
      },
    ],
    schemaServiceType: "Custom Software Development",
    keywords: [
      "full stack development company India",
      "full stack development company Hyderabad",
      "custom software development services",
      "custom software development company",
      "web application development company",
      "SaaS development company India",
      "enterprise software development",
      "MVP development company India",
      "MERN stack development company",
      "React Node.js development services",
      "backend API development services",
      "frontend development company",
      "scalable web architecture services",
      "full stack web development services",
      "hire full stack developers India",
      "outsource software development India",
      "dedicated development team India",
      "product development partner",
      "startup tech partner India",
      "how to build scalable SaaS platform",
      "benefits of full stack development for startups",
      "cost of custom software development India",
      "software development company Hyderabad",
      "cloud-based application development",
      "enterprise web solutions provider",
    ],
  },
  {
    slug: "devsecops",
    name: "DevSecOps",
    shortName: "DevSecOps",
    tagline:
      "Security-integrated CI/CD pipelines and secure-by-design development.",
    metaTitle:
      "DevSecOps Services — Secure CI/CD Pipelines | RavenDOS",
    metaDescription:
      "DevSecOps consulting: shift-left security, SAST/DAST integration, secure CI/CD pipelines, container security & compliance automation. Hyderabad, India.",
    h1: "DevSecOps — Security-Integrated Development & Operations",
    heroDescription:
      "We embed security into every stage of your development pipeline. From shift-left testing and SAST/DAST integration to container scanning and compliance automation, our DevSecOps practice ensures your software is secure by design — not patched after the fact.",
    offerings: [
      "Shift-left security integration in CI/CD pipelines",
      "SAST & DAST tool integration (SonarQube, OWASP ZAP, Snyk)",
      "Container & Kubernetes security hardening",
      "Infrastructure as Code security scanning",
      "Compliance automation (SOC 2, ISO 27001, PCI-DSS)",
      "Security-focused code review & developer training",
    ],
    whyChoose: [
      "Unique position at the intersection of DevOps and cybersecurity — we practice both",
      "Automated security gates that protect without slowing down delivery",
      "Experience securing production AI and cloud systems for our own products",
      "Compliance-ready pipelines aligned with Indian and global security standards",
    ],
    faqs: [
      {
        question: "What is DevSecOps and how is it different from DevOps?",
        answer:
          "DevOps unifies development and operations for faster delivery. DevSecOps extends that by integrating security throughout the pipeline — automated vulnerability scanning, secure code review, container hardening, and compliance checks — so security isn't a gate at the end but a continuous practice.",
      },
      {
        question: "How does shift-left security reduce costs?",
        answer:
          "The earlier a security bug is found, the cheaper it is to fix. A vulnerability caught in the developer's IDE costs minutes to fix; the same bug found in production can cost thousands to remediate plus potential breach costs. Shift-left security catches issues at commit time, not after deployment.",
      },
      {
        question: "Can you integrate security into our existing CI/CD pipeline?",
        answer:
          "Yes. We work with your existing Jenkins, GitHub Actions, GitLab CI, or Azure DevOps pipelines — adding SAST, DAST, dependency scanning, secret scanning, and container scanning as automated stages. No need to rebuild your pipeline from scratch.",
      },
      {
        question: "What compliance frameworks do you support?",
        answer:
          "We help implement and automate compliance for SOC 2, ISO 27001, PCI-DSS, HIPAA, and GDPR. Our approach maps each framework's requirements to concrete technical controls in your CI/CD pipeline, infrastructure, and application code.",
      },
      {
        question: "How long does it take to implement DevSecOps in an organization?",
        answer:
          "Initial implementation (pipeline integration, basic scanning, policy setup) typically takes 4-8 weeks. Full DevSecOps maturity — including cultural adoption, developer training, and continuous improvement — is an ongoing journey. We help organizations at every stage.",
      },
    ],
    schemaServiceType: "DevSecOps",
    keywords: [
      "DevSecOps services India",
      "DevSecOps consulting",
      "secure CI/CD pipeline",
      "shift-left security",
      "SAST DAST integration services",
      "secure software development company",
      "container security services",
      "Kubernetes security hardening",
      "compliance automation",
      "security integrated DevOps",
      "application security testing",
      "software supply chain security",
      "hire DevSecOps engineer India",
      "DevSecOps company Hyderabad",
      "secure SDLC implementation",
      "cloud security DevOps",
      "DevSecOps implementation services",
    ],
  },
] as const;

export type ServiceData = (typeof SERVICES)[number];
