import { useState, useEffect } from 'react';

type StorageKey = 'menuState' | 'customerInfo' | 'uiState';

/**
 * Custom hook for managing session storage state
 */
export function useSessionStorage<T>(key: StorageKey, initialValue: T) {
  // Initialize state from session storage or default value
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage:`, error);
      return initialValue;
    }
  });

  // Update session storage when state changes
  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to sessionStorage:`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}