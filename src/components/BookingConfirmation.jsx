import { useEffect, useRef } from 'react';
import { Check, Info } from 'lucide-react';
import { findDestination } from '../data/destinations';
import { findPackage } from '../data/packages';
import { formatDisplayDate, nightsBetween } from '../lib/dates';
import { formatRupees, pluralize } from '../lib/format';

export default function BookingConfirmation({ booking, onReset }) {
  const headingRef = useRef(null);

  // Move focus to the heading so screen reader and keyboard users
  // know the form has been replaced by the summary.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const destination = findDestination(booking.destination);
  const travelPackage = findPackage(booking.packageId);
  const travelerCount = Number(booking.travelers);
  const nights = nightsBetween(booking.departureDate, booking.returnDate);
  const firstName = booking.fullName.trim().split(/\s+/)[0];

  const summary = [
    { label: 'Destination', value: `${destination.name}, ${destination.country}` },
    { label: 'Package', value: travelPackage.name },
    {
      label: 'Dates',
      value: `${formatDisplayDate(booking.departureDate)} – ${formatDisplayDate(booking.returnDate)}`,
    },
    { label: 'Trip length', value: nights === 0 ? 'Same-day return' : pluralize(nights, 'night') },
    { label: 'Travellers', value: pluralize(travelerCount, 'traveller') },
    { label: 'Estimated package cost*', value: formatRupees(travelPackage.price * travelerCount) },
    { label: 'We would contact you at', value: booking.email },
  ];

  return (
    <div className="booking-confirmation">
      <span className="booking-confirmation__icon" aria-hidden="true">
        <Check size={28} />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="booking-confirmation__title">
        Thanks, {firstName}! Your trip request is ready.
      </h3>
      <p className="booking-confirmation__lead">
        Here's a summary of the trip you've planned. Reference <strong>{booking.reference}</strong>
      </p>

      <dl className="booking-confirmation__summary">
        {summary.map((item) => (
          <div key={item.label} className="booking-confirmation__row">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {booking.specialRequests.trim() && (
        <p className="booking-confirmation__requests">
          <strong>Your notes:</strong> {booking.specialRequests}
        </p>
      )}

      <p className="booking-confirmation__notice">
        <Info size={18} aria-hidden="true" />
        <span>
          This is a frontend demo. No real booking has been made, no payment has been processed and no
          email has been sent. *Illustrative price, excluding flights and taxes.
        </span>
      </p>

      <button type="button" className="btn btn--dark" onClick={onReset}>
        Plan another trip
      </button>
    </div>
  );
}
