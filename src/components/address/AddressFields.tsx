import React from 'react';

interface AddressFieldsProps {
  prefix?: string;
  label?: string;
  street: string;
  zipCode: string;
  city: string;
  onChange: (field: string, value: string) => void;
}

export function AddressFields({
  prefix = '',
  label = 'Address',
  street,
  zipCode,
  city,
  onChange,
}: AddressFieldsProps) {
  const fieldPrefix = prefix ? `${prefix}` : '';

  return (
    <div className="space-y-4">
      {label && (
        <h3 className="font-medium text-gray-700">{label}</h3>
      )}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor={`${fieldPrefix}street`} className="block text-sm font-medium text-gray-700 mb-1">
            Straße und Hausnummer
          </label>
          <input
            type="text"
            id={`${fieldPrefix}street`}
            name={`${fieldPrefix}street`}
            value={street}
            onChange={(e) => onChange(`${fieldPrefix}street`, e.target.value)}
            className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Straße und Hausnummer"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${fieldPrefix}zipCode`} className="block text-sm font-medium text-gray-700 mb-1">
              Postleitzahl
            </label>
            <input
              type="text"
              id={`${fieldPrefix}zipCode`}
              name={`${fieldPrefix}zipCode`}
              value={zipCode}
              onChange={(e) => onChange(`${fieldPrefix}zipCode`, e.target.value)}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Postleitzahl"
            />
          </div>
          <div>
            <label htmlFor={`${fieldPrefix}city`} className="block text-sm font-medium text-gray-700 mb-1">
              Stadt
            </label>
            <input
              type="text"
              id={`${fieldPrefix}city`}
              name={`${fieldPrefix}city`}
              value={city}
              onChange={(e) => onChange(`${fieldPrefix}city`, e.target.value)}
              className="w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Stadt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}