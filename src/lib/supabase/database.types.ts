export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          auth_id: string
          full_name: string
          email: string
          phone: string | null
          street: string | null
          zip_code: string | null
          city: string | null
          delivery_name: string | null
          delivery_street: string | null
          delivery_zip_code: string | null
          delivery_city: string | null
          has_delivery_address: boolean
          created_at: string
          last_order_at: string | null
        }
        Insert: {
          id?: string
          auth_id: string
          full_name: string
          email: string
          phone?: string | null
          street?: string | null
          zip_code?: string | null
          city?: string | null
          delivery_name?: string | null
          delivery_street?: string | null
          delivery_zip_code?: string | null
          delivery_city?: string | null
          has_delivery_address?: boolean
          created_at?: string
          last_order_at?: string | null
        }
        Update: {
          id?: string
          auth_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          street?: string | null
          zip_code?: string | null
          city?: string | null
          delivery_name?: string | null
          delivery_street?: string | null
          delivery_zip_code?: string | null
          delivery_city?: string | null
          has_delivery_address?: boolean
          created_at?: string
          last_order_at?: string | null
        }
      }
      // ... other tables
    }
  }
}