import React from 'react';
import { Trash2 } from 'lucide-react';
import type { MenuItem } from '../types';

interface MenuListProps {
  items: MenuItem[];
  onRemove: (id: string) => void;
}

export function MenuList({ items, onRemove }: MenuListProps) {
  const groupedItems = items.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) {
      acc[key] = {};
    }
    
    const subKey = item.subcategory || 'default';
    if (!acc[key][subKey]) {
      acc[key][subKey] = [];
    }
    
    acc[key][subKey].push(item);
    return acc;
  }, {} as Record<string, Record<string, MenuItem[]>>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, subcategories]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-700">{category}</h3>
          
          {Object.entries(subcategories).map(([subcategory, items]) => (
            <div key={subcategory} className="space-y-2">
              {subcategory !== 'default' && (
                <h4 className="font-medium text-purple-600 ml-2">{subcategory}</h4>
              )}
              
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-start p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors ml-2"
                >
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-purple-900">
                        {item.name} ({item.quantity}x)
                      </span>
                      <span className="text-purple-700">
                        {(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)} €
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-purple-600 mt-1">{item.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="ml-4 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}