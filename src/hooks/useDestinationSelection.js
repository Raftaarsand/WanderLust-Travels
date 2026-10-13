import { useState } from 'react';
import { findDestination } from '@/data/destinations';

// Shared by the homepage gallery and the destinations page so both open
// the same details dialog and hand the choice to the booking form.
export function useDestinationSelection(onPlanTrip) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedDestination = selectedId ? findDestination(selectedId) : null;

  const closeDetails = () => setSelectedId(null);

  function handlePlanTrip(destinationId) {
    closeDetails();
    onPlanTrip(destinationId);
  }

  return {
    selectedDestination,
    selectDestination: setSelectedId,
    closeDetails,
    handlePlanTrip,
  };
}
