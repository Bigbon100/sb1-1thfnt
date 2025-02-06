import React from 'react';
import { Calendar, User, Package, Truck } from 'lucide-react';
import type { Order } from '../../types/orders';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const formatDate = (date: string | null) => {
    if (!date) return 'Kein Datum';
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
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-purple-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <User className="text-purple-600 w-5 h-5" />
          <h3 className="font-semibold text-purple-900">{order.customer.full_name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      <div className="space-y-3 text-sm text-purple-600">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Erstellt am: {formatDate(order.created_at)}</span>
        </div>
        {order.delivery_date && (
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Lieferung am: {formatDate(order.delivery_date)}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4" />
          <span>{order.order_items.length} Artikel</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-100">
        <p className="text-right font-semibold text-purple-900">
          €{order.gross_total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}