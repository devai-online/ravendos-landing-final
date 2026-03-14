# RavenDOS Landing Website — Implementation Plan

## Context
All design decisions are locked (see `docs/design-decisions.md`). This plan covers the full build of the RavenDOS landing website — a single-page site with Tiwis-style animations, two horizontal scroll sections, ASCII art decorative elements, and a contact form.

## Tech Stack
- **Framework:** Next.js 15+ (App Router, TypeScript) — the existing TSX animation files use React with "use client", making Next.js the natural choice
- **Styling:** Tailwind CSS v4 + CSS Modules for complex keyframe animations
- **Animations:** GSAP 3.x (ScrollTrigger, SplitText) + Lenis (smooth scroll)
- **Fonts:** Syncopate (700), Syne (700, 800), Outfit (400) via `next/font/google`
- **Form:** React Hook Form + placeholder API route (no backend yet — UI only, backend wired later)
- **Deployment:** Vercel

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, LenisProvider, grain overlay
│   ├── page.tsx                # Composes all 7 sections in order
│   ├── globals.css             # Tailwind @theme, custom cursor, marquee keyframes, grain
│   └── api/contact/route.ts    # POST handler for contact form
├── components/
│   ├── layout/
│   │   ├── navbar.tsx          # Hide/reveal nav, glassmorphic blur
│   │   └── mobile-menu.tsx     # Full-screen hamburger overlay
│   ├── sections/
│   │   ├── hero.tsx            # Tagline + logo + ASCII sphere
│   │   ├── capabilities.tsx    # Horizontal scroll (4 slides)
│   │   ├── products.tsx        # Horizontal scroll (2 slides)
│   │   ├── marquee.tsx         # Continuous text strip
│   │   ├── founders.tsx        # Headshots + names + roles
│   │   ├── philosophy.tsx      # Manifesto + ASCII tetrahedron
│   │   └── contact.tsx         # Form + footer
│   ├── ui/
│   │   ├── button.tsx          # Tiwis-style text+arrow with vertical swap
│   │   ├── split-text.tsx      # Reusable GSAP SplitText reveal wrapper
│   │   ├── clip-reveal.tsx     # Reusable clip-path image reveal
│   │   ├── svg-line.tsx        # SVG decorative stroke-draw
│   │   └── contact-form.tsx    # Underline inputs + circular halo submit
│   └── canvas/
│       ├── animated-sphere.tsx
│       └── animated-tetrahedron.tsx
├── hooks/
│   ├── use-gsap.ts             # GSAP plugin re-export with registration
│   ├── use-media-query.ts      # Responsive breakpoint detection
│   ├── use-scroll-direction.ts # For nav hide/reveal
│   └── use-is-touch.ts         # Touch device detection
├── lib/
│   ├── gsap-setup.ts           # Central GSAP plugin registration + defaults
│   ├── lenis-provider.tsx      # Lenis + GSAP ticker sync context
│   ├── fonts.ts                # next/font/google exports
│   └── constants.ts            # Colors, breakpoints, animation timings, section IDs
└── types/index.ts
```

## Implementation Phases

### Phase 0: Project Scaffolding
**Goal:** Bootable Next.js app with all deps, fonts, and global styles.

1. Scaffold Next.js project with TypeScript, Tailwind, ESLint, App Router, src directory
2. Install deps: `gsap`, `@gsap/react`, `lenis`, `react-hook-form`
3. Create `src/lib/fonts.ts` — configure Syncopate/Syne/Outfit via `next/font/google`
4. Create `src/app/globals.css` — Tailwind v4 `@theme` with design tokens:
   - Colors: `--color-bg: #F5F5F5`, `--color-text: #000`, `--color-accent: #FF7C48`
   - Font variables: `--font-hero`, `--font-heading`, `--font-body`
   - Grain noise overlay via `body::after` (fixed, pointer-events: none, tiling noise PNG, opacity ~0.04)
   - Custom cursor via `@media (pointer: fine)` — the arrowhead SVG data URI
   - Marquee keyframe animation
