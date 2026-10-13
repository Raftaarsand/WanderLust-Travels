const UNSPLASH_BASE_URL = 'https://images.unsplash.com';
const IMAGE_QUALITY = 75;

export const IMAGE_WIDTHS = {
  thumb: 240,
  card: 800,
  full: 1600,
  hero: 2000,
};

export function unsplashUrl(photoId, width = IMAGE_WIDTHS.card) {
  return `${UNSPLASH_BASE_URL}/${photoId}?auto=format&fit=crop&w=${width}&q=${IMAGE_QUALITY}`;
}
