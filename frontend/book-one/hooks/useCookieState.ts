import { useState } from 'react';
import Cookies from 'js-cookie';

export function useCookieState<T>(
  key: string,
  initialValue: T,
  options?: Cookies.CookieAttributes
): [T, (value: T | ((val: T) => T)) => void] {
  // Read and parse cookie data on initialization
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const cookieValue = Cookies.get(key);
      return cookieValue ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      console.error(`Error parsing cookie code for key "${key}":`, error);
      return initialValue;
    }
  });

  // Wrapped setter to update both React state and browser cookies
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);

      if (valueToStore === null || valueToStore === undefined) {
        Cookies.remove(key);
      } else {
        Cookies.set(key, JSON.stringify(valueToStore), options);
      }
    } catch (error) {
      console.error(`Error setting cookie for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
