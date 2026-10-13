import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BOOKING_CTA, BOOKING_HREF, TRACKED_SECTIONS } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useHideOnScroll } from '@/hooks/useHideOnScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DESKTOP_NAV_QUERY } from '@/lib/mediaQueries';
import { cn } from '@/lib/utils';
import BrandLink from './BrandLink';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

const SCROLL_OPTIONS = { topThresholdPx: 24, hideAfterPx: 160, tolerancePx: 6 };

export default function Navbar() {
  const [isMenuRequested, setIsMenuRequested] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery(DESKTOP_NAV_QUERY);
  const { isAtTop, isHidden } = useHideOnScroll(SCROLL_OPTIONS);
  const activeId = useActiveSection(TRACKED_SECTIONS, pathname);

  const isMenuOpen = isMenuRequested && !isDesktop;
  // The transparent bar is only readable over the homepage hero.
  const isSolid = pathname !== '/' || !isAtTop;
  const shouldHide = isHidden && !hasFocusWithin && !isMenuOpen;

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasFocusWithin(false);
  }

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 top-0 z-(--z-nav) transition-colors duration-base ease-brand',
        isSolid ? 'text-primary' : 'text-primary-foreground',
      )}
      initial={false}
      animate={{ y: shouldHide ? '-100%' : '0%' }}
      onFocus={() => setHasFocusWithin(true)}
      onBlur={handleBlur}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 border-b border-border bg-background shadow-sm transition-opacity duration-base ease-brand',
          isSolid ? 'opacity-100' : 'opacity-0',
        )}
      />

      <nav aria-label="Main" className="relative container flex h-(--nav-height) items-center justify-between gap-4">
        <BrandLink />

        <div className="flex items-center gap-2 lg:gap-6">
          <DesktopNav activeId={activeId} />
          <Button
            asChild
            variant={isSolid ? 'secondary' : 'inverse'}
            className="hidden sm:inline-flex"
            data-cursor={BOOKING_CTA.cursorLabel}
          >
            <Link to={BOOKING_HREF}>{BOOKING_CTA.label}</Link>
          </Button>
          <MobileMenu isOpen={isMenuOpen} onOpenChange={setIsMenuRequested} />
        </div>
      </nav>
    </motion.header>
  );
}
