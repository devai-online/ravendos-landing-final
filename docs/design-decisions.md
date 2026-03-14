# RavenDOS Landing — Design Decisions Log

## Status: Implementation — Visual Polish & Review

---

## 1. Overall Direction & Mood
**Status: LOCKED**

- **Reference site:** Tiwis.fr — match animation language, interaction patterns, layout philosophy (NOT color scheme)
- **Mood:** Premium, minimal, editorial, brutalist-tech
- **Personality:** Quiet intensity with a technical edge — "DOS" in the name reflected through ASCII art aesthetics
- **Emotional tone:** Clean precision with warmth from accent color. Light, airy, distinctive.

---

## 2. Color Palette
**Status: LOCKED**

| Role | Value | Notes |
|------|-------|-------|
| Primary Background | `#F5F5F5` | Light grey |
| Primary Text | `#000000` or near-black | Dark text on light background |
| Accent | `#FF7C48` | Warm orange, from logo — decorative only |
| Secondary backgrounds | TBD | White (#FFF) or slightly darker greys for contrast sections |
| Text hierarchy colors | TBD | Muted greys for secondary text |

- Monochrome + single accent approach (inverted from original Tiwis-dark direction)
- **Accent is decorative only:** buttons (with white text inside), large highlights, hover states, logo element
- Accent NOT used for small text — #FF7C48 on #F5F5F5 is ~3.0:1 contrast (fails AA)
- Small body text: black/near-black only
- Logo: use light bg variant (`RavenDOS final-01.png`)

---

## 3. Animation & Interaction
**Status: LOCKED**

### Core animations (all from Tiwis, replicate exactly):
- Split-text line reveals (GSAP SplitText, lines slide up from y:140% with stagger 0.05s, power3.out)
- Clip-path image reveals (inset 30% → 0%)
- SVG stroke drawing (strokeDashoffset animation, 1.5s)
- Horizontal scroll section (pinned, scrub-based)
- Marquee text (continuous CSS animation, ~12s loop)
- Navigation: adaptive color, hide/reveal on scroll, glassmorphic blur dropdowns

### Animated visual elements (replacing WebGL/Unicorn Studio):
- ASCII-art Canvas 2D animations using box-drawing characters (░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯)
- **AnimatedSphere** — rotating sphere, used as section decorative element
- **AnimatedTetrahedron** — rotating tetrahedron with filled faces, used as section decorative element
- Black characters on transparent canvas (works on light grey background)
- Source files: `assets/animations/animated-sphere.tsx`, `assets/animations/animated-tetrahedron.tsx`
- Placement TBD per section layout decisions

### Custom cursor:
- Yes, simpler than Tiwis
- Exact behavior TBD

### Tech stack for animations:
- GSAP (ScrollTrigger, SplitText)
- Lenis (smooth scroll)
- Canvas 2D for ASCII art shapes (no WebGL dependency)

---

## 4. Content Density
**Status: LOCKED**

- Sparse, Tiwis-level
- Big display headings, short body copy (1-2 lines max), CTAs
- No dense information sections
- Let design and animation carry the weight

---

## 5. Typography
**Status: LOCKED**

### Font System (3-tier hierarchy):

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Hero/Tagline | Syncopate Bold | 700 | Hero heading, "Intelligence, Architected", RavenDOS name callouts only |
| Section Headings | Syne | Bold (700) / ExtraBold (800) | Section titles, card headings, sub-headings |
| Body/UI | Outfit | Regular (400) | Body text, nav links, buttons, captions, labels |

### Type Treatment Rules:
- **Syncopate:** Unicase (all-caps by nature), used sparingly — hero and brand callouts only
- **Syne headings:** UPPERCASE, normal/default letter-spacing (let Syne be itself)
- **Syne vs Syncopate contrast:** Syne gets presence through size, Syncopate through its architectural character
- **Body text:** Outfit Regular 400, black/near-black on light grey — prioritize readability
- **Type sizing:** Viewport-relative units (vw) for fluid scaling, matching Tiwis approach
- **Secondary/muted text:** TBD (likely muted greys)

---

## 6. Section Structure & Layout
**Status: LOCKED**

### Scroll Journey (8 sections):

| # | Section | Content | Key Animation |
|---|---------|---------|---------------|
| 1 | **Hero** | "Intelligence, Architected" (Syncopate Bold) + prominent RavenDOS logo + ASCII sphere | Split-text reveal, sphere rotates continuously |
| 2 | **Capabilities** | 4 horizontal scroll cards: AI/ML, DevOps & Infrastructure, Network & Security, App Development. Gradient text cutout on headings. | Pinned horizontal scroll with snap points |
| 3 | **Work Transition** | White card wipe with "OUR WORK" heading + accent tetrahedron | Tiwis-style wipe: slide up → reveal → hold → exit up. Snap to [0, 0.45, 1] |
| 4 | **Products** | IntiGrade + DiagnosticWale (combined section, separate headings) | Scroll-triggered reveals |
| 5 | **Marquee strip** | Repeating brand/capability words | Continuous CSS horizontal scroll (~12s loop) |
| 6 | **Founders** | Team headshots + names + roles. Minimal — no bios. | Clip-path photo reveals |
| 7 | **Philosophy** | Short statement about being product-driven + ASCII tetrahedron | Split-text reveal |
| 8 | **Footer** | "Let's talk" CTA + large logo + nav + email + copyright | GSAP scroll-reveal |

### Capabilities Section (Horizontal Scroll):
- Page pins, 4 white cards scroll horizontally: AI/ML → DevOps & Infrastructure → Network & Security → App Development
- **Gradient text cutout:** Desktop card headings show live WebGL gradient through letters. OGL canvas (`preserveDrawingBuffer: true`, `.gradient-canvas` class) captured at ~6fps → dataURL → `background-clip: text` + `color: transparent` (`.text-gradient-cutout` CSS class). Viewport-aligned positioning.
- Text container `max-w-[85%]` to prevent heading overflow
- Snap points at intro + each card center + end. `delay: 0.1`, `duration: {min: 0.3, max: 0.8}`, `ease: "power1.inOut"`. Reduced intro buffer from 0.5vh to 0.3vh.
- Mobile: border-separated list with accent counters, "WHAT WE DO" heading (no h-scroll, no gradient cutout)

### Work Transition Section:
- **NEW** — Tiwis-style wipe animation between Capabilities and Products
- White card with `rounded-t-[2rem]` slides up from below viewport
- "OUR WORK" in huge Syne ExtraBold, centered
- Accent-colored (#FF7C48) animated tetrahedron behind heading at 30% opacity
- 4-phase GSAP ScrollTrigger: enter → heading reveal → hold → exit up (2x viewport distance)
- `z-30` to layer above capabilities
- Snap to [0, 0.45, 1] with `delay: 0.1`, `duration: {min: 0.3, max: 0.8}`, `ease: "power1.inOut"`

### Products Section (Combined):
- Now includes both "Our Products" (IntiGrade) and "Client Work" (DiagnosticWale) under separate headings in one section
- **IntiGrade:** Product name + description + "Visit IntiGrade →" link button
- **DiagnosticWale:** Product name + description + "Visit DiagnosticWale →" link button
- `clients.tsx` no longer used in page.tsx

### Founders Section:
- Minimal: headshot photos + name + role only
- No bios, no descriptions
- Photo layout TBD (grid or row)
- Clip-path reveals on headshot photos

### Hero Section:
- **Layout:** Tiwis-style — massive "RAVENDOS" bottom-left (Syncopate Bold, ~11.5vw), "DOS" in accent color (#FF7C48)
- **No logo** in hero (removed — too small to be visible at that scale)
- **Tagline:** "Intelligence, Architected." in Syne Bold, right side on desktop, above heading on mobile
- ASCII sphere as decorative element (Canvas 2D, rotates continuously, 85vmin, opacity 0.30)
- No subtitle text

### Navigation:
- **Updated:** Floating centered links (About, Products, Contact), no logo in nav
- Black pill "Contact us" button with arrow on right side
- Hamburger only on mobile (right-aligned)

### Philosophy Section:
- Short manifesto/statement about being product-driven
- ASCII tetrahedron as decorative element
- Split-text reveal animation

---

## 7. Component Details
**Status: LOCKED**

### Navigation:
- **Links:** About, Products, Contact (anchor links to sections)
- **Logo:** Left-aligned, prominent (light bg variant)
- **Behavior:** Hides on scroll down, reveals on scroll up
- **Background:** Glassmorphic blur (backdrop-filter: blur)
- **No dropdowns** — flat single-level nav
- **Mobile:** Hamburger menu → full-screen overlay (Tiwis-style)

### Buttons (Tiwis-style text buttons):
- **Style:** No fill, no border — text + arrow (→) only
- **Hover animation:** Tiwis-style vertical text swap — current text slides down/out, duplicate slides up/in from below. Arrow animates (left arrow scales in, right arrow scales out). Duration ~0.35s cubic-bezier.
- **Background:** Subtle semi-transparent pill (`rgba(0,0,0,0.05)` on light bg)
- **Used for:** Product link buttons, nav CTA, contact CTA

### Contact Section:
- **Form style:** Tiwis-style underline-only inputs
- **Input fields:** No background, no border — just a bottom underline (semi-transparent)
- **Focus state:** Active underline scales in from left to right (0.3s ease), placeholder fades in
- **Submit button:** Circular with rotating conic-gradient halo. On hover: halo scales up, text slides out vertically, icon slides in.
- **Default fields (TBD — owner will specify later):** Name, Email, Company/Organization, Message
- **Success/error states:** Inline messages below form
- **No Calendly integration** (unless requested later)

### Links:
- Text links in body: black, on hover shift to `#FF7C48` or underline animation
- Nav links: Outfit Regular, standard weight

---

## 8. Copy & Tone of Voice
**Status: LOCKED**

### Tone:
- **Confident & declarative** — bold statements, not explanations
- **First person plural** — "We" (warm, team-oriented)
- Short, punchy lines. No filler.

### Section Copy:

**Hero:**
> Intelligence, Architected.
(No subtitle, no body text)

**Capabilities slides:**
1. AI / MACHINE LEARNING — "Intelligent systems, from model training to production deployment."
2. DEVOPS & INFRASTRUCTURE — "CI/CD pipelines, cloud architecture, and automated infrastructure."
3. NETWORK & SECURITY — (network and security services)
4. APP DEVELOPMENT — "End-to-end mobile and web applications built for scale."

**Products slides:**
1. INTIGRADE — "AI-powered exam evaluation. Teachers upload, our AI grades." → "Visit IntiGrade →"
2. DIAGNOSTICWALE — "India's trusted diagnostic platform. Connecting patients with labs." → "Visit DiagnosticWale →"

**Marquee:**
> INTELLIGENCE, ARCHITECTED — (repeating)

**Founders section heading:**
> FOUNDERS

**Philosophy:**
> We design systems that think. We architect platforms that scale. We build what we believe the world needs — then we prove it.

**Contact heading:**
> SAY HELLO

---

## 9. Responsive & Mobile
**Status: LOCKED**

### Breakpoints:
- Desktop: ≥992px (full experience)
- Tablet: 768–991px
- Mobile: ≤767px

### Mobile adaptations:
- **Horizontal scroll sections:** Disabled — capabilities and products revert to vertical stacked layouts with individual scroll-triggered reveals
- **ASCII art animations:** Keep but scale down canvas size
- **Custom cursor:** Disabled (touch devices have no cursor)
- **Scroll animations:** Keep all (split-text, clip-path, SVG strokes) — modern phones handle GSAP fine
- **Navigation:** Hamburger → full-screen overlay (Tiwis-style)
- **Typography:** Still viewport-relative but with min/max clamps for readability
- **Marquee:** Stays, works natively on mobile

---

## 10. Visual Elements (Icons, Graphics)
**Status: LOCKED**

### Custom Cursor (Desktop only):
- **Style:** Arrowhead Rounded Outline — white fill, black stroke
- **CSS:** `cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="%23FFF" stroke="%23000" stroke-width="2" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path></svg>'), auto;`
- **Disabled on:** Mobile/touch devices
- **Size:** 48x48px SVG

### Icons:
- **No icons for capability slides** — typography-only treatment
- Minimal icons may be used for footer social links (if needed)

### SVG Decorative Lines:
- **Yes** — SVG stroke-draw lines as section dividers/connectors between sections
- Animate via strokeDashoffset on scroll (matching Tiwis pattern)
- Thin, black strokes on light grey background
- Triggered by IntersectionObserver / ScrollTrigger

### Background Texture:
- **Grain/noise texture overlay** on the `#F5F5F5` background
- Minimal yet noticeable — subtle film grain effect
- **Implementation:** BackgroundTexture React component with two fixed DOM divs (Tailwind v4 suppresses body pseudo-elements)
  - Dot grid: radial-gradient, rgba(0,0,0,0.03), 24px spacing
  - Noise grain: real 256x256 PNG tile (alpha=40 per pixel), overlay div at opacity 0.18
- Applied globally via layout.tsx
- Note: SVG feTurbulence does NOT work as CSS background-image data URI

### ASCII Art Shapes:
- **AnimatedSphere** — Hero section (decorative, rotates continuously)
- **AnimatedTetrahedron** — Philosophy section (white, decorative, rotates continuously) + Work Transition section (accent #FF7C48, 30% opacity)
- `color` prop: `"white"` (default) | `"accent"` (#FF7C48)
- White characters on transparent canvas (dark theme)
- Scaled down on mobile
