import { useEffect, useState } from 'react';

// Tracks whether the page is at the very top, and whether a bar should hide:
// hidden while scrolling down past `hideAfterPx`, shown again on any scroll up.
// `tolerancePx` ignores tiny jitters so the bar doesn't flicker.
export function useHideOnScroll({ topThresholdPx, hideAfterPx, tolerancePx }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function update() {
      const y = window.scrollY;
      setIsAtTop(y <= topThresholdPx);
      const delta = y - lastY;
      if (Math.abs(delta) < tolerancePx) return;
      setIsHidden(delta > 0 && y > hideAfterPx);
      lastY = y;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [topThresholdPx, hideAfterPx, tolerancePx]);

  return { isAtTop, isHidden };
}
