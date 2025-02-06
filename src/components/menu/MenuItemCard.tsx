import React from 'react';
import { Trash2 } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onRemove: (id: string) => void;
}

export function MenuItemCard({ item, onRemove }: MenuItemCardProps) {
  return (
    <div className="flex justify-between items-start p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors ml-2">
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
  );
}