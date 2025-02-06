import { useEffect, useCallback } from 'react';
import { debounce } from '../utils/debounce';

export function useScrollPosition() {
  // Restore scroll position on mount
  useEffect(() => {
    try {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    } catch (error) {
      console.error('Error restoring scroll position:', error);
    }
  }, []);

  // Save scroll position on scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      try {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      } catch (error) {
        console.error('Error saving scroll position:', error);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}