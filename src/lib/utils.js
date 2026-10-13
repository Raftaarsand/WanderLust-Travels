import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about the custom type-scale step, otherwise it reads
// `text-display` as a colour and drops it when merged with `text-primary`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display'] }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
