import { ArrowRight, MapPin, Sun } from 'lucide-react';
import SmartImage from './SmartImage';
import { SECTION_IDS } from '../data/site';
import { findDestination } from '../data/destinations';
import { IMAGE_WIDTHS, unsplashUrl } from '../lib/images';
import { formatRupees } from '../lib/format';
import './Hero.css';

const HERO_PHOTO_ID = 'photo-1501785888041-af3ef285b470';
const FEATURED_DESTINATION_ID = 'santorini';

const HERO_STATS = [
  { value: '6', label: 'Handpicked destinations' },
  { value: '3', label: 'Budget-friendly tiers' },
  { value: '4–9', label: 'Day itineraries' },
];

export default function Hero() {
  const featured = findDestination(FEATURED_DESTINATION_ID);

  return (
    <section id={SECTION_IDS.home} className="hero" aria-labelledby="hero-title">
      <SmartImage
        src={unsplashUrl(HERO_PHOTO_ID, IMAGE_WIDTHS.hero)}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="hero__media"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__copy">
          <p className="hero__eyebrow">Wanderlust Travels · Curated journeys</p>
          <h1 id="hero-title" className="hero__title">
            Your Next Adventure <em>Starts Here.</em>
          </h1>
          <p className="hero__subtitle">
            Discover extraordinary places, unforgettable experiences, and journeys made just for you.
          </p>
          <div className="hero__actions">
            <a href={`#${SECTION_IDS.destinations}`} className="btn btn--primary">
              Explore Destinations
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={`#${SECTION_IDS.booking}`} className="btn btn--outline-light">
              Plan Your Trip
            </a>
          </div>

          <dl className="hero__stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero__highlight" aria-label="Destination highlight">
          <SmartImage
            src={unsplashUrl(featured.photoId, IMAGE_WIDTHS.thumb)}
            alt={featured.imageAlt}
            className="hero__highlight-image"
          />
          <div className="hero__highlight-text">
            <p className="hero__highlight-label">
              <Sun size={14} aria-hidden="true" />
              Trending this season
            </p>
            <p className="hero__highlight-name">
              <MapPin size={14} aria-hidden="true" />
              {featured.name}, {featured.country}
            </p>
            <p className="hero__highlight-price">Caldera sunsets from {formatRupees(featured.startingPrice)}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
