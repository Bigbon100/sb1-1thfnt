import React, { useState, useCallback, useEffect } from 'react';
import { StickyNote } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';
import { debounce } from '../../../utils/debounce';

interface OrderNotesProps {
  orderId: string;
  initialNotes: string | null;
}

export function OrderNotes({ orderId, initialNotes }: OrderNotesProps) {
  const [notes, setNotes] = useState(initialNotes || '');

  const saveNotes = useCallback(async (value: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ notes: value })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, [orderId]);

  const debouncedSave = useCallback(debounce(saveNotes, 500), [saveNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    debouncedSave(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <StickyNote className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-purple-900">Notizen</h3>
      </div>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Notizen zur Bestellung hinzufügen..."
        className="w-full h-32 rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 resize-none"
      />
    </div>
  );
}