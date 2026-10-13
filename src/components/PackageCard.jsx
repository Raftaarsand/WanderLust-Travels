import { Check, Clock, MapPin, Star } from 'lucide-react';
import { formatRupees } from '../lib/format';

export default function PackageCard({ travelPackage, onChoose, headingId, tabIndex }) {
  const { id, name, tagline, price, duration, sampleDestination, includes, recommended } = travelPackage;
  const titleId = headingId === null ? undefined : (headingId ?? `package-${id}-title`);

  return (
    <article
      className={`package-card ${recommended ? 'package-card--recommended' : ''}`}
      aria-labelledby={titleId}
    >
      {recommended && (
        <p className="package-card__badge">
          <Star size={14} aria-hidden="true" />
          Recommended
        </p>
      )}

      <header className="package-card__header">
        <h3 id={titleId} className="package-card__title">
          {name}
        </h3>
        <p className="package-card__tagline">{tagline}</p>
      </header>

      <p className="package-card__price">
        <span className="package-card__price-label">Starting at</span>
        <strong>{formatRupees(price)}</strong>
        <span className="package-card__price-label">per person*</span>
      </p>

      <ul className="package-card__meta">
        <li>
          <Clock size={16} aria-hidden="true" />
          {duration}
        </li>
        <li>
          <MapPin size={16} aria-hidden="true" />
          Sample trip: {sampleDestination}
        </li>
      </ul>

      <div className="package-card__includes">
        <h4 className="package-card__includes-title">What's included</h4>
        <ul>
          {includes.map((item) => (
            <li key={item}>
              <Check size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`btn btn--block ${recommended ? 'btn--primary' : 'btn--outline'}`}
        tabIndex={tabIndex}
        onClick={() => onChoose(id)}
        aria-label={`Choose the ${name} package`}
      >
        Choose Package
      </button>
    </article>
  );
}
