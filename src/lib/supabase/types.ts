export type Customer = {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  street: string | null;
  zip_code: string | null;
  city: string | null;
  created_at: string;
  last_order_at: string | null;
};

export type Dish = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  base_price: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  customer_id: string;
  gross_total: number;
  special_instructions: string | null;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  dish_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};