import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

// A small wrapper around the native <dialog> element.
// The browser gives us focus trapping, Escape-to-close and focus
// restoration for free; we add backdrop-click closing and a close button.
export default function Modal({ isOpen, onClose, labelledBy, variant = 'light', children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleClick(event) {
    if (event.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${variant}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={handleClick}
    >
      {isOpen && (
        <div className="modal__body">
          <button
            type="button"
            className={`icon-btn modal__close ${variant === 'dark' ? 'icon-btn--on-dark' : ''}`}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
