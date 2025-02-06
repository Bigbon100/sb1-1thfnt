import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useMenuItems } from '../hooks/useMenuItems';
import { useCategorySelection } from '../hooks/useCategorySelection';
import { CategorySelect } from './CategorySelect';
import { PresetItemSelect } from './menu/PresetItemSelect';
import { MenuItemsList } from './menu/MenuItemsList';
import { PriceCalculation } from './PriceCalculation';
import { CustomerForm } from './CustomerForm';
import { SaveMenuButton } from './SaveMenuButton';
import { calculateTotalPrice } from '../utils/priceCalculator';
import type { CustomerInfo } from '../types/customer';

export default function MenuBuilder() {
  const { selectedItems, availableItems, loading, error, addItem, removeItem } = useMenuItems();
  const {
    selectedCategory,
    selectedSubcategory,
    handleCategoryChange,
    handleSubcategoryChange
  } = useCategorySelection('Vorspeisen');
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    date: '',
    hasDeliveryAddress: false
  });

  const priceCalculation = calculateTotalPrice(selectedItems);

  const handleClearCustomerInfo = () => {
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      date: '',
      hasDeliveryAddress: false,
      street: '',
      zipCode: '',
      city: '',
      deliveryName: '',
      deliveryStreet: '',
      deliveryZipCode: '',
      deliveryCity: ''
    });
  };

  const handleClearMenuItems = () => {
    if (window.confirm('Möchten Sie wirklich alle ausgewählten Gerichte löschen?')) {
      selectedItems.forEach(item => removeItem(item.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="https://image.jimcdn.com/app/cms/image/transf/dimension=400x10000:format=jpg/path/s50681800bfbfa8e4/image/i6901015a271efa6e/version/1676479330/image.jpg" 
            alt="Lavendel Partyservice" 
            className="h-32 mb-4"
          />
          <h1 className="text-3xl font-bold text-purple-800">Menü Builder</h1>
        </div>

        <CustomerForm 
          customerInfo={customerInfo}
          onCustomerInfoChange={setCustomerInfo}
          onClearCustomerInfo={handleClearCustomerInfo}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-700">Gerichte auswählen</h2>
              <CategorySelect
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={handleCategoryChange}
                onSubcategoryChange={handleSubcategoryChange}
              />
              <PresetItemSelect
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onItemSelect={addItem}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-purple-700">Ausgewählte Gerichte</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleClearMenuItems}
                  disabled={selectedItems.length === 0}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedItems.length > 0
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Trash2 size={20} />
                  Auswahl löschen
                </button>
                <SaveMenuButton
                  items={selectedItems}
                  customerInfo={customerInfo}
                  priceCalculation={priceCalculation}
                  disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.date}
                />
              </div>
            </div>
            
            <MenuItemsList items={selectedItems} onRemove={removeItem} />
            
            <div className="mt-16">
              <PriceCalculation calculation={priceCalculation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}