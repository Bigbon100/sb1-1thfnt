import React from 'react';
import { Category, categories, subcategories } from '../../types';

interface DishFormProps {
  initialValues?: {
    id?: string;
    name: string;
    description: string;
    price: string;
    category: Category;
    subcategory: string;
    unit: string;
    imageUrl?: string;
  };
  onSubmit: (values: any) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export function DishForm({ initialValues, onSubmit, onCancel, isEditing = false }: DishFormProps) {
  const defaultValues = {
    name: '',
    description: '',
    price: '',
    category: 'Vorspeisen' as Category,
    subcategory: '',
    unit: '€ pp.',
    imageUrl: ''
  };

  const [values, setValues] = React.useState(initialValues || defaultValues);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={values.name || ''}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Bild URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl || ''}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Kategorie *
          </label>
          <select
            id="category"
            name="category"
            required
            value={values.category || 'Vorspeisen'}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
            Unterkategorie
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={values.subcategory || ''}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">-- Keine Unterkategorie --</option>
            {subcategories[values.category || 'Vorspeisen'].map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Preis *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            step="0.10"
            min="0"
            value={values.price || ''}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Einheit *
          </label>
          <select
            id="unit"
            name="unit"
            required
            value={values.unit || '€ pp.'}
            onChange={handleChange}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="€ pp.">€ pro Person</option>
            <option value="€ stk.">€ pro Stück</option>
            <option value="€">€ (Gesamt)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Beschreibung
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description || ''}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Speichern...' : isEditing ? 'Aktualisieren' : 'Hinzufügen'}
        </button>
      </div>
    </form>
  );
}