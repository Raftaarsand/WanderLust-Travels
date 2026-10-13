import { useEffect, useRef } from 'react';
import { CalendarDays, Info, MapPin, Users } from 'lucide-react';
import BookingForm from './BookingForm';
import SectionHeading from './SectionHeading';
import { SECTION_IDS } from '../data/site';
import { scrollToSection } from '../lib/scroll';
import './Booking.css';

const PLANNING_STEPS = [
  { icon: MapPin, title: 'Pick a place and a pace', text: 'Choose a destination and the package that fits your budget.' },
  { icon: CalendarDays, title: 'Set your dates', text: 'Tell us when you want to leave and when you need to be home.' },
  { icon: Users, title: 'Bring your people', text: 'Solo, as a couple or with family, up to twelve travellers.' },
];

export default function Booking({ preset }) {
  const titleRef = useRef(null);

  // When another section sends the visitor here, scroll to the form and move
  // keyboard focus with them (instead of leaving it on the button they clicked).
  useEffect(() => {
    if (!preset) return;
    scrollToSection(SECTION_IDS.booking);
    titleRef.current?.focus({ preventScroll: true });
  }, [preset]);

  return (
    <section id={SECTION_IDS.booking} className="section section--alt" aria-labelledby="booking-title">
      <div className="container booking">
        <div className="booking__intro">
          <SectionHeading
            id="booking-title"
            titleRef={titleRef}
            eyebrow="Book a trip"
            title="Tell us where your heart is set"
            description="Share a few details and we'll shape the trip around your dates, pace and budget."
            align="start"
          />

          <ol className="booking__steps">
            {PLANNING_STEPS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="booking__step">
                <span className="booking__step-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="booking__step-title">{title}</h3>
                  <p className="booking__step-text">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="booking__notice">
            <Info size={18} aria-hidden="true" />
            Frontend demo: your details stay in this browser tab and are never sent anywhere.
          </p>
        </div>

        <div className="booking__card">
          <BookingForm preset={preset} />
        </div>
      </div>
    </section>
  );
}
