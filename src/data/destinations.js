// Starting prices are illustrative, per person, twin sharing, excluding flights.
export const destinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    tag: 'Island culture',
    description:
      'Terraced rice fields, cliff-top temples and slow mornings by the sea in Ubud and Uluwatu.',
    startingPrice: 19999,
    photoId: 'photo-1537996194471-e657df975ab4',
    imageAlt: 'A carved stone temple gate framing a misty volcano in Bali',
    bestTime: 'April – October',
    idealDuration: '6–8 days',
    highlights: [
      'Sunrise trek up Mount Batur',
      'Walk the Tegallalang rice terraces',
      'Kecak fire dance at Uluwatu temple',
    ],
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    tag: 'Mountain rail',
    description:
      'Glacier lakes, cogwheel trains and chalet villages tucked beneath the Jungfrau and Matterhorn.',
    startingPrice: 89999,
    photoId: 'photo-1530122037265-a5f1f91d3b99',
    imageAlt: 'Snow-capped Swiss peaks rising above green alpine meadows',
    bestTime: 'June – September',
    idealDuration: '7–9 days',
    highlights: [
      'Ride up to Jungfraujoch, the Top of Europe',
      'Boat across turquoise Lake Brienz',
      'Car-free evenings in Zermatt',
    ],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    tag: 'Temples & tea',
    description:
      "Lantern-lit lanes, moss gardens and more than a thousand temples in Japan's old imperial capital.",
    startingPrice: 64999,
    photoId: 'photo-1493976040374-85c8e12f0c0e',
    imageAlt: 'A five-storey wooden pagoda above traditional rooftops in Kyoto',
    bestTime: 'March – May, Oct – Nov',
    idealDuration: '5–7 days',
    highlights: [
      "Climb Fushimi Inari's torii gate trail",
      'Early-morning walk in Arashiyama bamboo grove',
      'Traditional tea ceremony in Gion',
    ],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    tag: 'Caldera sunsets',
    description:
      'Whitewashed villages perched on volcanic cliffs above an impossibly blue Aegean caldera.',
    startingPrice: 74999,
    photoId: 'photo-1570077188670-e3a8d69ac5ff',
    imageAlt: 'White houses and blue domes overlooking the sea in Santorini',
    bestTime: 'May – October',
    idealDuration: '4–6 days',
    highlights: [
      'Golden-hour views from the Oia castle',
      'Catamaran cruise around the caldera',
      'Wine tasting in the hill village of Pyrgos',
    ],
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    tag: 'Himalayan escape',
    description:
      'Pine forests, apple orchards and high mountain passes in the heart of the Himachal Himalaya.',
    startingPrice: 8999,
    photoId: 'photo-1626621341517-bbf3d9990a23',
    imageAlt: 'Snowy Himalayan mountains above a pine-covered valley near Manali',
    bestTime: 'March – June, Dec – Feb for snow',
    idealDuration: '4–6 days',
    highlights: [
      'Paragliding over Solang Valley',
      'Café-hopping in Old Manali',
      'Day trip through Atal Tunnel to Sissu',
    ],
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    tag: 'Overwater calm',
    description:
      'Overwater villas, vivid house reefs and powder-white sandbanks across turquoise atolls.',
    startingPrice: 49999,
    photoId: 'photo-1514282401047-d79a71a590e8',
    imageAlt: 'Overwater villas on stilts above a turquoise lagoon in the Maldives',
    bestTime: 'November – April',
    idealDuration: '4–6 days',
    highlights: [
      'Snorkel with manta rays and reef sharks',
      'Private sandbank picnic',
      'Sunset dolphin cruise',
    ],
  },
];

export function findDestination(destinationId) {
  return destinations.find((destination) => destination.id === destinationId);
}