5. Create `src/app/layout.tsx` — apply font variables to `<html>`, wrap in LenisProvider
6. Create `src/lib/constants.ts` — section IDs, breakpoints, animation timing defaults
7. Copy logos to `public/images/`, copy ASCII animations to `src/components/canvas/`
8. Generate or source 128x128 tiling noise PNG for grain texture

### Phase 1: Animation Infrastructure
**Goal:** GSAP + Lenis wired, reusable animation primitives ready.

1. **`src/lib/gsap-setup.ts`** — Register ScrollTrigger + SplitText, set global defaults (ease: power3.out, duration: 1.2)
2. **`src/lib/lenis-provider.tsx`** — Lenis instance synced to GSAP ticker:
   - `lenis.on('scroll', ScrollTrigger.update)`
   - `gsap.ticker.add((time) => lenis.raf(time * 1000))`
   - `gsap.ticker.lagSmoothing(0)` (critical for sync)
3. **`src/components/ui/split-text.tsx`** — Reusable wrapper:
   - Props: children, tag (h1/h2/p), className
   - SplitText type: "lines", linesClass with overflow-hidden
   - ScrollTrigger: lines from y:140% opacity:0 → y:0% opacity:1, stagger 0.05
4. **`src/components/ui/clip-reveal.tsx`** — Wraps children (Image):
   - ScrollTrigger scrub: clipPath inset(30%) → inset(0%)
5. **`src/components/ui/svg-line.tsx`** — SVG path with stroke-draw:
   - Calculates getTotalLength(), animates strokeDashoffset → 0 on scroll
6. **Custom hooks:** `use-media-query.ts`, `use-scroll-direction.ts`, `use-is-touch.ts`

### Phase 2: Layout Shell + Navigation
**Goal:** Page structure, nav, mobile menu working.

1. **`src/app/page.tsx`** — Import and compose all 7 section components in order
2. **`src/components/layout/navbar.tsx`** — Fixed position, z-50:
   - Logo left (next/image), links right (About, Products, Contact anchors)
   - `useScrollDirection` → translateY(-100%) on down, translateY(0) on up
   - Glassmorphic: bg-white/70 backdrop-blur-md
   - Below 992px: hide links, show hamburger
