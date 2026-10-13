import Booking from '@/components/Booking';
import FeaturedGallery from '@/components/FeaturedGallery';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Packages from '@/components/Packages';

export default function HomePage({ bookingPreset, onPlanTrip, onChoosePackage }) {
  return (
    <main id="main">
      <Hero />
      <FeaturedGallery onPlanTrip={onPlanTrip} />
      <Packages onChoosePackage={onChoosePackage} />
      <Gallery />
      <Booking preset={bookingPreset} />
    </main>
  );
}
