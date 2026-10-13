import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CustomCursor from '@/components/cursor/CustomCursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar/Navbar';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { SECTION_IDS } from '@/data/site';
import { UI_TRANSITION } from '@/lib/motion';
import DestinationsPage from '@/pages/DestinationsPage';
import HomePage from '@/pages/HomePage';

export default function App() {
  // A new object each time a visitor picks a destination or package,
  // so the booking form knows to prefill and scroll into view.
  const [bookingPreset, setBookingPreset] = useState(null);
  const navigate = useNavigate();

  function handlePlanTrip(destinationId) {
    setBookingPreset({ destinationId, requestedAt: Date.now() });
    navigate(`/#${SECTION_IDS.booking}`);
  }

  function handleChoosePackage(packageId) {
    setBookingPreset({ packageId, requestedAt: Date.now() });
    navigate(`/#${SECTION_IDS.booking}`);
  }

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
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                bookingPreset={bookingPreset}
                onPlanTrip={handlePlanTrip}
                onChoosePackage={handleChoosePackage}
              />
            }
          />
          <Route path="/destinations" element={<DestinationsPage onPlanTrip={handlePlanTrip} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <CustomCursor />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
