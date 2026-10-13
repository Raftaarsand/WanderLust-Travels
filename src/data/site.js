export const SECTION_IDS = {
  home: 'home',
  featured: 'featured',
  destinations: 'destinations',
  packages: 'packages',
  gallery: 'gallery',
  booking: 'booking',
  contact: 'contact',
};

export const ROUTES = {
  home: '/',
  destinations: '/destinations',
};

// `href` is either a route (`/destinations`, `/#packages`) or a same-page
// hash (`#contact`) when the target exists on every page.
export const NAV_LINKS = [
  { id: SECTION_IDS.destinations, label: 'Destinations', href: ROUTES.destinations },
  { id: SECTION_IDS.packages, label: 'Packages', href: `/#${SECTION_IDS.packages}` },
  { id: SECTION_IDS.gallery, label: 'Gallery', href: `/#${SECTION_IDS.gallery}` },
  { id: SECTION_IDS.contact, label: 'Contact', href: `#${SECTION_IDS.contact}` },
];

export const BOOKING_CTA = { id: SECTION_IDS.booking, label: 'Book a trip', cursorLabel: 'Book' };

export const BOOKING_HREF = `/#${SECTION_IDS.booking}`;

// Homepage sections only. Destinations is a route, so it is not scroll-spied.
export const TRACKED_SECTIONS = [
  SECTION_IDS.home,
  SECTION_IDS.packages,
  SECTION_IDS.gallery,
  SECTION_IDS.booking,
  SECTION_IDS.contact,
];

// Sample details only. The .example domain is reserved and never delivers email.
export const CONTACT_DETAILS = {
  address: '42 Banyan Court, Indiranagar, Bengaluru 560038 (sample address)',
  email: 'hello@wanderlust-travels.example',
  phoneDisplay: '+91 00000 12345',
  phoneHref: 'tel:+910000012345',
  hours: 'Mon – Sat, 10:00 – 19:00 IST',
};

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/' },
];
