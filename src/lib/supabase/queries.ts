import { supabase } from './client';
import type { MenuItem } from '../../types';

export async function getCustomerOrders(customerId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        dish:dishes (
          name,
          description
        )
      )
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getDishes(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('is_available', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;

  return data.map(dish => ({
    id: dish.id,
    name: dish.name,
    description: dish.description || undefined,
    price: dish.base_price.toString(),
    unit: dish.unit,
    category: dish.category as any,
    subcategory: dish.subcategory || undefined,
  }));
}