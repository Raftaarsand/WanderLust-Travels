import { useCallback, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { focusWithoutScroll } from '@/lib/focus';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { REDUCED_MOTION_QUERY } from '@/lib/mediaQueries';
import { SmoothScrollContext } from '@/lib/smoothScrollContext';
import RouteScroll from './RouteScroll';

// GSAP's own defaults, restored when Lenis stops driving the ticker.
const DEFAULT_LAG_THRESHOLD_MS = 500;
const DEFAULT_LAG_ADJUSTED_MS = 33;
const MS_PER_SECOND = 1000;

function resolveTarget(target) {
  return typeof target === 'string' ? document.getElementById(target) : target;
}

// Native <dialog>s scroll on their own instead of through Lenis.
function shouldPreventSmoothScroll(node) {
  return node.nodeName === 'DIALOG';
}

function isPlainLeftClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export default function SmoothScrollProvider({ children }) {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({ autoRaf: false, prevent: shouldPreventSmoothScroll });
    const tick = (timeInSeconds) => lenis.raf(timeInSeconds * MS_PER_SECOND);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(DEFAULT_LAG_THRESHOLD_MS, DEFAULT_LAG_ADJUSTED_MS);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Both paths respect each section's CSS scroll-margin-top.
  const scrollTo = useCallback((target, { immediate = false } = {}) => {
    const element = resolveTarget(target);
    if (!element) return;
    if (lenisRef.current) lenisRef.current.scrollTo(element, { immediate });
    else element.scrollIntoView({ block: 'start' });
  }, []);

  const scrollToY = useCallback((y) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y);
    else window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, []);

  // An in-page jump that also carries keyboard focus to the destination.
  const navigateTo = useCallback(
    (target) => {
      const element = resolveTarget(target);
      if (!element) return;
      scrollTo(element);
      focusWithoutScroll(element);
      if (element.id) window.history.replaceState(null, '', `#${element.id}`);
    },
    [scrollTo],
  );

  const setLocked = useCallback((isLocked) => {
    if (isLocked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  useEffect(() => {
    function handleAnchorClick(event) {
      if (event.defaultPrevented || !isPlainLeftClick(event)) return;
      const link = event.target.closest?.('a[href^="#"]');
      const target = link && document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      navigateTo(target);
    }

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [navigateTo]);

  const value = useMemo(
    () => ({ scrollTo, scrollToY, scrollToTop, navigateTo, setLocked }),
    [scrollTo, scrollToY, scrollToTop, navigateTo, setLocked],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
      <RouteScroll />
    </SmoothScrollContext.Provider>
  );
}
