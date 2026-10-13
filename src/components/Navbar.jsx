import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { NAV_LINKS, SECTION_IDS, TRACKED_SECTIONS } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import './Navbar.css';

const SCROLL_THRESHOLD_PX = 24;
const DESKTOP_QUERY = '(min-width: 960px)';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled(SCROLL_THRESHOLD_PX);
  const activeId = useActiveSection(TRACKED_SECTIONS);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const desktopMedia = window.matchMedia(DESKTOP_QUERY);
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    function handleResize(event) {
      if (event.matches) setIsMenuOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    desktopMedia.addEventListener('change', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopMedia.removeEventListener('change', handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const isSolid = isScrolled || isMenuOpen;

  return (
    <header className={`navbar ${isSolid ? 'navbar--solid' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main">
        <a href={`#${SECTION_IDS.home}`} className="navbar__brand" onClick={closeMenu}>
          <BrandMark />
          <span className="navbar__brand-text">
            Wanderlust <span className="navbar__brand-sub">Travels</span>
          </span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <div
          id="primary-navigation"
          className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}
        >
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`navbar__link ${activeId === link.id ? 'navbar__link--active' : ''}`}
                  aria-current={activeId === link.id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${SECTION_IDS.booking}`} className="btn btn--primary navbar__cta" onClick={closeMenu}>
            Book a Trip
          </a>
        </div>
      </nav>
    </header>
  );
}
