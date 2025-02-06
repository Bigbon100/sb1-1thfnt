import { MenuItem, Category, categories } from '../types';

// Sort menu items based on category order defined in types.ts
export function sortMenuItemsByCategory(items: MenuItem[]): MenuItem[] {
  return [...items].sort((a, b) => {
    const categoryIndexA = categories.indexOf(a.category);
    const categoryIndexB = categories.indexOf(b.category);
    return categoryIndexA - categoryIndexB;
  });
}

// Group menu items by category maintaining the defined category order
export function groupMenuItemsByCategory(items: MenuItem[]): Record<Category, MenuItem[]> {
  const grouped = {} as Record<Category, MenuItem[]>;
  
  // Initialize all categories with empty arrays
  categories.forEach(category => {
    grouped[category] = [];
  });

  // Fill in the items
  items.forEach(item => {
    grouped[item.category].push(item);
  });

  return grouped;
}