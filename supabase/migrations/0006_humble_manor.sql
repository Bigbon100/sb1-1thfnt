/*
  # Fix public access policies

  1. Changes
    - Drop existing policies
    - Add new public access policies
    - Remove email-based restrictions

  2. Security
    - Allow public access for basic operations
    - Maintain data integrity through constraints
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
DROP POLICY IF EXISTS "Customers can read own data" ON customers;
DROP POLICY IF EXISTS "Customers can update own data" ON customers;

-- Create new simplified policies
CREATE POLICY "Enable read access for all users"
  ON customers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON customers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
  ON customers FOR UPDATE
  TO public
  USING (true);

-- Create similar policies for orders
CREATE POLICY "Enable read access for all users"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Create similar policies for order_items
CREATE POLICY "Enable read access for all users"
  ON order_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);