3. **`src/components/layout/mobile-menu.tsx`** — Full-screen overlay:
   - Fixed inset-0, z-100, bg-[#F5F5F5]
   - GSAP timeline: links with staggered SplitText reveals on open
   - Locks Lenis scroll while open
4. Create placeholder `<section>` wrappers for all 7 sections with correct IDs

### Phase 3: Hero + Marquee
**Goal:** First visual sections complete.

1. **Hero section:**
   - Full viewport height (min-h-svh)
   - RavenDOS logo (next/image, ~200px desktop, ~120px mobile), centered
   - "Intelligence, Architected." in Syncopate Bold, wrapped in `<SplitText>`
   - Font size: clamp(2rem, 5vw, 5rem)
   - `<AnimatedSphere>` positioned behind text (absolute, reduced opacity ~0.15-0.2)
   - Z-layering: sphere z-0, text z-10
   - Mobile: sphere scaled down

2. **Marquee section:**
   - "INTELLIGENCE, ARCHITECTED — " repeated 8-10x in flex row
   - Two identical rows for seamless CSS loop (marquee-scroll 12s linear infinite)
   - Syne ExtraBold, UPPERCASE, large (text-6xl desktop, text-3xl mobile)
   - `<SvgLine>` decorative element above/below

### Phase 4: Horizontal Scroll Sections (HIGHEST RISK)
**Goal:** Capabilities and Products with pinned horizontal scrolling.

1. **`src/components/ui/button.tsx`** — Tiwis-style button:
   - Pill container with bg-black/5
   - Two stacked text spans (visible + hidden below)
   - Arrow icons (right visible, left hidden)
   - Hover: 0.35s cubic-bezier — text swaps vertically, arrows swap
   - Renders as `<a>` for external links

2. **`src/components/sections/capabilities.tsx`** — H-scroll #1:
   - **Desktop (≥992px):**
     - Outer section height: 100vh * (slides + 1) for scroll distance
     - ScrollTrigger pin: true, scrub: 1
     - Timeline Phase 1 (0→0.3): scale(0) + x:50vw → scale(1) + x:0 (scale-up entry)
     - Timeline Phase 2 (0.3→1): track translates horizontally
     - 4 slides, each 100vw: heading (Syne Bold UPPERCASE) + body (Outfit)
     - Per-slide SplitText with containerAnimation
   - **Mobile (<992px):**
     - Vertical stack, individual ScrollTrigger per capability
     - No scale-up entry

3. **`src/components/sections/products.tsx`** — H-scroll #2:
   - Same pinning pattern as capabilities, 2 slides
   - Each slide: product name + description + screenshot (ClipReveal wrapping Image) + Button link
   - Clip-path reveals triggered within containerAnimation context
   - Mobile: vertical stack

4. **Technical notes:**
   - Two consecutive pinned sections require careful ScrollTrigger.refresh() after both created
   - ScrollTrigger.sort() to ensure correct ordering
   - Test transition between Capabilities unpin → Products pin extensively

### Phase 5: Founders + Philosophy
**Goal:** Simpler sections using established primitives.

1. **Founders:** "FOUNDERS" heading (SplitText), grid of headshots with ClipReveal, name + role below each. 2-3 cols desktop, 1-2 mobile.
2. **Philosophy:** Statement text (SplitText), AnimatedTetrahedron behind text (same pattern as hero sphere), centered layout, full viewport height.

### Phase 6: Contact + Footer
**Goal:** Tiwis-style form with backend.

1. **Contact form:**
   - 4 fields: Name, Email, Company, Message (fields TBD by owner)
   - Underline-only inputs: border-b only, no bg
   - Focus: ::after pseudo-element scales from left (scaleX 0→1, 0.3s ease)
   - Circular submit with rotating conic-gradient halo (CSS @property animation)
   - Hover: halo scales 1.12x, text slides out, icon slides in
2. **API route:** `app/api/contact/route.ts` — placeholder that logs to console and returns success JSON. Backend (email service) wired up later.
3. **Footer:** Copyright, email, social links (minimal)

### Phase 7: Polish & Responsive
**Goal:** Production-ready.

1. Responsive audit at 375px, 390px, 768px, 1024px, 1440px, 1920px
2. `prefers-reduced-motion`: disable all GSAP animations, Lenis, marquee; keep content visible
3. Lazy-load ASCII canvas components with `dynamic(import, { ssr: false })`
4. Lighthouse audit: target 90+ Performance, 100 Accessibility
5. SEO metadata: title, description, Open Graph, structured data
6. Cross-browser: Chrome, Firefox, Safari (test backdrop-filter, clip-path, @property)
7. Canvas performance: pause animation loop when off-screen (IntersectionObserver)

## Critical Risks
| Risk | Mitigation |
|------|-----------|
| Two consecutive pinned h-scroll sections conflict | ScrollTrigger.refresh() + sort() after creation, extensive testing |
| Lenis + ScrollTrigger desync | lagSmoothing(0), Lenis scroll event → ScrollTrigger.update |
| SplitText inside horizontal scroll | Use containerAnimation parameter |
| Grain texture GPU perf | Small tile (128px), pointer-events:none, contain:strict |
| ASCII canvas mobile battery | IntersectionObserver pause, reduced point density |

## Verification
1. Scroll top-to-bottom verifying every animation triggers correctly
2. Test h-scroll pinning at various scroll speeds
3. Mobile: verify h-scroll disabled, hamburger works, cursor hidden
4. Chrome DevTools Performance: verify 60fps, no layout thrash
5. Form: test success/error paths, email delivery
6. Reduced motion: verify all content accessible without animation
7. Lighthouse: Performance ≥90, Accessibility = 100
