import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/data/site';

export default function DesktopNav({ activeId }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => {
        const isActive = activeId === link.id;
        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              aria-current={isActive ? 'location' : undefined}
              className="relative inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold no-underline transition-colors duration-fast ease-brand hover:bg-current/10 active:bg-current/15"
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-accent"
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
