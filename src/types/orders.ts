export interface Order {
  id: string;
  customer_id: string;
  net_total: number;
  vat_amount: number;
  gross_total: number;
  special_instructions: string | null;
  notes: string | null;
  delivery_date: string | null;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
  customer: {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    street: string | null;
    zip_code: string | null;
    city: string | null;
    delivery_name: string | null;
    delivery_street: string | null;
    delivery_zip_code: string | null;
    delivery_city: string | null;
    has_delivery_address: boolean;
  };
  order_items: Array<{
    id: string;
    quantity: number;
    unit_price: number;
    name: string;
    description: string | null;
    category: string;
    subcategory: string | null;
    unit: string;
  }>;
}