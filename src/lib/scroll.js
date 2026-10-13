// Uses the CSS `scroll-behavior` on <html>, so smooth scrolling is
// automatically turned off for people who prefer reduced motion.
export function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
}
