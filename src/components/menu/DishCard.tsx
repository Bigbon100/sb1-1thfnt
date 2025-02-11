import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { MenuItem } from '../../types';

interface DishCardProps {
  dish: MenuItem;
  onSelect: (dish: MenuItem) => void;
}

export function DishCard({ dish, onSelect }: DishCardProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    onSelect({ ...dish, quantity });
    setQuantity(1);
  };

  // Default image based on category if no imageUrl is provided
  const getDefaultImage = (category: string) => {
    switch (category) {
      case 'Vorspeisen':
        return 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=400';
      case 'Hauptspeisen':
        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400';
      case 'Salate':
        return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400';
      case 'Fingerfood':
        return 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=400';
      case 'Nachspeisen':
        return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400';
      default:
        return 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80&w=400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={dish.imageUrl || getDefaultImage(dish.category)}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-purple-900">{dish.name}</h3>
          {dish.description && (
            <p className="text-sm text-purple-600 mt-1">{dish.description}</p>
          )}
          <p className="text-purple-900 font-medium mt-2">
            {dish.price} {dish.unit}
          </p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-24 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            {Array.from({ length: 500 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}