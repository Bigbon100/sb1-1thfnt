import React from 'react';
import { MenuItem } from '../../types';
import { groupMenuItemsByCategory } from '../../utils/menuSorting';
import { MenuItemCard } from './MenuItemCard';

interface MenuItemsListProps {
  items: MenuItem[];
  onRemove: (id: string) => void;
}

export function MenuItemsList({ items, onRemove }: MenuItemsListProps) {
  const groupedItems = groupMenuItemsByCategory(items);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        categoryItems.length > 0 && (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-700">{category}</h3>
            <div className="space-y-2">
              {categoryItems.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}