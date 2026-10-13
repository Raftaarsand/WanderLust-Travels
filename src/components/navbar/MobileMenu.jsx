import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BOOKING_CTA, BOOKING_HREF, CONTACT_DETAILS, NAV_LINKS, ROUTES, SECTION_IDS } from '@/data/site';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { UI_TRANSITION } from '@/lib/motion';
import BrandLink from './BrandLink';

const LINK_STAGGER_S = 0.04;
const LINK_OFFSET_PX = 16;

export default function MobileMenu({ isOpen, onOpenChange }) {
  const { navigateTo, scrollToTop, setLocked } = useSmoothScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const pendingHrefRef = useRef(null);

  useEffect(() => {
    setLocked(isOpen);
  }, [isOpen, setLocked]);

  // Close first, then move once the dialog has handed focus back,
  // so focus lands on the destination instead of the menu button.
  function handleNavigate(event, href) {
    event.preventDefault();
    pendingHrefRef.current = href;
    onOpenChange(false);
  }

  function handleCloseAutoFocus(event) {
    const href = pendingHrefRef.current;
    if (!href) return;
    event.preventDefault();
    pendingHrefRef.current = null;

    if (href.startsWith('#')) {
      navigateTo(href.slice(1));
      return;
    }

    const url = new URL(href, window.location.origin);
    const hashId = url.hash.replace(/^#/, '');
    const isSamePage = url.pathname === location.pathname;

    if (isSamePage && hashId) {
      navigateTo(hashId);
      return;
    }

    if (isSamePage && href === ROUTES.home) {
      scrollToTop();
      navigateTo(SECTION_IDS.home);
      return;
    }

    navigate(href);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount asChild aria-describedby={undefined} onCloseAutoFocus={handleCloseAutoFocus}>
              <motion.div
                className="fixed inset-0 z-(--z-menu) flex flex-col overflow-y-auto bg-primary text-primary-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dialog.Title className="sr-only">Site menu</Dialog.Title>

                <div className="container flex h-(--nav-height) shrink-0 items-center justify-between gap-4">
                  <BrandLink onClick={(event) => handleNavigate(event, ROUTES.home)} />
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="size-6" aria-hidden="true" />
                    </Button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Main" className="container flex flex-1 flex-col justify-center py-8">
                  <ol className="grid gap-2">
                    {NAV_LINKS.map((link, index) => (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, y: LINK_OFFSET_PX }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...UI_TRANSITION, delay: index * LINK_STAGGER_S }}
                      >
                        <a
                          href={link.href}
                          onClick={(event) => handleNavigate(event, link.href)}
                          className="group flex min-h-14 items-baseline gap-4 rounded-sm py-2 font-display text-2xl no-underline"
                        >
                          <span className="font-sans text-sm text-primary-foreground/70 tabular-nums">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="transition-transform duration-base ease-brand group-hover:translate-x-2 group-active:translate-x-1">
                            {link.label}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ol>
                </nav>

                <div className="container flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/20 py-6">
                  <a
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className="inline-flex min-h-11 items-center text-sm text-primary-foreground/80 underline-offset-4 hover:underline"
                  >
                    {CONTACT_DETAILS.email}
                  </a>
                  <Button variant="inverse" onClick={(event) => handleNavigate(event, BOOKING_HREF)}>
                    {BOOKING_CTA.label}
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
