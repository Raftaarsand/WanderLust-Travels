import { useCallback, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

export const CURSOR_VARIANT = {
  idle: 'idle',
  hover: 'hover',
  label: 'label',
  disabled: 'disabled',
  hidden: 'hidden',
};

// Fraction of the remaining distance the ring covers per 60fps frame.
const RING_LERP = 0.18;
const SETTLED_DISTANCE_PX = 0.1;

const TEXT_FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], label, summary';
const DISABLED_SELECTOR = ':disabled, [aria-disabled="true"]';

function resolveCursorState(target) {
  if (!(target instanceof Element)) return { variant: CURSOR_VARIANT.idle, label: '' };
  if (target.closest(TEXT_FIELD_SELECTOR)) return { variant: CURSOR_VARIANT.hidden, label: '' };

  const interactive = target.closest(INTERACTIVE_SELECTOR);
  if (interactive?.matches(DISABLED_SELECTOR)) return { variant: CURSOR_VARIANT.disabled, label: '' };

  const labelled = target.closest('[data-cursor]');
  if (labelled) return { variant: CURSOR_VARIANT.label, label: labelled.dataset.cursor };
  if (interactive) return { variant: CURSOR_VARIANT.hover, label: '' };
  return { variant: CURSOR_VARIANT.idle, label: '' };
}

// Drives the custom cursor: positions `dotRef` instantly, and `ringRef` and
// `labelRef` with a smooth lag. Reports hover/press state and click ripples.
export function useCustomCursor({ dotRef, ringRef, labelRef }) {
  const [variant, setVariant] = useState(CURSOR_VARIANT.idle);
  const [label, setLabel] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

  const removeRipple = useCallback((id) => {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const pointer = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let hasPointer = false;
    let nextRippleId = 0;

    const ctx = gsap.context(() => {
      const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
      const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');
      const followers = [ringRef.current, labelRef.current];
      const setRingX = gsap.quickSetter(followers, 'x', 'px');
      const setRingY = gsap.quickSetter(followers, 'y', 'px');

      function handlePointerMove(event) {
        if (event.pointerType === 'touch') return;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        setDotX(pointer.x);
        setDotY(pointer.y);
        if (!hasPointer) {
          ring.x = pointer.x;
          ring.y = pointer.y;
          setRingX(ring.x);
          setRingY(ring.y);
          hasPointer = true;
        }
        setIsVisible(true);
      }

      function followPointer() {
        const dx = pointer.x - ring.x;
        const dy = pointer.y - ring.y;
        if (Math.abs(dx) < SETTLED_DISTANCE_PX && Math.abs(dy) < SETTLED_DISTANCE_PX) return;
        const progress = 1 - (1 - RING_LERP) ** gsap.ticker.deltaRatio();
        ring.x += dx * progress;
        ring.y += dy * progress;
        setRingX(ring.x);
        setRingY(ring.y);
      }

      function handlePointerOver(event) {
        const next = resolveCursorState(event.target);
        setVariant(next.variant);
        setLabel(next.label);
      }

      function handlePointerDown(event) {
        if (event.pointerType === 'touch') return;
        setIsPressed(true);
        if (event.target instanceof Element && event.target.closest(TEXT_FIELD_SELECTOR)) return;
        const ripple = { id: nextRippleId, x: event.clientX, y: event.clientY };
        nextRippleId += 1;
        setRipples((current) => [...current, ripple]);
      }

      const release = () => setIsPressed(false);
      const hide = () => setIsVisible(false);

      gsap.ticker.add(followPointer);
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
      window.addEventListener('blur', release);
      document.addEventListener('pointerover', handlePointerOver, { passive: true });
      root.addEventListener('mouseleave', hide);

      return () => {
        gsap.ticker.remove(followPointer);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
        window.removeEventListener('blur', release);
        document.removeEventListener('pointerover', handlePointerOver);
        root.removeEventListener('mouseleave', hide);
      };
    });

    root.classList.add('has-custom-cursor');
    return () => {
      ctx.revert();
      root.classList.remove('has-custom-cursor');
    };
  }, [dotRef, ringRef, labelRef]);

  return { variant, label, isPressed, isVisible, ripples, removeRipple };
}
