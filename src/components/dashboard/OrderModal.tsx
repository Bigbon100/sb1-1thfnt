import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, User } from 'lucide-react';
import type { Order } from '../../types/orders';

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderModal({ order, onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-purple-800">Auftragsdetails</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Kundendaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="text-purple-600 w-5 h-5" />
                <span>{order.customer.full_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-purple-600 w-5 h-5" />
                <span>{order.customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-purple-600 w-5 h-5" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-purple-600 w-5 h-5" />
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Menü</h3>
            <div className="space-y-2">
              {order.order_items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-purple-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-purple-900">{item.name}</p>
                    {item.description && (
                      <p className="text-sm text-purple-600">{item.description}</p>
                    )}
                    <p className="text-sm text-purple-600">
                      Menge: {item.quantity}x {item.unit}
                    </p>
                  </div>
                  <p className="font-semibold text-purple-800">
                    €{(item.unit_price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-purple-100">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-purple-900">Gesamtbetrag</span>
              <span className="text-xl font-bold text-purple-800">
                €{order.gross_total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}