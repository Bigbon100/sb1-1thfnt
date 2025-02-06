import { useState, useCallback } from 'react';
import { Category } from '../types';

export function useCategorySelection(initialCategory: Category) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  }, []);

  const handleSubcategoryChange = useCallback((subcategory: string) => {
    setSelectedSubcategory(subcategory);
  }, []);

  return {
    selectedCategory,
    selectedSubcategory,
    handleCategoryChange,
    handleSubcategoryChange
  };
}