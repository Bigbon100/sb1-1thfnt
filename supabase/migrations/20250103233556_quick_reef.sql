/*
  # Add notes and delivery date to orders

  1. Changes
    - Add `notes` column to orders table for storing customer notes
    - Add `delivery_date` column to orders table
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE orders
ADD COLUMN notes text,
ADD COLUMN delivery_date timestamptz;