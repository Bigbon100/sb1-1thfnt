import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category } from '../types';

interface MenuItemFormProps {
  onAdd: (item: {
    name: string;
    description?: string;
    price: string;
    unit: string;
    category: Category;
    subcategory?: string;
  }) => void;
  selectedCategory: Category;
  selectedSubcategory: string;
}

export function MenuItemForm({ onAdd, selectedCategory, selectedSubcategory }: MenuItemFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('€ pp.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    onAdd({
      name: name.trim(),
      description: description.trim() || undefined,
      price: price.trim(),
      unit,
      category: selectedCategory,
      subcategory: selectedSubcategory || undefined,
    });

    setName('');
    setDescription('');
    setPrice('');
    setUnit('€ pp.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name des Gerichts..."
          className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beschreibung (optional)..."
          className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      
      <div className="flex gap-2">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preis..."
          step="0.10"
          min="0"
          className="w-1/2 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
        
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-1/2 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="€ pp.">€ pro Person</option>
          <option value="€ stk.">€ pro Stück</option>
          <option value="€">€ (Gesamt)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} /> Hinzufügen
      </button>
    </form>
  );
}