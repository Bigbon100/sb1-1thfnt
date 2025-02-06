import React from 'react';
import { DollarSign } from 'lucide-react';
import type { Order } from '../../types/orders';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="border-t border-purple-100 pt-4">
      <div className="bg-purple-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center text-purple-700">
          <span>Nettobetrag</span>
          <span>€{order.net_total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-purple-700">
          <span>MwSt. (7%)</span>
          <span>€{order.vat_amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Gesamtbetrag
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            €{order.gross_total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}