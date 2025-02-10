import React, { useState, useEffect } from 'react';
import { BackButton } from '../components/navigation/BackButton';
import { CategorySelect } from '../components/CategorySelect';
import { DishForm } from '../components/admin/DishForm';
import { DishCard } from '../components/admin/DishCard';
import { DeleteConfirmationModal } from '../components/admin/DeleteConfirmationModal';
import { useCategorySelection } from '../hooks/useCategorySelection';
import { PlusCircle, Loader } from 'lucide-react';
import { getDishes, createDish, updateDish, deleteDish } from '../lib/supabase/dishes';
import type { MenuItem } from '../types';

export default function DishManagement() {
  const {
    selectedCategory,
    selectedSubcategory,
    handleCategoryChange,
    handleSubcategoryChange
  } = useCategorySelection('Vorspeisen');

  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [deletingDish, setDeletingDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      const data = await getDishes();
      setDishes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load dishes'));
    } finally {
      setLoading(false);
    }
  };

  const handleAddDish = async (values: any) => {
    try {
      await createDish(values);
      await loadDishes();
      setShowForm(false);
    } catch (err) {
      console.error('Error adding dish:', err);
      alert('Failed to add dish');
    }
  };

  const handleUpdateDish = async (values: any) => {
    if (!editingDish) return;
    try {
      await updateDish(editingDish.id, values);
      await loadDishes();
      setEditingDish(null);
    } catch (err) {
      console.error('Error updating dish:', err);
      alert('Failed to update dish');
    }
  };

  const handleDeleteDish = async () => {
    if (!deletingDish) return;
    try {
      await deleteDish(deletingDish.id);
      await loadDishes();
      setDeletingDish(null);
    } catch (err) {
      console.error('Error deleting dish:', err);
      alert('Failed to delete dish');
    }
  };

  const filteredDishes = dishes.filter(dish => {
    if (dish.category !== selectedCategory) return false;
    if (!dish.subcategory) return true;
    if (selectedSubcategory) {
      return dish.subcategory === selectedSubcategory;
    }
    return false;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Fehler beim Laden</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">Gerichte Verwaltung</h1>
          <BackButton />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-purple-700">
                {editingDish ? 'Gericht bearbeiten' : 'Gerichte verwalten'}
              </h2>
              {!showForm && !editingDish && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <PlusCircle size={20} />
                  Gericht hinzufügen
                </button>
              )}
            </div>

            {(showForm || editingDish) ? (
              <DishForm
                initialValues={editingDish || undefined}
                onSubmit={editingDish ? handleUpdateDish : handleAddDish}
                onCancel={() => {
                  setShowForm(false);
                  setEditingDish(null);
                }}
                isEditing={!!editingDish}
              />
            ) : (
              <>
                <CategorySelect
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  onCategoryChange={handleCategoryChange}
                  onSubcategoryChange={handleSubcategoryChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full flex justify-center items-center py-12">
                      <Loader className="w-8 h-8 text-purple-600 animate-spin" />
                    </div>
                  ) : filteredDishes.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-purple-600">
                      Keine Gerichte in dieser Kategorie verfügbar
                    </div>
                  ) : (
                    filteredDishes.map(dish => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        onEdit={setEditingDish}
                        onDelete={setDeletingDish}
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {deletingDish && (
        <DeleteConfirmationModal
          dish={deletingDish}
          onConfirm={handleDeleteDish}
          onCancel={() => setDeletingDish(null)}
        />
      )}
    </div>
  );
}