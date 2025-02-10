import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { MenuItem } from '../../types';

interface DeleteConfirmationModalProps {
  dish: MenuItem;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteConfirmationModal({ dish, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-4 text-red-600 mb-4">
          <AlertTriangle size={24} />
          <h2 className="text-xl font-semibold">Gericht löschen</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Sind Sie sicher, dass Sie das Gericht "{dish.name}" löschen möchten? 
          Diese Aktion kann nicht rückgängig gemacht werden.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Löschen...' : 'Löschen'}
          </button>
        </div>
      </div>
    </div>
  );
}