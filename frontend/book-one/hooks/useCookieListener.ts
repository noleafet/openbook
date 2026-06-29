'use client';

import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

type CookieStatus = 'created' | 'updated' | 'deleted';

/**
 * Reusable hook that polls for a cookie and runs a callback when it becomes available or changes.
 * @param cookieName - The name of the cookie to watch.
 * @param onChange - Callback function executed with the new value and the type of change.
 * @param pollInterval - How often to check for the cookie in milliseconds (default: 200ms).
 */
export function useCookieListener(
  cookieName: string,
  onChange: (value: string | undefined, status: CookieStatus) => void,
  pollInterval = 200
) {
  const callbackRef = useRef(onChange);
  const lastValueRef = useRef<string | undefined>(undefined);

  // Safely update the ref AFTER the render phase completes
  useEffect(() => {
    callbackRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check immediately on component mount
    const initialValue = Cookies.get(cookieName);
    if (initialValue !== undefined) {
      lastValueRef.current = initialValue;
      callbackRef.current(initialValue, 'created');
    }

    // Set up the polling mechanism
    const intervalId = setInterval(() => {
      const currentValue = Cookies.get(cookieName);

      // Scenario 1: Cookie is new or its value changed
      if (currentValue !== undefined && currentValue !== lastValueRef.current) {
        const status: CookieStatus = lastValueRef.current === undefined ? 'created' : 'updated';
        lastValueRef.current = currentValue;
        callbackRef.current(currentValue, status);
      } 
      // Scenario 2: Cookie was deleted FIX
      else if (currentValue === undefined && lastValueRef.current !== undefined) {
        lastValueRef.current = undefined;
        callbackRef.current(undefined, 'deleted'); // Triggers when deleted
      }
    }, pollInterval);

    return () => clearInterval(intervalId);
  }, [cookieName, pollInterval]);
}
