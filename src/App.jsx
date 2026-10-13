import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Booking from '@/components/Booking';
import CustomCursor from '@/components/cursor/CustomCursor';
import Destinations from '@/components/Destinations';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Navbar from '@/components/navbar/Navbar';
import Packages from '@/components/Packages';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { UI_TRANSITION } from '@/lib/motion';

export default function App() {
  // A new object each time a visitor picks a destination or package,
  // so the booking form knows to prefill and scroll into view.
  const [bookingPreset, setBookingPreset] = useState(null);

  return (
    <MotionConfig reducedMotion="user" transition={UI_TRANSITION}>
      <SmoothScrollProvider>
        <a
          href="#main"
          className="fixed top-2 left-2 z-(--z-menu) -translate-y-[200%] rounded-sm bg-primary px-4 py-3 font-bold text-primary-foreground transition-transform duration-fast ease-brand focus-visible:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Destinations onPlanTrip={(destinationId) => setBookingPreset({ destinationId })} />
          <Packages onChoosePackage={(packageId) => setBookingPreset({ packageId })} />
          <Gallery />
          <Booking preset={bookingPreset} />
        </main>
        <Footer />
        <CustomCursor />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
