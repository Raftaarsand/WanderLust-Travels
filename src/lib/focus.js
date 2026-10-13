// Moves keyboard focus to any element (e.g. a section after an in-page jump)
// without making it part of the normal Tab order.
export function focusWithoutScroll(element) {
  if (element.tabIndex < 0 && !element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.focus({ preventScroll: true });
}
