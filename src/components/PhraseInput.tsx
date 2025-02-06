import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

type PhraseInputProps = {
  onAdd: (text: string) => void;
};

export function PhraseInput({ onAdd }: PhraseInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter custom text..."
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        <PlusCircle size={20} />
        Add Text
      </button>
    </div>
  );
}