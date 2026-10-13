import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { focusWithoutScroll } from '@/lib/focus';

// Resets the window when the page changes, and scrolls to a hash target
// (`/#booking`) once that page's markup is on screen. Render this after the
// page tree so layout effects (such as the gallery measuring itself) run first.
export default function RouteScroll() {
  const { pathname, hash } = useLocation();
  const { scrollTo, scrollToTop } = useSmoothScroll();
  const pathRef = useRef(pathname);

  useLayoutEffect(() => {
    const pathChanged = pathRef.current !== pathname;
    pathRef.current = pathname;

    if (!hash) {
      scrollToTop();
      return;
    }

    const element = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!element) {
      scrollToTop();
      return;
    }

    scrollTo(element, { immediate: pathChanged });
    if (!element.contains(document.activeElement)) focusWithoutScroll(element);
  }, [pathname, hash, scrollTo, scrollToTop]);

  return null;
}
