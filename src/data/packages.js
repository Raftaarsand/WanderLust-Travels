// All prices are illustrative sample prices, per person, twin sharing, excluding flights.
export const packages = [
  {
    id: 'budget-explorer',
    name: 'Budget Explorer',
    tagline: 'Smart stays for curious travellers',
    price: 8999,
    duration: '4 days · 3 nights',
    sampleDestination: 'Manali, India',
    includes: [
      'Cosy 3-star guesthouse stay',
      'AC Volvo bus transfers',
      'Daily breakfast',
      'Guided walk through Old Manali',
    ],
    recommended: false,
  },
  {
    id: 'comfort-getaway',
    name: 'Comfort Getaway',
    tagline: 'The sweet spot of ease and adventure',
    price: 19999,
    duration: '6 days · 5 nights',
    sampleDestination: 'Bali, Indonesia',
    includes: [
      '4-star resort with pool',
      'Airport pickup and private car day',
      'Breakfast daily and two dinners',
      'Guided temple and rice terrace tour',
    ],
    recommended: true,
  },
  {
    id: 'luxury-escape',
    name: 'Luxury Escape',
    tagline: 'Slow, indulgent and entirely yours',
    price: 49999,
    duration: '5 days · 4 nights',
    sampleDestination: 'Maldives',
    includes: [
      'Overwater villa with private deck',
      'Seaplane transfers',
      'All meals and premium drinks',
      'Sunset cruise and couples spa',
    ],
    recommended: false,
  },
];

export const BUDGET_FILTERS = [
  { id: 'all', label: 'All budgets', min: 0, max: Infinity },
  { id: 'under-15k', label: 'Under ₹15,000', min: 0, max: 14999 },
  { id: '15k-35k', label: '₹15,000 – ₹35,000', min: 15000, max: 35000 },
  { id: 'above-35k', label: 'Above ₹35,000', min: 35001, max: Infinity },
];

export const DEFAULT_BUDGET_FILTER_ID = BUDGET_FILTERS[0].id;

export function findPackage(packageId) {
  return packages.find((travelPackage) => travelPackage.id === packageId);
}
