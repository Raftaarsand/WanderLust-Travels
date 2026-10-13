import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import BrandMark from './BrandMark';
import { CONTACT_DETAILS, NAV_LINKS, SECTION_IDS, SOCIAL_LINKS } from '../data/site';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id={SECTION_IDS.contact} className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__logo">
            <BrandMark />
            Wanderlust <em>Travels</em>
          </p>
          <p className="footer__description">
            Small-group and private journeys to six of the world's most memorable places, planned around the
            season, your budget and the way you like to travel.
          </p>
          <ul className="footer__social" aria-label="Social media">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer" className="footer__social-link">
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="visually-hidden">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__column" aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`#${SECTION_IDS.booking}`} className="footer__link">
                Book a Trip
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__column">
          <h2 className="footer__heading">Contact us</h2>
          <address className="footer__contact">
            <p>
              <MapPin size={16} aria-hidden="true" />
              {CONTACT_DETAILS.address}
            </p>
            <a href={`mailto:${CONTACT_DETAILS.email}`} className="footer__link">
              <Mail size={16} aria-hidden="true" />
              {CONTACT_DETAILS.email}
            </a>
            <a href={CONTACT_DETAILS.phoneHref} className="footer__link">
              <Phone size={16} aria-hidden="true" />
              {CONTACT_DETAILS.phoneDisplay}
            </a>
            <p>
              <Clock size={16} aria-hidden="true" />
              {CONTACT_DETAILS.hours}
            </p>
          </address>
          <p className="footer__sample-note">All contact details are fictional samples.</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {currentYear} Wanderlust Travels. A fictional travel agency built as a frontend demo.</p>
        <a href={`#${SECTION_IDS.home}`} className="footer__link">
          Back to top
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
