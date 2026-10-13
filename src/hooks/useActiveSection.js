import { useEffect, useState } from 'react';

// A section counts as "active" when it crosses a thin band just above the
// middle of the viewport.
const OBSERVER_ROOT_MARGIN = '-40% 0px -55% 0px';
const BOTTOM_TOLERANCE_PX = 4;

// Returns the id of the section currently in view.
// `sectionIds` must be a stable array (define it outside the component).
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // The last section is often too short to reach the middle band,
    // so treat "scrolled to the very bottom" as that section being active.
    function handleScroll() {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
      if (reachedBottom) setActiveId(sectionIds[sectionIds.length - 1]);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
