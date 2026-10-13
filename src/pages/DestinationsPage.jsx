import { useEffect } from 'react';
import Destinations from '@/components/Destinations';

const PAGE_TITLE = 'Explore the World · Wanderlust Travels';

export default function DestinationsPage({ onPlanTrip }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main id="main">
      <Destinations onPlanTrip={onPlanTrip} />
    </main>
  );
}
