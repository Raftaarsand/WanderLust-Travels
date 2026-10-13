# Wanderlust Travels

A cinematic, single-page travel website: destination cards, trip packages filtered by
budget, a photo gallery and a booking form with date selection. Built to feel like a
printed travel magazine that has learned to move.

> This is a frontend demo. No real bookings, payments or emails are ever made.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Command           | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run build`   | Production build into `dist/`      |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Lint the code with oxlint          |

## Stack

- **React 19 + Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`), all tokens in `src/index.css` under `@theme`
- **shadcn/ui** (JavaScript, `components.json`) on **Radix** primitives, **Lucide** icons
- **GSAP + ScrollTrigger** for scroll-driven and pointer-driven animation
- **Lenis** smooth scrolling, driven by the GSAP ticker
- **Framer Motion** for component state and layout transitions
- Self-hosted variable fonts via **Fontsource** (Fraunces, Manrope)

## Folder structure

```
src/
  main.jsx                     Entry: fonts + global CSS
  App.jsx                      MotionConfig, smooth scroll provider, page sections
  index.css                    Design tokens (@theme), base styles, utilities
  styles/legacy.css            Temporary aliases for sections not yet rebuilt
  components/
    ui/button.jsx              shadcn Button with project variants
    providers/SmoothScrollProvider.jsx
    cursor/                    CustomCursor, CursorRipple
    navbar/                    Navbar, DesktopNav, MobileMenu, BrandLink
    …                          Section components (rebuilt phase by phase)
  hooks/                       useCustomCursor, useHideOnScroll, useMediaQuery,
                               useSmoothScroll, useActiveSection
  lib/                         gsap setup, motion constants, media queries, focus, utils
  data/                        Destinations, packages, gallery, site links (mock data)
```

## Design brief

- **User:** Indian travellers aged 25–45 planning a holiday, from a first ₹9,000
  Himalayan weekend to a once-a-year overwater villa.
- **Problem:** Travel sites are either cluttered marketplaces or forgettable templates.
  People want to be inspired first, then see an honest price and an easy way to book.
- **Tone:** Editorial and cinematic. Full-bleed photography, confident serif
  headlines, warm paper tones, and motion that feels like turning a page.
- **References:** Condé Nast Traveller layouts, Aesop and Kinfolk restraint, and
  Awwwards travel and hospitality sites for scroll choreography.

## Design decisions

- **Palette:** deep forest green (primary), warm paper and ink neutrals, and a single
  terracotta accent reserved for calls to action. Text pairs meet WCAG AA.
- **Type:** Fraunces (display serif, optical sizes) with Manrope (body sans) on a six-step scale.
- **Shape:** three radii (`sm`, `md`, `lg`) plus pills, three shadow levels, 4px spacing grid.
- **One easing curve** (`cubic-bezier(0.22, 1, 0.36, 1)`) shared by CSS (`ease-brand`),
  GSAP (`"brand"` CustomEase) and Framer Motion (`EASE_BRAND`). UI feedback runs
  150–220ms; only the hero and scroll sequences use longer, cinematic durations.
- **Animation ownership:** GSAP owns scroll and pointer-driven transforms, Framer Motion
  owns component state. No element is animated by both: where both are needed, GSAP
  moves a wrapper and Framer Motion animates its child.
- **Smooth scroll:** Lenis runs on the GSAP ticker and feeds `ScrollTrigger.update`, so
  scroll animations never drift. In-page links scroll through Lenis, respect each
  section's `scroll-margin-top`, and move keyboard focus to the destination.
- **Custom cursor:** a dot that tracks the pointer exactly and a ring that follows with
  frame-rate-independent lerp. `data-cursor="View"` (or any word) swaps the ring for a
  labelled disc; clicks squeeze the ring and leave an ink ripple. The ring uses
  `mix-blend-mode: difference`; labels sit on an unblended layer so they stay legible.
  Text fields keep the native caret.
- **Navbar:** transparent over the hero, solid once scrolled; hides on scroll down and
  returns on scroll up, and always shows while it holds keyboard focus. The mobile menu
  is a Radix Dialog (focus trap, Esc, focus return) and pauses Lenis while open.
- **Reduced motion:** Lenis and the custom cursor are switched off entirely, Framer Motion
  drops transform animations (`MotionConfig reducedMotion="user"`), and CSS transitions
  are near-instant.
- **Touch devices:** the custom cursor only mounts for `(hover: hover) and (pointer: fine)`.
