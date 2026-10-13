import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DestinationDialog from './DestinationDialog';
import FeaturedDestinationCard from './FeaturedDestinationCard';
import SectionHeading from './SectionHeading';
import { featuredDestinations } from '@/data/destinations';
import { ROUTES, SECTION_IDS } from '@/data/site';
import { useDestinationSelection } from '@/hooks/useDestinationSelection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePinnedGallery } from '@/hooks/usePinnedGallery';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { PINNED_GALLERY_QUERY, REDUCED_MOTION_QUERY } from '@/lib/mediaQueries';
import './FeaturedGallery.css';

export default function FeaturedGallery({ onPlanTrip }) {
  const isWide = useMediaQuery(PINNED_GALLERY_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const isPinned = isWide && !prefersReducedMotion;
  const { scrollToY } = useSmoothScroll();
  const { pinRef, stickyRef, viewportRef, trackRef, activeIndex } = usePinnedGallery(isPinned, scrollToY);
  const { selectedDestination, selectDestination, closeDetails, handlePlanTrip } =
    useDestinationSelection(onPlanTrip);

  return (
    <section id={SECTION_IDS.featured} className="featured" aria-labelledby="featured-title">
      <div
        ref={pinRef}
        className={`featured-gallery ${isPinned ? 'featured-gallery--pinned' : 'featured-gallery--static'}`}
      >
        <div ref={stickyRef} className="featured-gallery__sticky">
          <div className="container">
            <SectionHeading
              id="featured-title"
              eyebrow="Featured destinations"
              title="Places our travellers keep coming back to"
              description="Bali, the Swiss Alps and Kyoto. Three trips we plan most often, told at the pace of a long look."
              align={isPinned ? 'start' : 'center'}
            />
          </div>

          <div ref={viewportRef} className="featured-gallery__viewport">
            <ul ref={trackRef} className="featured-gallery__track">
              {featuredDestinations.map((destination, index) => (
                <li
                  key={destination.id}
                  className="featured-gallery__slide"
                  data-gallery-slide
                  data-active={isPinned && index === activeIndex ? 'true' : undefined}
                >
                  <div className="featured-gallery__frame">
                    <FeaturedDestinationCard destination={destination} onExplore={selectDestination} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container featured__cta">
        <Link to={ROUTES.destinations} className="btn btn--primary" data-cursor="Explore">
          Explore All Destinations
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <DestinationDialog
        destination={selectedDestination}
        onClose={closeDetails}
        onPlanTrip={handlePlanTrip}
      />
    </section>
  );
}
