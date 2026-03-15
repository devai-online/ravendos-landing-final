# RavenDOS Landing Website

## Project Overview
Landing website for RavenDOS — a product-driven technology studio that designs, develops, and launches its own intelligent platforms. Tagline: "Intelligence, Architected."

## Current Phase
**Production-ready.** Multi-page site: homepage (5 sections + footer), 5 service pages, services overview, and /contact page with Formspree integration. Dark theme.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Dev server:** Webpack mode (`--webpack` flag — Turbopack crashes on Windows with Tailwind v4 PostCSS)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP 3.x (ScrollTrigger, SplitText) + Lenis smooth scroll + OGL (WebGL gradient bg)
- **Fonts:** Syncopate (700), Syne (700, 800), Outfit (400) via `next/font/google`
- **Form:** Formspree (`@formspree/react`, form ID `xwvrnzry`)
- **SEO:** JSON-LD schemas (ProfessionalService, Service, FAQPage, BreadcrumbList), llms.txt, sitemap
- **Analytics:** Google Analytics (G-DY1KD00RXD)
- **Security:** CSP headers in next.config.ts (GA + Formspree whitelisted in connect-src)
- **Gradient text cutout:** OGL canvas captured at ~6fps → dataURL → CSS `background-clip: text` on capability card headings

