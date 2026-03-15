# RavenDOS Landing — Design Decisions Log

## Status: SEO & Service Pages Complete

---

## 1. Overall Direction & Mood
**Status: LOCKED**

- **Reference site:** Tiwis.fr — match animation language, interaction patterns, layout philosophy
- **Mood:** Premium, minimal, editorial, brutalist-tech
- **Personality:** Quiet intensity with a technical edge — "DOS" in the name reflected through ASCII art aesthetics
- **Emotional tone:** Clean precision with warmth from accent color. Dark, bold, distinctive.

---

## 2. Color Palette
**Status: LOCKED (DARK THEME)**

| Role | Value | Notes |
|------|-------|-------|
| Primary Background | `#0A0A0A` | Near-black |
| Primary Text | `#FFFFFF` | White |
| Accent | `#FF7C48` | Warm orange, decorative only |
| WebGL Background | Dark neon palette | Mouse-reactive fluid wave shader (OGL) |

- Monochrome + single accent approach
- **Accent is decorative only:** counters, tetrahedron color, "DOS" in hero
- CSS variables: `--color-bg: #0A0A0A`, `--color-text: #FFFFFF`, `--color-accent: #FF7C48`
- Low-opacity borders need 25-30% minimum to be visible against animated WebGL gradient

---

## 3. Animation & Interaction
**Status: LOCKED**

### Core animations (Tiwis-inspired):
- Split-text line reveals (GSAP SplitText, power3.out)
- Clip-path image reveals (inset 30% → 0%)
- Horizontal scroll section (pinned, scrub-based) for Capabilities
- Marquee text (continuous CSS animation, ~12s loop)
- Navigation: adaptive color, hide/reveal on scroll, glassmorphic blur
- Scroll-reveal (opacity + y) across all sections and pages

### ASCII art elements:
- **AnimatedSphere** — Hero section, white, rotates continuously
- **AnimatedTetrahedron** — Philosophy section (white), Work Transition (accent #FF7C48, 30% opacity)
- `color` prop: `"white"` (default) | `"accent"` (#FF7C48)
- White characters on transparent canvas

### Custom cursor (desktop only):
- Arrowhead rounded outline — black fill, white stroke (inverted for dark theme)
- 48x48px SVG, disabled on touch devices

### Smooth scroll:
- Lenis + GSAP ticker sync
- Cross-page hash navigation handled by LenisProvider (watches pathname, scrolls after 200ms delay)

---

## 4. Content Density
**Status: LOCKED**

- Sparse, Tiwis-level
- Big display headings, short body copy, CTAs
- Service pages: more content-dense (offerings, why us, FAQ) but still clean

---

## 5. Typography
**Status: LOCKED**

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Hero/Tagline | Syncopate Bold | 700 | Hero heading only |
| Section Headings | Syne | Bold (700) / ExtraBold (800) | Section titles, card headings |
| Body/UI | Outfit | Regular (400) | Body text, nav links, buttons |

- **Syne headings:** UPPERCASE
- **Body text:** Outfit Regular 400, white on dark
- **Type sizing:** Viewport-relative with clamp()

---

## 6. Section Structure & Layout
**Status: LOCKED**

### Homepage (5 sections + footer):

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 1 | **Hero** | `hero.tsx` | Massive "RAVENDOS" (Syncopate Bold), "DOS" in accent, ASCII sphere |
| 2 | **Capabilities** | `capabilities.tsx` | 4 horizontal scroll cards with gradient text cutout headings |
| 3 | **Testimonials** | `testimonials.tsx` | IntiGrade product showcase + approach values + testimonial quotes + client logos |
| 4 | **Marquee** | `marquee.tsx` | Repeating brand text strip |
| 5 | **Philosophy** | `philosophy.tsx` | Short manifesto + parallax ASCII tetrahedron |
| 6 | **Footer** | `footer.tsx` | CTA + large logo + nav links + email + phone + address + copyright |

### Service pages (5 pages, shared template):
- Breadcrumbs → Hero (h1 + description) → Offerings (2-col grid with borders) → Why Us (2-col grid with borders) → FAQ (accordion) → CTA → Other Services → Footer (no CTA)
- Template: `service-page.tsx`, data from `SERVICES` array in `constants.ts`
- Pages: ai-ml, devops, app-development, web-design, network-security

### Other pages:
- **Services overview** (`/services`): Hub listing all 5 services
- **Contact** (`/contact`): "SAY HELLO" heading, form, email, breadcrumbs, footer (no CTA)

### Navigation:
- **Navbar:** Logo left, centered links (About, Products, Services, Contact), contact pill right
- **Mobile:** Hamburger → full-screen overlay
- **Footer:** About, Products, Services, Contact + email + phone

---

## 7. SEO & Schema
**Status: LOCKED**

- **ProfessionalService** schema in root layout (areaServed: Hyderabad, Telangana, India)
- **Service** + **FAQPage** + **BreadcrumbList** schemas on each service page
- **Metadata:** Per-page titles, descriptions, keywords via `buildPageMetadata()` helper
- **Sitemap:** 8 entries (/, /services, 5 service pages, /contact)
- **llms.txt** + **llms-full.txt** for AI crawlers
- **Google Analytics:** G-DY1KD00RXD

---

## 8. Responsive & Mobile
**Status: LOCKED**

- Desktop: ≥992px (full experience)
- Tablet: 768–991px
- Mobile: ≤767px
- **Mobile adaptations:** h-scroll disabled, ASCII scaled down, cursor disabled, all GSAP animations kept
- **Navigation:** Hamburger → full-screen overlay (Tiwis-style)
