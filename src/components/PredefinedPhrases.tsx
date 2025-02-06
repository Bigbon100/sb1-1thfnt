import React from 'react';

type PredefinedPhrasesProps = {
  phrases: Record<string, string[]>;
  selectedPhrase: string;
  onSelect: (phrase: string) => void;
  onAdd: () => void;
};

export function PredefinedPhrases({ phrases, selectedPhrase, onSelect, onAdd }: PredefinedPhrasesProps) {
  return (
    <div className="flex gap-4">
      <select 
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={selectedPhrase}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select a predefined phrase...</option>
        {Object.entries(phrases).map(([category, categoryPhrases]) => (
          <optgroup key={category} label={category}>
            {categoryPhrases.map((phrase) => (
              <option key={phrase} value={phrase}>{phrase}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <button
        onClick={onAdd}
        disabled={!selectedPhrase}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Selected
      </button>
    </div>
  );
}