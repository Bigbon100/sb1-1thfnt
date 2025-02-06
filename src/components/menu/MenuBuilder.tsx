import React from 'react';
import { Save } from 'lucide-react';
import { useMenuItems } from '../../hooks/useMenuItems';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import { CategorySelect } from '../CategorySelect';
import { PresetItemSelect } from './PresetItemSelect';
import { MenuItemsList } from './MenuItemsList';
import { PriceCalculation } from '../PriceCalculation';
import { CustomerForm } from '../CustomerForm';
import { generatePDF } from '../../utils/pdfGenerator';
import { calculateTotalPrice } from '../../utils/priceCalculator';
import { CustomerInfo } from '../../types/customer';
import { useState } from 'react';

export default function MenuBuilder() {
  const { selectedItems, addItem, removeItem } = useMenuItems();
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
  });

  const priceCalculation = calculateTotalPrice(selectedItems);

  const downloadMenu = async () => {
    await generatePDF(selectedItems, priceCalculation, customerInfo);
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
              <button
                onClick={downloadMenu}
                disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.date}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} /> Menü Speichern
              </button>
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