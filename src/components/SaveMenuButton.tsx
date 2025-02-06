import React, { useState } from 'react';
import { Save, Download, Check, AlertCircle } from 'lucide-react';
import { createOrder } from '../lib/supabase/orders';
import { generatePDF } from '../utils/pdfGenerator';
import type { MenuItem } from '../types';
import type { CustomerInfo } from '../types/customer';
import type { PriceCalculation } from '../utils/priceCalculator';

interface SaveMenuButtonProps {
  items: MenuItem[];
  customerInfo: CustomerInfo;
  priceCalculation: PriceCalculation;
  disabled?: boolean;
}

export function SaveMenuButton({ items, customerInfo, priceCalculation, disabled }: SaveMenuButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    if (isSaving || disabled) return;
    
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await createOrder(items, customerInfo);
      setSaveStatus('success');
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to save menu:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (disabled) return;
    await generatePDF(items, priceCalculation, customerInfo);
  };

  return (
    <div className="flex items-center gap-3">
      {saveStatus === 'error' && (
        <span className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} />
          Speichern fehlgeschlagen
        </span>
      )}
      {saveStatus === 'success' && (
        <span className="bg-green-50 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Check size={18} />
          Erfolgreich gespeichert
        </span>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleDownloadPDF}
          disabled={disabled}
          className={`
            p-3 aspect-square rounded-lg font-medium flex items-center justify-center transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl
            disabled:bg-purple-400
          `}
          title="Als PDF herunterladen"
        >
          <Download size={20} />
        </button>
        <button
          onClick={handleSave}
          disabled={disabled || isSaving}
          className={`
            px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all
            ${isSaving ? 'bg-purple-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-700'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            text-white shadow-lg hover:shadow-xl
          `}
        >
          {isSaving ? (
            <>
              <Save size={20} className="animate-spin" />
              Speichern...
            </>
          ) : (
            <>
              <Save size={20} />
              Menü Speichern
            </>
          )}
        </button>
      </div>
    </div>
  );
}