import { useCallback, useSyncExternalStore } from 'react';

// Live boolean for a CSS media query, e.g. useMediaQuery('(pointer: fine)').
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}
