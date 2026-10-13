import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DestinationCard from './DestinationCard';
import DestinationDialog from './DestinationDialog';
import SectionHeading from './SectionHeading';
import { destinations } from '../data/destinations';
import { ROUTES, SECTION_IDS } from '../data/site';
import { useDestinationSelection } from '../hooks/useDestinationSelection';
import './Destinations.css';

export default function Destinations({ onPlanTrip }) {
  const titleRef = useRef(null);
  const { selectedDestination, selectDestination, closeDetails, handlePlanTrip } =
    useDestinationSelection(onPlanTrip);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <section id={SECTION_IDS.destinations} className="section destinations-page" aria-labelledby="destinations-title">
      <div className="container">
        <Link to={ROUTES.home} className="destinations-page__back">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>

        <SectionHeading
          id="destinations-title"
          titleRef={titleRef}
          eyebrow="All destinations"
          title="Explore the World"
          description="Six places, from a Himalayan weekend to an overwater villa. Each itinerary is timed for the season that place looks its best."
        />

        <ul className="destinations__grid">
          {destinations.map((destination) => (
            <li key={destination.id}>
              <DestinationCard destination={destination} onExplore={selectDestination} />
            </li>
          ))}
        </ul>
      </div>

      <DestinationDialog
        destination={selectedDestination}
        onClose={closeDetails}
        onPlanTrip={handlePlanTrip}
      />
    </section>
  );
}
