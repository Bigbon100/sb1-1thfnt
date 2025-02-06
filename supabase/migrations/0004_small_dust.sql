/*
  # Add delivery address fields to customers table

  1. Changes
    Add new columns to customers table:
    - `delivery_name` (text)
    - `delivery_street` (text)
    - `delivery_zip_code` (text)
    - `delivery_city` (text)
    - `has_delivery_address` (boolean)

  2. Security
    - Existing RLS policies will cover the new fields
*/

ALTER TABLE customers
ADD COLUMN delivery_name text,
ADD COLUMN delivery_street text,
ADD COLUMN delivery_zip_code text,
ADD COLUMN delivery_city text,
ADD COLUMN has_delivery_address boolean DEFAULT false;