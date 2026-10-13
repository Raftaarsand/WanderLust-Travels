import { useState } from 'react';
import Booking from './components/Booking';
import Destinations from './components/Destinations';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Packages from './components/Packages';

export default function App() {
  // A new object each time a visitor picks a destination or package,
  // so the booking form knows to prefill and scroll into view.
  const [bookingPreset, setBookingPreset] = useState(null);

  return (
    <>
      <a href="#main" className="skip-link">
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
    </>
  );
}
