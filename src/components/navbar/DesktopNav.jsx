import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SECTION_IDS } from '@/data/site';

function isCurrent(link, pathname, activeId) {
  if (link.id === SECTION_IDS.destinations) return pathname === '/destinations';
  return pathname === '/' && activeId === link.id;
}

function NavAnchor({ href, className, children, ...props }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

export default function DesktopNav({ activeId }) {
  const { pathname } = useLocation();

  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => {
        const isActive = isCurrent(link, pathname, activeId);
        return (
          <li key={link.id}>
            <NavAnchor
              href={link.href}
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
            </NavAnchor>
          </li>
        );
      })}
    </ul>
  );
}
