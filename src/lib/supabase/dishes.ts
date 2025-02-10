import { supabase } from './client';
import type { MenuItem } from '../../types';

export async function createDish(dish: Omit<MenuItem, 'id'>) {
  const { data, error } = await supabase
    .from('dishes')
    .insert({
      name: dish.name,
      description: dish.description,
      category: dish.category,
      subcategory: dish.subcategory,
      base_price: parseFloat(dish.price),
      unit: dish.unit,
      image_url: dish.imageUrl
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDish(id: string, dish: Partial<MenuItem>) {
  const { data, error } = await supabase
    .from('dishes')
    .update({
      name: dish.name,
      description: dish.description,
      category: dish.category,
      subcategory: dish.subcategory,
      base_price: dish.price ? parseFloat(dish.price) : undefined,
      unit: dish.unit,
      image_url: dish.imageUrl
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDish(id: string) {
  const { error } = await supabase
    .from('dishes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getDishes() {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;
  return data.map(dish => ({
    id: dish.id,
    name: dish.name,
    description: dish.description || '',
    category: dish.category,
    subcategory: dish.subcategory || '',
    price: dish.base_price.toString(),
    unit: dish.unit,
    imageUrl: dish.image_url
  }));
}