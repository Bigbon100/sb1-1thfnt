import React from 'react';
import { DishCard } from './DishCard';
import type { MenuItem } from '../../types';

interface DishGridProps {
  dishes: MenuItem[];
  onSelect: (dish: MenuItem) => void;
}

export function DishGrid({ dishes, onSelect }: DishGridProps) {
  if (dishes.length === 0) {
    return (
      <div className="text-center py-8 text-purple-600">
        Keine Gerichte in dieser Kategorie verfügbar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map(dish => (
        <DishCard
          key={dish.id}
          dish={dish}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}