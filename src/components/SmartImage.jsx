import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import './SmartImage.css';

// The inner component is keyed by `src` (see below), so its loading state
// starts fresh whenever a different image is shown.
function ImageWithStatus({ src, alt, className = '', loading = 'lazy', fetchPriority }) {
  const [status, setStatus] = useState('loading');

  if (status === 'error') {
    if (!alt) return <div className={`smart-image smart-image--hidden ${className}`} aria-hidden="true" />;

    return (
      <div className={`smart-image smart-image--fallback ${className}`} role="img" aria-label={alt}>
        <ImageOff size={28} aria-hidden="true" />
        <span>Photo unavailable</span>
      </div>
    );
  }

  return (
    <div className={`smart-image smart-image--${status} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export default function SmartImage(props) {
  return <ImageWithStatus key={props.src} {...props} />;
}
