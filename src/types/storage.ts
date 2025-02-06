export interface UIState {
  selectedCategory: string;
  selectedSubcategory: string;
  scrollPosition: number;
}

export interface StorageState {
  menuItems: MenuItem[];
  customerInfo: CustomerInfo;
  uiState: UIState;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  unit: string;
  category: string;
  subcategory?: string;
  quantity?: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  date: string;
}