import { useContext } from 'react';
import { SmoothScrollContext } from '@/lib/smoothScrollContext';

// { scrollTo(target), navigateTo(target), setLocked(isLocked) }
// `target` is an element or an element id.
export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) throw new Error('useSmoothScroll must be used inside <SmoothScrollProvider>');
  return context;
}
