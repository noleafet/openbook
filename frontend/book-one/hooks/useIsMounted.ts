import { useSyncExternalStore } from 'react';

// Always return a stable no-op function for subscribe
const emptySubscribe = () => () => {};

export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // getSnapshot: Value on the browser/client
    () => false  // getServerSnapshot: Value on the server
  );
}