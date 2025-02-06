import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { OrderHeader } from './order/OrderHeader';
import { CustomerInfo } from './order/CustomerInfo';
import { DeliveryInfo } from './order/DeliveryInfo';
import { OrderNotes } from './order/OrderNotes';
import { OrderItems } from './order/OrderItems';
import { OrderSummary } from './OrderSummary';
import type { Order } from '../../types/orders';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-purple-100 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-900">Auftragsdetails</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            aria-label="Details schließen"
          >
            <X className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <OrderHeader order={order} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <CustomerInfo customer={order.customer} />
            <DeliveryInfo customer={order.customer} />
          </div>

          <OrderNotes orderId={order.id} initialNotes={order.notes} />
          <OrderItems items={order.order_items} />
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  );
}