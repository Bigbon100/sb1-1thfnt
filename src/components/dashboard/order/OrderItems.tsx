import React from 'react';
import type { Order } from '../../../types/orders';

interface OrderItemsProps {
  items: Order['order_items'];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-900">Bestellte Artikel</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-purple-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-medium text-purple-900">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-purple-600">{item.description}</p>
                )}
                <p className="text-sm text-purple-600">
                  {item.quantity}x {item.unit}
                </p>
              </div>
              <p className="font-semibold text-purple-900">
                €{(item.unit_price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}