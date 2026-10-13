import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Lightbox, { LIGHTBOX_TITLE_ID } from './Lightbox';
import Modal from './Modal';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';
import { galleryPhotos } from '../data/gallery';
import { SECTION_IDS } from '../data/site';
import { IMAGE_WIDTHS, unsplashUrl } from '../lib/images';
import './Gallery.css';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isLightboxOpen = activeIndex !== null;

  return (
    <section id={SECTION_IDS.gallery} className="section" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow="Travel gallery"
          title="Moments from the road"
          description="A few frames from the places we love. Tap any photo to see it larger."
        />

        <ul className="gallery__grid">
          {galleryPhotos.map((photo, index) => (
            <li key={photo.id} className={`gallery__item gallery__item--${photo.layout}`}>
              <button
                type="button"
                className="gallery__button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger: ${photo.caption}, ${photo.location}`}
              >
                <SmartImage
                  src={unsplashUrl(photo.photoId, IMAGE_WIDTHS.card)}
                  alt={photo.alt}
                  className="gallery__image"
                />
                <span className="gallery__caption" aria-hidden="true">
                  <span>{photo.location}</span>
                  <Maximize2 size={16} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isLightboxOpen} onClose={() => setActiveIndex(null)} labelledBy={LIGHTBOX_TITLE_ID} variant="dark">
        {isLightboxOpen && <Lightbox photos={galleryPhotos} activeIndex={activeIndex} onNavigate={setActiveIndex} />}
      </Modal>
    </section>
  );
}
