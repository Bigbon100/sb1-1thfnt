import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import type { Order } from '../../../types/orders';

interface CustomerInfoProps {
  customer: Order['customer'];
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-900">Kundendaten</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-purple-600">
          <User className="w-5 h-5" />
          <span>{customer.full_name}</span>
        </div>
        <div className="flex items-center gap-2 text-purple-600">
          <Mail className="w-5 h-5" />
          <span>{customer.email}</span>
        </div>
        {customer.phone && (
          <div className="flex items-center gap-2 text-purple-600">
            <Phone className="w-5 h-5" />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.street && (
          <div className="space-y-1 text-purple-600 pl-7">
            <p>{customer.street}</p>
            <p>{customer.zip_code} {customer.city}</p>
          </div>
        )}
      </div>
    </div>
  );
}