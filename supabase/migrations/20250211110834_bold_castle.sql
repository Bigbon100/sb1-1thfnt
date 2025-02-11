/*
  # Fix Row Level Security for Dishes Table

  1. Security
    - Drop existing RLS policies
    - Add new policies for public access to dishes table
    - Enable insert/update/delete for authenticated users
*/

-- First, drop any existing policies
DROP POLICY IF EXISTS "Dishes are viewable by everyone" ON dishes;

-- Enable RLS on dishes table (in case it's not already enabled)
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access for dishes"
  ON dishes FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to insert dishes"
  ON dishes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update dishes"
  ON dishes FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete dishes"
  ON dishes FOR DELETE
  TO authenticated
  USING (true);