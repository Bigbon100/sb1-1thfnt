/*
  # Create customers table

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `auth_id` (uuid, references auth.users)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `street` (text)
      - `zip_code` (text)
      - `city` (text)
      - `created_at` (timestamp)
      - `last_order_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Read their own data
      - Update their own data
*/

CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  street text,
  zip_code text,
  city text,
  created_at timestamptz DEFAULT now(),
  last_order_at timestamptz,
  UNIQUE(auth_id),
  UNIQUE(email)
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own customer data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own customer data"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);