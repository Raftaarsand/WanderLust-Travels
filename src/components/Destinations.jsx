import { useState } from 'react';
import DestinationCard from './DestinationCard';
import DestinationDetails, { DESTINATION_DETAILS_TITLE_ID } from './DestinationDetails';
import Modal from './Modal';
import SectionHeading from './SectionHeading';
import { destinations, findDestination } from '../data/destinations';
import { SECTION_IDS } from '../data/site';
import './Destinations.css';

export default function Destinations({ onPlanTrip }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedDestination = selectedId ? findDestination(selectedId) : null;

  const closeDetails = () => setSelectedId(null);

  function handlePlanTrip(destinationId) {
    closeDetails();
    onPlanTrip(destinationId);
  }

  return (
    <section id={SECTION_IDS.destinations} className="section" aria-labelledby="destinations-title">
      <div className="container">
        <SectionHeading
          id="destinations-title"
          eyebrow="Popular destinations"
          title="Places our travellers keep coming back to"
          description="From Himalayan valleys to Aegean cliffs, each destination is planned around the season it shines brightest."
        />

        <ul className="destinations__grid">
          {destinations.map((destination) => (
            <li key={destination.id}>
              <DestinationCard destination={destination} onExplore={setSelectedId} />
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={Boolean(selectedDestination)} onClose={closeDetails} labelledBy={DESTINATION_DETAILS_TITLE_ID}>
        {selectedDestination && (
          <DestinationDetails destination={selectedDestination} onPlanTrip={handlePlanTrip} />
        )}
      </Modal>
    </section>
  );
}
