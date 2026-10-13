import { motion } from 'framer-motion';

const RIPPLE_START = { scale: 0, opacity: 0.9 };
const RIPPLE_END = { scale: 1, opacity: 0 };

// One ink burst expanding from the click point; removes itself when finished.
export default function CursorRipple({ ripple, onDone }) {
  return (
    <motion.span
      className="absolute top-0 left-0 -mt-12 -ml-12 block size-24 rounded-full bg-cursor"
      style={{ x: ripple.x, y: ripple.y }}
      initial={RIPPLE_START}
      animate={RIPPLE_END}
      onAnimationComplete={() => onDone(ripple.id)}
    />
  );
}
