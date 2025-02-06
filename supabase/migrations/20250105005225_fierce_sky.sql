/*
  # Add order totals columns

  1. New Columns
    - `net_total` (decimal): Total before VAT
    - `vat_amount` (decimal): VAT amount (7%)
    - `gross_total` (decimal): Total including VAT

  2. Changes
    - Add new columns with NOT NULL constraints and default values
    - Update existing orders to calculate the new totals
    - Rename existing total_amount to gross_total for consistency
*/

-- Add new columns
ALTER TABLE orders
ADD COLUMN net_total decimal(10,2) NOT NULL DEFAULT 0,
ADD COLUMN vat_amount decimal(10,2) NOT NULL DEFAULT 0;

-- Rename total_amount to gross_total
ALTER TABLE orders 
RENAME COLUMN total_amount TO gross_total;

-- Update existing orders
UPDATE orders
SET 
  net_total = ROUND(gross_total / 1.07, 2),
  vat_amount = ROUND(gross_total - (gross_total / 1.07), 2);

-- Create function to automatically calculate totals
CREATE OR REPLACE FUNCTION calculate_order_totals()
RETURNS TRIGGER AS $$
DECLARE
  calculated_net_total decimal(10,2);
  calculated_vat_amount decimal(10,2);
  calculated_gross_total decimal(10,2);
BEGIN
  -- Calculate net total from order items
  SELECT COALESCE(SUM(quantity * unit_price), 0)
  INTO calculated_net_total
  FROM order_items
  WHERE order_id = NEW.id;

  -- Calculate VAT and gross total
  calculated_vat_amount := ROUND(calculated_net_total * 0.07, 2);
  calculated_gross_total := calculated_net_total + calculated_vat_amount;

  -- Update the order with calculated values
  NEW.net_total := calculated_net_total;
  NEW.vat_amount := calculated_vat_amount;
  NEW.gross_total := calculated_gross_total;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;