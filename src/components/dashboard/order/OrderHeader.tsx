import React from 'react';
import { Calendar, Package } from 'lucide-react';
import type { Order } from '../../../types/orders';

interface OrderHeaderProps {
  order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ausstehend';
      case 'confirmed': return 'Bestätigt';
      case 'preparing': return 'In Vorbereitung';
      case 'ready': return 'Fertig';
      case 'delivered': return 'Geliefert';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-600">
          <Calendar className="w-5 h-5" />
          <span>Erstellt am: {formatDate(order.created_at)}</span>
        </div>
        {order.delivery_date && (
          <div className="flex items-center gap-2 text-purple-600">
            <Package className="w-5 h-5" />
            <span>Lieferung am: {formatDate(order.delivery_date)}</span>
          </div>
        )}
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
        {getStatusText(order.status)}
      </span>
    </div>
  );
}