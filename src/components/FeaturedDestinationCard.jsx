import { ArrowRight, MapPin } from 'lucide-react';
import SmartImage from './SmartImage';
import { formatRupees } from '@/lib/format';
import { IMAGE_WIDTHS, unsplashUrl } from '@/lib/images';

export default function FeaturedDestinationCard({ destination, onExplore }) {
  const titleId = `featured-${destination.id}-title`;

  return (
    <article className="featured-card" aria-labelledby={titleId}>
      <div className="featured-card__media">
        <SmartImage
          src={unsplashUrl(destination.photoId, IMAGE_WIDTHS.full)}
          alt={destination.imageAlt}
          className="featured-card__image"
        />
        <span className="destination-card__tag">{destination.tag}</span>
      </div>

      <div className="featured-card__body">
        <p className="destination-card__country">
          <MapPin size={14} aria-hidden="true" />
          {destination.country}
        </p>
        <h3 id={titleId} className="destination-card__title">
          {destination.name}
        </h3>
        <p className="destination-card__description">{destination.description}</p>
        <div className="destination-card__footer">
          <p className="destination-card__price">
            <span>From</span>
            <strong>{formatRupees(destination.startingPrice)}</strong>
            <span>per person</span>
          </p>
          <button
            type="button"
            className="btn btn--outline"
            data-cursor="View"
            onClick={() => onExplore(destination.id)}
            aria-label={`Explore ${destination.name}`}
          >
            Explore
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
