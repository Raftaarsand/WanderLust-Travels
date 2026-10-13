import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { BOOKING_CTA, CONTACT_DETAILS, NAV_LINKS, SECTION_IDS } from '@/data/site';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { UI_TRANSITION } from '@/lib/motion';
import BrandLink from './BrandLink';

const LINK_STAGGER_S = 0.04;
const LINK_OFFSET_PX = 16;

export default function MobileMenu({ isOpen, onOpenChange }) {
  const { navigateTo, setLocked } = useSmoothScroll();
  const pendingTargetRef = useRef(null);

  useEffect(() => {
    setLocked(isOpen);
  }, [isOpen, setLocked]);

  // Close first, then scroll once the dialog has handed focus back,
  // so focus lands on the chosen section instead of the menu button.
  function handleNavigate(event, targetId) {
    event.preventDefault();
    pendingTargetRef.current = targetId;
    onOpenChange(false);
  }

  function handleCloseAutoFocus(event) {
    const targetId = pendingTargetRef.current;
    if (!targetId) return;
    event.preventDefault();
    pendingTargetRef.current = null;
    navigateTo(targetId);
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
                  <BrandLink onClick={(event) => handleNavigate(event, SECTION_IDS.home)} />
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
                          href={`#${link.id}`}
                          onClick={(event) => handleNavigate(event, link.id)}
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
                  <Button variant="inverse" onClick={(event) => handleNavigate(event, BOOKING_CTA.id)}>
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
