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
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      onNavigate(getWrappedIndex(activeIndex + direction, total));
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
          fetchPriority="high"
          className="lightbox__image"
        />
      </div>

      <figcaption className="lightbox__caption">
        <div className="lightbox__meta">
          <p id={LIGHTBOX_TITLE_ID} className="lightbox__title">
            {photo.caption}
          </p>
          <p className="lightbox__location">
            <MapPin size={14} aria-hidden="true" />
            {photo.location}
          </p>
        </div>

        <div className="lightbox__controls" role="group" aria-label="Browse photos">
          <button type="button" className="icon-btn icon-btn--on-dark" onClick={showPrevious} aria-label="Previous photo">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <p className="lightbox__counter" aria-live="polite">
            <span className="visually-hidden">
              Photo {activeIndex + 1} of {total}: {photo.caption}, {photo.location}.
            </span>
            <span aria-hidden="true">
              {activeIndex + 1} / {total}
            </span>
          </p>
          <button type="button" className="icon-btn icon-btn--on-dark" onClick={showNext} aria-label="Next photo">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
