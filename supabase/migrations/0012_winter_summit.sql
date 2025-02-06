/*
  # Remove dish_id foreign key constraint

  1. Changes
    - Remove foreign key constraint from order_items table
    - Make dish_id nullable since we store item details directly
  
  2. Reasoning
    - We store complete item information in order_items
    - No need to maintain referential integrity with dishes table
    - Allows for custom/one-off menu items
*/

-- Remove the foreign key constraint
ALTER TABLE order_items
DROP CONSTRAINT IF EXISTS order_items_dish_id_fkey;

-- Make dish_id nullable
ALTER TABLE order_items
ALTER COLUMN dish_id DROP NOT NULL;