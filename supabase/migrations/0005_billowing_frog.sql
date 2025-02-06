/*
  # Update customer table policies

  1. Changes
    - Add policy to allow public inserts into customers table
    - Remove auth_id requirement for customers
    - Update existing policies

  2. Security
    - Enable RLS on customers table
    - Allow public to insert new customers
    - Allow customers to read/update their own data
*/

-- Remove auth_id requirement and foreign key constraint
ALTER TABLE customers 
  ALTER COLUMN auth_id DROP NOT NULL,
  DROP CONSTRAINT customers_auth_id_fkey;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own customer data" ON customers;
DROP POLICY IF EXISTS "Users can update own customer data" ON customers;

-- Create new policies
CREATE POLICY "Anyone can create customers"
  ON customers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers can read own data"
  ON customers
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');

CREATE POLICY "Customers can update own data"
  ON customers
  FOR UPDATE
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');