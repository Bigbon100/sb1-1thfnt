export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  date: string;
  // Customer address fields
  street?: string;
  zipCode?: string;
  city?: string;
  // Delivery address fields
  hasDeliveryAddress: boolean;
  deliveryName?: string;
  deliveryStreet?: string;
  deliveryZipCode?: string;
  deliveryCity?: string;
}