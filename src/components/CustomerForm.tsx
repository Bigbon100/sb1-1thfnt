import React from 'react';
import { CustomerInfo } from '../types/customer';
import { AddressFields } from './address/AddressFields';
import { Trash2 } from 'lucide-react';
import { useSessionStorage } from '../hooks/useSessionStorage';

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
  onClearCustomerInfo: () => void;
}

export function CustomerForm({ customerInfo, onCustomerInfoChange, onClearCustomerInfo }: CustomerFormProps) {
  // Use session storage for form data persistence
  const [storedInfo, setStoredInfo] = useSessionStorage('customerInfo', customerInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newInfo = {
      ...customerInfo,
      [name]: type === 'checkbox' ? checked : value,
    };
    onCustomerInfoChange(newInfo);
    setStoredInfo(newInfo);
  };

  const handleAddressChange = (field: string, value: string) => {
    const newInfo = {
      ...customerInfo,
      [field]: value,
    };
    onCustomerInfoChange(newInfo);
    setStoredInfo(newInfo);
  };

  const handleClearForm = () => {
    if (window.confirm('Möchten Sie wirklich alle Kundeninformationen löschen?')) {
      onClearCustomerInfo();
      setStoredInfo({
        name: '',
        email: '',
        phone: '',
        date: '',
        hasDeliveryAddress: false
      });
    }
  };

  const hasEntries = customerInfo.name || customerInfo.email || customerInfo.phone || customerInfo.date ||
    customerInfo.street || customerInfo.zipCode || customerInfo.city ||
    (customerInfo.hasDeliveryAddress && (customerInfo.deliveryName || customerInfo.deliveryStreet || 
    customerInfo.deliveryZipCode || customerInfo.deliveryCity));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-purple-700">Ihre Kontaktdaten</h2>
        <button
          onClick={handleClearForm}
          disabled={!hasEntries}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            hasEntries 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 size={20} />
          Einträge löschen
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={customerInfo.name}
              onChange={handleChange}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Vor- und Nachname"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={customerInfo.email}
              onChange={handleChange}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="ihre@email.de"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={customerInfo.phone}
              onChange={handleChange}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="0123 456789"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Datum der Veranstaltung *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={customerInfo.date}
              onChange={handleChange}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <AddressFields
            label="Kundenadresse"
            street={customerInfo.street || ''}
            zipCode={customerInfo.zipCode || ''}
            city={customerInfo.city || ''}
            onChange={handleAddressChange}
          />
        </div>

        <div className="border-t pt-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="hasDeliveryAddress"
              checked={customerInfo.hasDeliveryAddress}
              onChange={handleChange}
              className="rounded border-purple-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Lieferadresse weicht von der Kundenadresse ab
            </span>
          </label>
        </div>

        {customerInfo.hasDeliveryAddress && (
          <div className="transition-all duration-300 ease-in-out">
            <div className="border-t pt-6">
              <div className="mb-4">
                <label htmlFor="deliveryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name für Lieferung
                </label>
                <input
                  type="text"
                  id="deliveryName"
                  name="deliveryName"
                  value={customerInfo.deliveryName || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Name für die Lieferung"
                />
              </div>
              <AddressFields
                prefix="delivery"
                label="Lieferadresse"
                street={customerInfo.deliveryStreet || ''}
                zipCode={customerInfo.deliveryZipCode || ''}
                city={customerInfo.deliveryCity || ''}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}