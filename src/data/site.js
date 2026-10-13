export const SECTION_IDS = {
  home: 'home',
  destinations: 'destinations',
  packages: 'packages',
  gallery: 'gallery',
  booking: 'booking',
  contact: 'contact',
};

export const NAV_LINKS = [
  { id: SECTION_IDS.destinations, label: 'Destinations' },
  { id: SECTION_IDS.packages, label: 'Packages' },
  { id: SECTION_IDS.gallery, label: 'Gallery' },
  { id: SECTION_IDS.contact, label: 'Contact' },
];

export const BOOKING_CTA = { id: SECTION_IDS.booking, label: 'Book a trip', cursorLabel: 'Book' };

// Order matters: this is the order the sections appear on the page.
export const TRACKED_SECTIONS = [
  SECTION_IDS.home,
  SECTION_IDS.destinations,
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
