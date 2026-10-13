import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CURSOR_VARIANT, useCustomCursor } from '@/hooks/useCustomCursor';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from '@/lib/mediaQueries';
import CursorRipple from './CursorRipple';

const RING_SCALE = {
  [CURSOR_VARIANT.idle]: 1,
  [CURSOR_VARIANT.hover]: 1.6,
  [CURSOR_VARIANT.label]: 2.4,
  [CURSOR_VARIANT.disabled]: 0.7,
  [CURSOR_VARIANT.hidden]: 0.4,
};
const PRESSED_RING_SCALE = 0.8;
const PRESSED_DOT_SCALE = 0.5;
const PRESSED_LABEL_SCALE = 0.9;
const DOT_VARIANTS = new Set([CURSOR_VARIANT.idle, CURSOR_VARIANT.hover, CURSOR_VARIANT.disabled]);
const LABEL_HIDDEN = { opacity: 0, scale: 0.4 };
const LAYER_CLASS = 'pointer-events-none fixed inset-0 z-(--z-cursor)';
const FOLLOWER_CLASS = 'absolute top-0 left-0 will-change-transform';

function CursorLayer() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const { variant, label, isPressed, isVisible, ripples, removeRipple } = useCustomCursor({
    dotRef,
    ringRef,
    labelRef,
  });

  const ringScale = RING_SCALE[variant] * (isPressed ? PRESSED_RING_SCALE : 1);
  const layerVisibility = { opacity: isVisible ? 1 : 0 };

  // GSAP positions the follower wrappers; Framer Motion animates their children.
  return (
    <div aria-hidden="true">
      <motion.div className={`${LAYER_CLASS} mix-blend-difference`} initial={false} animate={layerVisibility}>
        {ripples.map((ripple) => (
          <CursorRipple key={ripple.id} ripple={ripple} onDone={removeRipple} />
        ))}

        <div ref={ringRef} className={FOLLOWER_CLASS}>
          <motion.span
            className="absolute -top-5 -left-5 block size-10 rounded-full border-[1.5px] border-cursor"
            initial={false}
            animate={{ scale: ringScale, opacity: variant === CURSOR_VARIANT.hidden ? 0 : 1 }}
          />
        </div>

        <div ref={dotRef} className={FOLLOWER_CLASS}>
          <motion.span
            className="absolute -top-0.75 -left-0.75 block size-1.5 rounded-full bg-cursor"
            initial={false}
            animate={{ opacity: DOT_VARIANTS.has(variant) ? 1 : 0, scale: isPressed ? PRESSED_DOT_SCALE : 1 }}
          />
        </div>
      </motion.div>

      {/* Labels sit on an unblended layer so the text stays legible on any background. */}
      <motion.div className={LAYER_CLASS} initial={false} animate={layerVisibility}>
        <div ref={labelRef} className={FOLLOWER_CLASS}>
          <AnimatePresence>
            {variant === CURSOR_VARIANT.label && (
              <motion.span
                key={label}
                className="absolute -top-10 -left-10 grid size-20 place-items-center rounded-full bg-accent text-sm font-bold tracking-wide text-accent-foreground uppercase"
                initial={LABEL_HIDDEN}
                animate={{ opacity: 1, scale: isPressed ? PRESSED_LABEL_SCALE : 1 }}
                exit={LABEL_HIDDEN}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Fine pointers only, and never when the visitor prefers reduced motion:
// in both cases the native cursor is left untouched.
export default function CustomCursor() {
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  if (!hasFinePointer || prefersReducedMotion) return null;
  return <CursorLayer />;
}
