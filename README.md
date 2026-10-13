# Wanderlust Travels

A responsive, single-page travel agency website built with **React + Vite + plain CSS**.
Visitors can discover destinations, filter travel packages by budget, browse a photo
gallery with a lightbox, and fill in a validated booking form.

> This is a frontend demo. No real bookings, payments or emails are ever made.

## Setup

```bash
npm install
npm install lucide-react
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run build`   | Production build into `dist/`       |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | Lint the code with oxlint           |

## Folder structure

```
index.html                 Fonts, meta tags, favicon
public/favicon.svg
src/
  main.jsx                 React entry point
  App.jsx                  Page layout + shared booking "preset" state
  index.css                Design tokens, base styles, buttons
  components/
    Navbar.jsx/.css        Sticky nav, mobile menu, active-section highlight
    BrandMark.jsx/.css     Compass logo badge
    Hero.jsx/.css          Full-screen hero with highlight card
    SectionHeading.jsx/.css
    SmartImage.jsx/.css    Image with loading shimmer + fallback
    Modal.jsx/.css         Accessible <dialog> wrapper
    Destinations.jsx/.css  Grid + details dialog
    DestinationCard.jsx
    DestinationDetails.jsx
    Packages.jsx/.css      Budget filter + package cards
    BudgetFilter.jsx
    PackageCard.jsx
    Gallery.jsx/.css       Asymmetric grid + lightbox
    Lightbox.jsx
    Booking.jsx/.css       Booking section layout
    BookingForm.jsx        Form state + validation
    FormField.jsx          Label / hint / error wrapper
    BookingConfirmation.jsx
    Footer.jsx/.css
  data/                    destinations, packages, gallery photos, site links
  hooks/                   useActiveSection, useScrolled
  lib/                     formatting, dates, validation, image URLs, scrolling
```

## Design brief

- **User:** Indian travellers aged 25–45 planning a holiday, from first-time
  budget trips to once-a-year splurges.
- **Problem:** Travel sites feel either like cluttered marketplaces or generic
  templates. People want inspiration first, then a clear price and an easy way
  to start planning.
- **Tone:** A calm, premium travel magazine: editorial photography, generous
  whitespace, warm paper tones, confident serif headlines.
- **References:** Condé Nast Traveller editorial layouts, Kinfolk-style
  restraint, boutique hotel websites.

## Design decisions

- **Palette:** deep forest green (primary), muted teal (secondary details), warm
  cream backgrounds and a single terracotta accent for calls to action. All
  colors are CSS variables in `src/index.css`; components never use raw hex
  values. Text colors meet WCAG AA contrast on their backgrounds.
- **Type:** *Fraunces* (display serif) for headings and *Manrope* (sans-serif)
  for body text, on a fixed six-step type scale.
- **Spacing and shape:** a 4px/8px spacing scale, three corner radii, and three
  shadow levels used consistently everywhere.
- **Motion:** 150–220ms transitions with one shared easing curve, used only for
  hover/focus feedback and content appearing. Everything is turned off when
  the visitor prefers reduced motion.
- **Editorial cards:** destination cards use tall 4:5 photos, a small category
  tag, and an offset middle column on desktop for a magazine rhythm.
- **Connected flows:** "Choose Package" and "Plan a trip to …" prefill the
  booking form, scroll to it and move keyboard focus there.
- **Accessibility:** semantic landmarks, skip link, native `<dialog>` for
  modals (focus trap and Escape for free), radio-button budget filter, inline
  errors linked with `aria-describedby`, 44px minimum touch targets.
- **Images:** photos are loaded from Unsplash. Every image shows a shimmer while
  loading and a labelled placeholder if it fails, so the layout never breaks.

## Testing checklist

**Responsiveness**
- [ ] 360px wide: no horizontal scrolling; hamburger menu opens and closes.
- [ ] 768px: destinations in 2 columns, gallery in 4 columns, form in 2 columns.
- [ ] 1280px+: full navbar, 3-column destinations, booking intro sticks beside the form.

**Functionality**
- [ ] Nav links smooth-scroll to each section; the active link updates while scrolling.
- [ ] "Explore" on a destination opens its details; Escape, the X button and the backdrop close it.
- [ ] "Plan a trip to …" and "Choose Package" prefill the booking form.
- [ ] Budget chips filter the packages and update the "Showing N packages" count.
- [ ] Clicking a gallery photo opens the lightbox; arrow keys and buttons move between photos.
- [ ] Submitting an empty form shows inline errors and focuses the first invalid field.
- [ ] Past departure dates are blocked; a return date before departure shows an error.
- [ ] A valid form shows a loading state, then the trip summary with the demo notice.
- [ ] "Plan another trip" resets the form.
- [ ] Turn on "reduce motion" in your OS: animations and smooth scrolling stop.
