import { supabase } from './client';
import type { MenuItem } from '../../types';
import type { CustomerInfo } from '../../types/customer';
import { calculateOrderTotals } from '../../utils/orderCalculations';

export async function createOrder(items: MenuItem[], customerInfo: CustomerInfo) {
  try {
    // Start by upserting customer information
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert({
        full_name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        street: customerInfo.street || null,
        zip_code: customerInfo.zipCode || null,
        city: customerInfo.city || null,
        delivery_name: customerInfo.deliveryName || null,
        delivery_street: customerInfo.deliveryStreet || null,
        delivery_zip_code: customerInfo.deliveryZipCode || null,
        delivery_city: customerInfo.deliveryCity || null,
        has_delivery_address: customerInfo.hasDeliveryAddress,
        last_order_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (customerError) throw customerError;

    // Calculate order totals
    const orderItems = items.map(item => ({
      quantity: item.quantity || 1,
      unit_price: parseFloat(item.price)
    }));
    
    const { netTotal, vatAmount, grossTotal } = calculateOrderTotals(orderItems);

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customer.id,
        net_total: netTotal,
        vat_amount: vatAmount,
        gross_total: grossTotal,
        status: 'pending',
        created_at: new Date().toISOString(),
        delivery_date: customerInfo.date
      })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItemsData = items.map(item => ({
      order_id: order.id,
      quantity: item.quantity || 1,
      unit_price: parseFloat(item.price),
      name: item.name,
      description: item.description || null,
      category: item.category,
      subcategory: item.subcategory || null,
      unit: item.unit
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) throw itemsError;

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}