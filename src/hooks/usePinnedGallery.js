import { useLayoutEffect, useRef, useState } from 'react';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Turns vertical scrolling through a tall section into a horizontal
// slide of the track. The section is as tall as one sticky viewport
// plus the distance the track actually overflows, measured from the DOM,
// so card widths can change without a hardcoded scroll length.
//
// The active card is whichever slide sits closest to the viewport center.
// React state updates only when that index changes. The slide position
// itself is a CSS variable written once per frame, so scrolling does not
// re-render the page.
export function usePinnedGallery(isPinned, scrollToY) {
  const pinRef = useRef(null);
  const stickyRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!isPinned || !pin || !sticky || !viewport || !track) return undefined;

    const activeIndexRef = { current: 0 };
    const travelRef = { current: 0 };
    let frameId = 0;

    function measure() {
      // Pad the track so the first card starts centered and the last card
      // can scroll until it is centered too. Padding is measured, not guessed.
      const card = track.querySelector('[data-gallery-slide]');
      const cardWidth = card?.offsetWidth ?? 0;
      const pad = Math.max(0, Math.round((viewport.clientWidth - cardWidth) / 2));
      const padValue = `${pad}px`;
      if (track.style.paddingInline !== padValue) track.style.paddingInline = padValue;

      const travel = Math.max(0, Math.round(track.scrollWidth - viewport.clientWidth));
      travelRef.current = travel;
      const nextHeight = `${sticky.offsetHeight + travel}px`;
      if (pin.style.height !== nextHeight) pin.style.height = nextHeight;
    }

    function update() {
      frameId = 0;
      const travel = travelRef.current;
      const stickyHeight = sticky.offsetHeight;
      const start = pin.getBoundingClientRect().top + window.scrollY;
      const maxScroll = Math.max(1, pin.offsetHeight - stickyHeight);
      const progress = clamp((window.scrollY - start) / maxScroll, 0, 1);

      viewport.style.setProperty('--gallery-x', `${Math.round(-progress * travel)}px`);

      const viewportRect = viewport.getBoundingClientRect();
      const center = viewportRect.left + viewportRect.width / 2;
      const slides = track.querySelectorAll('[data-gallery-slide]');
      let closest = 0;
      let bestDistance = Infinity;

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          closest = index;
        }
      });

      if (closest !== activeIndexRef.current) {
        activeIndexRef.current = closest;
        setActiveIndex(closest);
      }
    }

    function requestUpdate() {
      if (frameId) return;
      frameId = requestAnimationFrame(update);
    }

    // Tabbing to a card that has slid off screen moves the page so that
    // card's layout position lands in the viewport.
    function handleFocusIn(event) {
      const slide = event.target.closest?.('[data-gallery-slide]');
      if (!slide || !track.contains(slide)) return;

      const travel = travelRef.current;
      const maxScroll = pin.offsetHeight - sticky.offsetHeight;
      if (travel <= 0 || maxScroll <= 0) return;

      const offset = slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2;
      const progress = clamp(offset / travel, 0, 1);
      const top = pin.getBoundingClientRect().top + window.scrollY + progress * maxScroll;
      scrollToY(top);
    }

    measure();
    update();

    const observer = new ResizeObserver(() => {
      measure();
      requestUpdate();
    });
    observer.observe(viewport);
    observer.observe(track);

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    track.addEventListener('focusin', handleFocusIn);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      track.removeEventListener('focusin', handleFocusIn);
      pin.style.height = '';
      track.style.paddingInline = '';
      viewport.style.removeProperty('--gallery-x');
    };
  }, [isPinned, scrollToY]);

  return { pinRef, stickyRef, viewportRef, trackRef, activeIndex };
}
