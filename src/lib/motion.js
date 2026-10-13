// Mirrors --ease-brand and the --duration-* tokens in index.css so GSAP,
// Framer Motion and CSS transitions all share one easing curve.
export const EASE_BRAND = [0.22, 1, 0.36, 1];

// Seconds. UI feedback stays within 150-250ms; only the hero and
// scroll-driven sequences may run longer.
export const DURATION = {
  base: 0.22,
};

export const UI_TRANSITION = { duration: DURATION.base, ease: EASE_BRAND };
