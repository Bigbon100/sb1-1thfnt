/*
  # Add item details to order_items

  1. Changes
    - Add columns to order_items table to store item details
    - Add performance indexes
  
  2. New Columns
    - name: Item name (text, NOT NULL)
    - description: Item description (text, nullable)
    - category: Item category (text, NOT NULL)
    - subcategory: Item subcategory (text, nullable)
    - unit: Item unit (text, NOT NULL)
*/

-- Add new columns to order_items table to store item details
ALTER TABLE order_items
ADD COLUMN IF NOT EXISTS name text NOT NULL,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS category text NOT NULL,
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS unit text NOT NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_order_items_category ON order_items(category);
CREATE INDEX IF NOT EXISTS idx_order_items_name ON order_items(name);