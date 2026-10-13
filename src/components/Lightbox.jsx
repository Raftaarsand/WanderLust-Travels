import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import SmartImage from './SmartImage';
import { IMAGE_WIDTHS, unsplashUrl } from '../lib/images';

export const LIGHTBOX_TITLE_ID = 'lightbox-caption';

// Wraps around, so "next" on the last photo goes back to the first.
function getWrappedIndex(index, total) {
  return (index + total) % total;
}

export default function Lightbox({ photos, activeIndex, onNavigate }) {
  const photo = photos[activeIndex];
  const total = photos.length;

  const showPrevious = () => onNavigate(getWrappedIndex(activeIndex - 1, total));
  const showNext = () => onNavigate(getWrappedIndex(activeIndex + 1, total));

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') onNavigate(getWrappedIndex(activeIndex - 1, total));
      if (event.key === 'ArrowRight') onNavigate(getWrappedIndex(activeIndex + 1, total));
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total, onNavigate]);

  return (
    <figure className="lightbox">
      <div className="lightbox__stage">
        <SmartImage
          src={unsplashUrl(photo.photoId, IMAGE_WIDTHS.full)}
          alt={photo.alt}
          loading="eager"
          className="lightbox__image"
        />
      </div>

      <figcaption className="lightbox__caption">
        <div>
          <p id={LIGHTBOX_TITLE_ID} className="lightbox__title">
            {photo.caption}
          </p>
          <p className="lightbox__location">
            <MapPin size={14} aria-hidden="true" />
            {photo.location}
          </p>
        </div>

        <div className="lightbox__controls">
          <button type="button" className="icon-btn icon-btn--on-dark" onClick={showPrevious} aria-label="Previous photo">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <p className="lightbox__counter" aria-live="polite">
            {activeIndex + 1} / {total}
          </p>
          <button type="button" className="icon-btn icon-btn--on-dark" onClick={showNext} aria-label="Next photo">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
