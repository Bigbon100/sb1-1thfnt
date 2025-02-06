import React from 'react';
import { MapPin } from 'lucide-react';
import type { Order } from '../../../types/orders';

interface DeliveryInfoProps {
  customer: Order['customer'];
}

export function DeliveryInfo({ customer }: DeliveryInfoProps) {
  const hasDeliveryAddress = customer.has_delivery_address && customer.delivery_street;
  const showDefaultAddress = !hasDeliveryAddress && customer.street;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-900">Lieferinformationen</h3>
      <div className="space-y-3">
        {hasDeliveryAddress ? (
          <div className="space-y-2">
            {customer.delivery_name && (
              <p className="text-purple-600">{customer.delivery_name}</p>
            )}
            <div className="flex items-start gap-2 text-purple-600">
              <MapPin className="w-5 h-5 mt-1" />
              <div>
                <p>{customer.delivery_street}</p>
                <p>{customer.delivery_zip_code} {customer.delivery_city}</p>
              </div>
            </div>
          </div>
        ) : showDefaultAddress ? (
          <div className="flex items-start gap-2 text-purple-600">
            <MapPin className="w-5 h-5 mt-1" />
            <div>
              <p>{customer.street}</p>
              <p>{customer.zip_code} {customer.city}</p>
            </div>
          </div>
        ) : (
          <p className="text-purple-400 italic">Keine Lieferadresse angegeben</p>
        )}
      </div>
    </div>
  );
}