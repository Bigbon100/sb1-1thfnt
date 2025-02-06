import { useState, useCallback, useEffect } from 'react';
import { MenuItem, Category } from '../types';
import { sortMenuItemsByCategory } from '../utils/menuSorting';
import { getDishes } from '../lib/supabase/queries';

export function useMenuItems() {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const dishes = await getDishes();
        setAvailableItems(dishes);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dishes'));
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, []);

  const addItem = useCallback((item: MenuItem) => {
    setSelectedItems(prevItems => {
      const newItems = [...prevItems, { ...item, id: crypto.randomUUID() }];
      return sortMenuItemsByCategory(newItems);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  return {
    selectedItems,
    availableItems,
    loading,
    error,
    addItem,
    removeItem
  };
}