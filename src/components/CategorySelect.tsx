import React from 'react';
import { Category, categories, subcategories } from '../types';

interface CategorySelectProps {
  selectedCategory: Category;
  selectedSubcategory: string;
  onCategoryChange: (category: Category) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

export function CategorySelect({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: CategorySelectProps) {
  const availableSubcategories = subcategories[selectedCategory];

  return (
    <div className="flex gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category)}
        className="flex-1 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      
      {availableSubcategories.length > 0 && (
        <select
          value={selectedSubcategory}
          onChange={(e) => onSubcategoryChange(e.target.value)}
          className="flex-1 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">-- Unterkategorie wählen --</option>
          {availableSubcategories.map(subcategory => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
      )}
    </div>
  );
}