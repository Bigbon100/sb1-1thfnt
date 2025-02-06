import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface PresetItemSelectProps {
  selectedCategory: Category;
  selectedSubcategory: string;
  availableItems: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  loading?: boolean;
  error?: Error | null;
}

export function PresetItemSelect({
  selectedCategory,
  selectedSubcategory,
  availableItems,
  onItemSelect,
  loading = false,
  error = null
}: PresetItemSelectProps) {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const filteredItems = availableItems.filter(item => {
    if (item.category !== selectedCategory) return false;
    if (!item.subcategory) return true;
    if (selectedSubcategory) {
      return item.subcategory === selectedSubcategory;
    }
    return false;
  });

  const handleAdd = () => {
    const item = availableItems.find(item => item.id === selectedItemId);
    if (item) {
      onItemSelect({ ...item, quantity });
      setSelectedItemId('');
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Lade verfügbare Gerichte...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Fehler beim Laden der Gerichte: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <select
        value={selectedItemId}
        onChange={(e) => setSelectedItemId(e.target.value)}
        className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      >
        <option value="">-- Gericht auswählen --</option>
        {filteredItems.map(item => (
          <option key={item.id} value={item.id}>
            {item.name} - {item.price} {item.unit}
          </option>
        ))}
      </select>

      {selectedItemId && (
        <div className="flex gap-4">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
            Zum Menü hinzufügen
          </button>
        </div>
      )}
    </div>
  );
}