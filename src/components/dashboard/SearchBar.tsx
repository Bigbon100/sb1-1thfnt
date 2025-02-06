import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Aufträge nach Namen oder ID durchsuchen..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
      />
    </div>
  );
}