## Key References
- **Primary design reference:** [Tiwis.fr](https://www.tiwis.fr/en) — match animation language & interaction patterns (dark theme)
- **Logo files:** `public/images/logo-light.png` (light bg), `public/images/logo-dark.png` (dark bg/white text)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, Navbar, LenisProvider, GradientBackground, GA, ProfessionalService schema
│   ├── page.tsx                # Homepage: Hero → Capabilities → Testimonials → Marquee → Philosophy → Footer
│   ├── globals.css             # Tailwind @theme, custom cursor, keyframes, reduced-motion, .text-gradient-cutout
│   ├── sitemap.ts              # Dynamic sitemap (8 entries)
│   ├── robots.ts               # Robots (allow all)
│   ├── contact/
│   │   ├── page.tsx            # Contact page (server component, metadata, breadcrumbs)
│   │   └── contact-content.tsx # Contact page client content (form + animations)
│   └── services/
│       ├── page.tsx            # Services overview page
│       ├── ai-ml/page.tsx
│       ├── devops/page.tsx
│       ├── app-development/page.tsx
│       ├── web-design/page.tsx
│       └── network-security/page.tsx
├── components/
│   ├── layout/
│   │   ├── navbar.tsx          # Logo + centered links (About, Products, Services, Contact) + contact pill
│   │   ├── mobile-menu.tsx     # Full-screen hamburger overlay with Link routing
│   │   ├── footer.tsx          # Tiwis-style: CTA + large logo + nav links + email + copyright
│   │   └── breadcrumbs.tsx     # Semantic breadcrumb nav for service/contact pages
│   ├── sections/
│   │   ├── hero.tsx            # Massive RAVENDOS (accent on DOS) + tagline + ASCII sphere
│   │   ├── capabilities.tsx    # "What We Do" intro + 4 cards (gradient cutout headings), pinned h-scroll
│   │   ├── testimonials.tsx    # Products showcase (IntiGrade) + approach values + testimonial quotes + client logos
│   │   ├── marquee.tsx         # Continuous text strip
│   │   ├── philosophy.tsx      # Manifesto + parallax ASCII tetrahedron
│   │   └── service-page.tsx    # Reusable service page template (hero, offerings, why us, FAQ, CTA, other services)
│   ├── ui/
│   │   ├── gradient-background.tsx  # WebGL animated mesh gradient (OGL, fixed, z-0, preserveDrawingBuffer)
│   │   ├── button.tsx          # Tiwis-style text+arrow with vertical swap
│   │   ├── split-text.tsx      # GSAP SplitText reveal wrapper
│   │   ├── clip-reveal.tsx     # Clip-path image reveal
│   │   └── contact-form.tsx    # Formspree form (useForm + ValidationError) + underline inputs + circular halo submit
│   ├── canvas/
│   │   ├── animated-sphere.tsx
│   │   └── animated-tetrahedron.tsx  # Accepts color prop: "white" (default) | "accent" (#FF7C48)
│   └── analytics/
│       └── google-analytics.tsx # GA4 with G-DY1KD00RXD
├── hooks/
│   ├── use-media-query.ts      # useIsDesktop() hook
│   ├── use-scroll-direction.ts # Scroll direction detection
│   └── use-hash-nav.ts         # Hash link handler (Lenis-aware)
├── lib/
│   ├── gsap-setup.ts           # Central GSAP plugin registration
│   ├── lenis-provider.tsx      # Lenis + GSAP ticker sync + cross-page hash scroll
│   ├── fonts.ts                # next/font/google exports
│   ├── constants.ts            # Section IDs, nav links, capabilities, products, testimonials, philosophy, SERVICES data
│   ├── schemas.ts              # JSON-LD builders (ProfessionalService, Service, FAQ, Breadcrumb)
│   └── seo.ts                  # Metadata helper (buildPageMetadata)
public/
├── images/                     # Logos, product screenshots, client logos
├── llms.txt                    # AI crawler summary
├── llms-full.txt               # Extended AI crawler info
└── manifest.json
```

## Pages & Routes
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage: Hero → Capabilities → Testimonials → Marquee → Philosophy → Footer |
| `/contact` | Static | Formspree contact form + footer (no CTA) |
| `/services` | Static | Services overview listing all 5 services |
| `/services/ai-ml` | Static | AI & ML service page |
| `/services/devops` | Static | DevOps & Cloud Infrastructure service page |
| `/services/app-development` | Static | App Development service page |
| `/services/web-design` | Static | Web Design & Development service page |
| `/services/network-security` | Static | Network & Cyber Security service page |
| `/sitemap.xml` | Dynamic | 8 entries |
| `/robots.txt` | Dynamic | Allow all |

## Nav Link Order
About, Products, Services, Contact (navbar center + footer + mobile menu)

## Implementation Status

### Completed
- **Multi-page site:** Homepage, /contact, /services, 5 individual service pages
- **Dark theme:** #0A0A0A bg, #FFF text, #FF7C48 accent. CSS variables cascade through site.
- **Navbar:** Logo left, centered links (About, Products, Services, Contact), contact pill right. Uses next/link. Hide on scroll down, reveal on scroll up. Adaptive color for light/dark sections.
- **Footer (Tiwis-style):** CTA section ("An idea, a project? Let's talk."), large RavenDOS logo, nav links (About, Products, Services, Contact), email, phone, copyright, address. `showCta` prop (false on /contact and service pages). GSAP scroll-reveal.
- **Hero:** Tiwis-style massive RAVENDOS bottom-left. Mobile: smaller sphere (60vmin, 15% opacity), larger tagline.
- **Capabilities:** 4 white cards with gradient text cutout headings. Pinned horizontal scroll on desktop. Mobile: border-separated list.
- **Testimonials:** Combined section — IntiGrade product showcase, 4-column approach values (Tiwis Posture pattern), 3-column testimonial quotes, client logo marquee.
- **Marquee:** Continuous text strip.
- **Philosophy:** Manifesto text + parallax ASCII tetrahedron.
- **Service pages:** 5 individual pages with hero, offerings grid (2-col with borders), why us grid (2-col with borders), FAQ accordion, CTA, other services links. GSAP scroll-reveal. JSON-LD schemas (Service, FAQPage, BreadcrumbList).
- **Services overview:** Hub page listing all 5 services with hover links.
- **Contact page:** Form (Formspree), email alternative, breadcrumbs, footer (no CTA). GSAP entry animations.
- **Formspree integration:** `@formspree/react` useForm hook, form ID `xwvrnzry`. ValidationError on name, email, message. Success state shows "Message sent."
- **SEO:** ProfessionalService schema in layout, per-page metadata with buildPageMetadata, sitemap, robots, llms.txt, keywords.
- **Google Analytics:** G-DY1KD00RXD active.
- **CSP headers:** Content-Security-Policy in next.config.ts with GA and Formspree whitelisted in connect-src.
- **Hash navigation fix:** Lenis-aware hash scroll on cross-page navigation (lenis-provider.tsx watches pathname changes).
- **Breadcrumbs:** Semantic nav on service and contact pages.
- **Dead code cleanup:** Removed 12 unused files, dead constants, unused refs.
- GSAP + Lenis, animation primitives, marquee, custom cursor, reduced motion
- ASCII canvas components with IntersectionObserver
- Production build passing (all 15 routes)

## Known Issues & Lessons Learned

### Turbopack Crash on Windows
- Turbopack's PostCSS/Tailwind v4 pipeline tries to read `nul` (Windows reserved device name) → FATAL panic.
- **Fix:** Use `--webpack` flag in dev script. Production build already uses Webpack.
- Dev script: `cross-env NODE_OPTIONS=--max-old-space-size=8192 next dev --webpack`
- Next.js 16 flag: `--webpack` (NOT `--no-turbopack`).

### CSP Blocks External Fetch Silently
- Content-Security-Policy `connect-src` in next.config.ts must whitelist all external API domains.
- **Symptom:** fetch fails with generic "Network error" / TypeError, no CSP error in console on some browsers.
- **Fix:** Add domain to `connect-src` directive (e.g., `https://formspree.io`).

### Hydration Errors (React 19 / Next.js 16)
- `useGSAP` (uses useLayoutEffect) causes "insertBefore" hydration errors. **Fix:** use `useEffect` + `gsap.context()` in Hero.
- `ScrollTrigger pin: true` creates wrapper divs that conflict with React hydration.
- Dynamic imports with `ssr: false` need `loading` placeholder to reduce mismatches.

### Lenis + Hash Navigation
- Lenis hijacks native browser scroll-to-hash behavior. Cross-page hash links (e.g., clicking `/#products` from a service page) land at the top of the page instead of the target section.
- **Fix:** `lenis-provider.tsx` watches `pathname` changes and scrolls to hash element via `lenis.scrollTo()` after a 200ms delay.

### Dark Theme on WebGL Background
- Low-opacity borders (10-15%) are invisible against the animated WebGL gradient. Need 25-30% minimum.
- GSAP scrub `fromTo` applies "from" state before trigger start. Avoid transforms that make content invisible.
- Key lesson: Use `gsap.set()` for initial state + `gsap.to()` for animation, NOT `fromTo` with `scrub`.

## Design Decisions (Locked)

### Color Palette
- Background: #0A0A0A (dark), Text: #FFFFFF (white), Accent: #FF7C48 (decorative only)
- "DOS" in hero heading uses accent color
- Dark fluid wave WebGL gradient background (neon palette, mouse-reactive)

### Typography
- Syncopate Bold: hero heading only
- Syne Bold/ExtraBold: section headings, UPPERCASE
- Outfit Regular: body/UI

### Layout
- Homepage: Hero → Capabilities (h-scroll) → Testimonials → Marquee → Philosophy → Footer
- Service pages: Hero → Offerings → Why Us → FAQ → CTA → Other Services → Footer
- Contact page: /contact — Formspree form page with breadcrumbs + footer (no CTA)
- Nav: logo left, centered links (About, Products, Services, Contact), contact pill right
- Footer: Tiwis-inspired — CTA heading, large logo, nav links, email, phone, address, copyright

### Responsive
- Mobile: h-scroll disabled, ASCII scaled down, cursor disabled, all animations kept

## Workflow Rules
- Always update CLAUDE.md, docs, and memory when significant changes are made
- Always read all docs after context compaction to restore state
- Test builds frequently (`npx next build`)
- **NO INSTANT RESPONSES.** Analyze carefully, consider every detail, plan thoroughly before implementing.

## After Compaction Checklist
1. Read CLAUDE.md
2. Read docs/design-decisions.md
3. Read page.tsx, hero.tsx, capabilities.tsx, testimonials.tsx, footer.tsx, service-page.tsx
4. Site has: / (homepage), /contact, /services, /services/[slug] (5 service pages)
