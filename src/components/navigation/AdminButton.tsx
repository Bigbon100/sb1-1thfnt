import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export function AdminButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin')}
      className="fixed top-20 right-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg"
    >
      <Settings size={20} />
      Admin
    </button>
  );
}