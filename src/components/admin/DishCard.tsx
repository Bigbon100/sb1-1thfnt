import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { MenuItem } from '../../types';

interface DishCardProps {
  dish: MenuItem;
  onEdit: (dish: MenuItem) => void;
  onDelete: (dish: MenuItem) => void;
}

export function DishCard({ dish, onEdit, onDelete }: DishCardProps) {
  const defaultImage = `https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80&w=400`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={dish.imageUrl || defaultImage}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-purple-900">{dish.name}</h3>
          {dish.description && (
            <p className="text-sm text-purple-600 mt-1">{dish.description}</p>
          )}
          <div className="mt-2 space-y-1">
            <p className="text-sm text-purple-700">
              <span className="font-medium">Kategorie:</span> {dish.category}
              {dish.subcategory && ` > ${dish.subcategory}`}
            </p>
            <p className="text-purple-900 font-medium">
              {dish.price} {dish.unit}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(dish)}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Bearbeiten"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(dish)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Löschen"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}