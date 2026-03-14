# RavenDOS Landing Website

## Project Overview
Landing website for RavenDOS — a product-driven technology studio that designs, develops, and launches its own intelligent platforms. Tagline: "Intelligence, Architected."

## Current Phase
**Implementation — Visual Polish & Review.** Multi-page site: homepage (8 sections + footer) and dedicated /contact page. Dark theme. Tiwis-inspired footer with large logo and CTA.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP 3.x (ScrollTrigger, SplitText) + Lenis smooth scroll + OGL (WebGL gradient bg)
- **Fonts:** Syncopate (700), Syne (700, 800), Outfit (400) via `next/font/google`
- **Form:** React Hook Form + placeholder API route
- **Gradient text cutout:** OGL canvas captured at ~6fps → dataURL → CSS `background-clip: text` on capability card headings

## Key References
- **Primary design reference:** [Tiwis.fr](https://www.tiwis.fr/en) — match animation language & interaction patterns (dark theme)
- **Logo files:** `public/images/logo-light.png` (light bg variant, used in site)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, Navbar, LenisProvider, GradientBackground
│   ├── page.tsx                # Homepage: 8 sections + Footer
│   ├── globals.css             # Tailwind @theme, custom cursor, keyframes, reduced-motion, .text-gradient-cutout
│   ├── contact/
│   │   ├── page.tsx            # Contact page (server component, metadata)
│   │   └── contact-content.tsx # Contact page client content (form + animations)
│   └── api/contact/route.ts    # Placeholder POST handler
├── components/
│   ├── layout/
│   │   ├── navbar.tsx          # Floating centered links, contact pill → /contact, hide/reveal
│   │   ├── mobile-menu.tsx     # Full-screen hamburger overlay with Link routing
│   │   └── footer.tsx          # Tiwis-style: CTA + large logo + nav + copyright
│   ├── sections/
│   │   ├── hero.tsx            # Massive RAVENDOS (accent on DOS) + tagline + ASCII sphere
│   │   ├── capabilities.tsx    # "What We Do" intro + 4 cards (gradient cutout headings), pinned h-scroll
│   │   ├── work-transition.tsx # Tiwis-style white card wipe with "OUR WORK" heading + accent tetrahedron
│   │   ├── products.tsx        # Combined: IntiGrade product + DiagnosticWale client showcase
│   │   ├── clients.tsx         # [UNUSED] — merged into products.tsx
│   │   ├── marquee.tsx         # Continuous text strip
│   │   ├── founders.tsx        # Staggered headshots + names + roles
│   │   ├── philosophy.tsx      # Manifesto + parallax ASCII tetrahedron
│   │   └── contact.tsx         # [REPLACED] — form moved to /contact page
│   ├── ui/
│   │   ├── gradient-background.tsx  # WebGL animated mesh gradient (OGL, fixed, z-0, preserveDrawingBuffer)
│   │   ├── button.tsx          # Tiwis-style text+arrow with vertical swap
│   │   ├── split-text.tsx      # GSAP SplitText reveal wrapper
│   │   ├── clip-reveal.tsx     # Clip-path image reveal
│   │   ├── svg-line.tsx        # SVG decorative stroke-draw
│   │   └── contact-form.tsx    # Underline inputs + circular halo submit
│   └── canvas/
│       ├── animated-sphere.tsx
│       └── animated-tetrahedron.tsx  # Accepts color prop: "white" (default) | "accent" (#FF7C48)
├── hooks/
│   ├── use-media-query.ts
│   ├── use-scroll-direction.ts
│   └── use-is-touch.ts
├── lib/
│   ├── gsap-setup.ts           # Central GSAP plugin registration
│   ├── lenis-provider.tsx      # Lenis + GSAP ticker sync
│   ├── fonts.ts                # next/font/google exports
│   └── constants.ts            # Section IDs (incl. WORK), nav links, capabilities, founders, philosophy
└── types/index.ts
```

## Implementation Status

### Completed
- **Multi-page:** Homepage (8 sections + footer) and dedicated /contact page
- **Dark theme:** #0A0A0A bg, #FFF text, #FF7C48 accent. CSS variables cascade through site.
- **Navbar:** In layout.tsx (shared across pages), uses next/link for routing. Contact pill → /contact.
- **Footer (Tiwis-style):** CTA section ("An idea, a project? Let's talk."), large RavenDOS logo, nav links, email, copyright. `showCta` prop (false on /contact). GSAP scroll-reveal animations.
- **Contact page:** `/contact` — dedicated page with "SAY HELLO" heading, form, email alternative, footer (no CTA). Entry animations via GSAP.
- **Hero:** Tiwis-style massive RAVENDOS bottom-left. Mobile: smaller sphere (60vmin, 15% opacity), larger tagline text.
- **Capabilities:** Tiwis "Offers" pattern — 4 white cards (AI/ML, DevOps & Infrastructure, Network & Security, App Development) on dark bg. Gradient text cutout on desktop card headings (OGL canvas → dataURL → `background-clip: text`). Text container max-w-[85%]. Mobile: border-separated list with accent counters, "WHAT WE DO" heading. Snap points at intro + each card center + end.
- **Work Transition:** NEW — Tiwis-style white card wipe after Capabilities. `rounded-t-[2rem]` card slides up from below. "OUR WORK" in huge Syne ExtraBold, centered. Accent-colored (#FF7C48) tetrahedron behind heading at 30% opacity. 4-phase GSAP ScrollTrigger (enter → heading reveal → hold → exit up). z-30. Snap to [0, 0.45, 1].
- **Products + Clients combined:** `products.tsx` now shows both IntiGrade and DiagnosticWale under separate headings. `clients.tsx` no longer used in page.tsx.
- **Founders:** Stagger animation (GSAP fromTo with delay per card). Rounded image corners. Better mobile gap (16 vs 12).
- **Philosophy:** Parallax tetrahedron (GSAP scrollTrigger y:-60). Smaller on mobile (40vmin).
- **Tetrahedron color prop:** `animated-tetrahedron.tsx` accepts `color?: "white" | "accent"`. Default white. Accent renders #FF7C48.
- **ScrollTrigger snap:** Both Capabilities and WorkTransition have snap with `delay: 0.1`, `duration: {min: 0.3, max: 0.8}`, `ease: "power1.inOut"`.
- **Mobile menu:** Uses next/link for routing, responsive font size.
- GSAP + Lenis, animation primitives, marquee, custom cursor, reduced motion
- ASCII canvas components with IntersectionObserver
- Production build passing (both / and /contact routes)

## Known Issues & Lessons Learned

### Hydration Errors (React 19 / Next.js 16)
- `useGSAP` (uses useLayoutEffect) causes "insertBefore" hydration errors. **Fix:** use `useEffect` + `gsap.context()` in Hero.
- `ScrollTrigger pin: true` creates wrapper divs that conflict with React hydration. Avoid in components with dynamic imports.
- `useState` with changing dependency arrays across renders causes "useEffect changed size" errors in React 19.
- Dynamic imports with `ssr: false` need `loading` placeholder to reduce mismatches.

### Background Texture
- SVG `feTurbulence` does NOT work as CSS `background-image` data URI.
- Tailwind CSS v4 layered CSS suppresses `body::before/::after` pseudo-elements. **Fix:** use real DOM elements (BackgroundTexture component).
- Noise PNG at alpha=40 per pixel is WAY too visible. Current: alpha=40 PNG + overlay div at opacity 0.18.

### Section Transitions (Resolved)
- Hero → Capabilities gap was caused by GSAP `fromTo(scale: 0.6)` making capabilities invisible before pin.
- Multiple approaches failed: sticky+shrink (heading disappears, breaks on scroll-up), scale-up from bottom-right with `transformOrigin: "100% 100%"` (mathematically invisible until scale >0.5, doesn't open simultaneously), combining both (refresh mid-page breaks layout).
- Final fix: simplified to match actual Tiwis behavior — simple vertical scroll, hero 100vh with divider line, capabilities at full scale with pin + horizontal scroll. No fancy transforms.
- Key lesson: GSAP scrub `fromTo` applies "from" state before trigger start. Avoid transforms that make content invisible. Also: `transformOrigin: "100% 100%"` with an element entering from below means the visible portion only appears after significant scroll progress.

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
- Homepage: Hero → Capabilities (h-scroll) → WorkTransition (wipe) → Products (combined) → Marquee → Founders → Philosophy → Footer (CTA + logo)
- Contact page: /contact — dedicated form page with footer (no CTA)
- Nav: floating centered links, no logo, contact pill → /contact
- Hero: massive RAVENDOS bottom-left (Tiwis-style), tagline right side
- Footer: Tiwis-inspired — CTA heading, large logo, nav links, email, copyright

### Responsive
- Mobile: h-scroll disabled, ASCII scaled down, cursor disabled, all animations kept

## Workflow Rules
- Always update CLAUDE.md, docs, and memory when significant changes are made
- Always read all docs after context compaction to restore state
- Test builds frequently (`npx next build`)
- **NO INSTANT RESPONSES.** Analyze carefully, consider every detail, plan thoroughly before implementing. Do not one-shot complex changes. Think deeply, explore the reference, study the codebase, and work through problems step by step even if it takes longer.

## After Compaction Checklist
1. Read CLAUDE.md
2. Read docs/design-decisions.md
3. Read hero.tsx, capabilities.tsx, work-transition.tsx, products.tsx, footer.tsx, contact/page.tsx
4. Site is multi-page now: / (homepage) and /contact
