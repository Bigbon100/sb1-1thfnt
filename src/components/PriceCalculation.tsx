import React from 'react';
import { Euro } from 'lucide-react';
import type { PriceCalculation } from '../utils/priceCalculator';

interface PriceCalculationProps {
  calculation: PriceCalculation;
}

export function PriceCalculation({ calculation }: PriceCalculationProps) {
  return (
    <div className="bg-purple-50 p-4 rounded-lg space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-purple-600">
          <span>Nettobetrag ({calculation.itemCount} Artikel):</span>
          <span>{calculation.netTotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-purple-600">
          <span>MwSt. (7%):</span>
          <span>{calculation.vatAmount.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-purple-800">
          <span>Gesamtbetrag:</span>
          <span className="flex items-center gap-1">
            <Euro size={20} />
            {calculation.grossTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}