import { CalendarDays, Check, Clock, MapPin, Wallet } from 'lucide-react';
import SmartImage from './SmartImage';
import { IMAGE_WIDTHS, unsplashUrl } from '../lib/images';
import { formatRupees } from '../lib/format';

export const DESTINATION_DETAILS_TITLE_ID = 'destination-details-title';

export default function DestinationDetails({ destination, onPlanTrip }) {
  const facts = [
    { icon: CalendarDays, label: 'Best time to visit', value: destination.bestTime },
    { icon: Clock, label: 'Ideal trip length', value: destination.idealDuration },
    { icon: Wallet, label: 'Starting from', value: `${formatRupees(destination.startingPrice)} / person` },
  ];

  return (
    <div className="destination-details">
      <SmartImage
        src={unsplashUrl(destination.photoId, IMAGE_WIDTHS.full)}
        alt={destination.imageAlt}
        className="destination-details__image"
      />

      <div className="destination-details__content">
        <p className="destination-card__country">
          <MapPin size={14} aria-hidden="true" />
          {destination.country}
        </p>
        <h3 id={DESTINATION_DETAILS_TITLE_ID} className="destination-details__title">
          {destination.name}
        </h3>
        <p className="destination-details__description">{destination.description}</p>

        <dl className="destination-details__facts">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="destination-details__fact">
              <Icon size={18} aria-hidden="true" />
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <h4 className="destination-details__subtitle">Trip highlights</h4>
        <ul className="destination-details__highlights">
          {destination.highlights.map((highlight) => (
            <li key={highlight}>
              <Check size={16} aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--primary btn--block" onClick={() => onPlanTrip(destination.id)}>
          Plan a trip to {destination.name}
        </button>
        <p className="destination-details__note">Prices are illustrative and exclude flights.</p>
      </div>
    </div>
  );
}
