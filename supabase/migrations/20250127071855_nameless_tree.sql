/*
  # Update order references

  1. Changes
    - Updates trigger functions to use gross_total instead of total_amount
    - Updates existing policies to use correct column names
*/

-- Drop existing trigger function
DROP FUNCTION IF EXISTS update_order_total CASCADE;

-- Create new trigger function with correct column names
CREATE OR REPLACE FUNCTION update_order_totals()
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
  WHERE order_id = NEW.order_id;

  -- Calculate VAT and gross total
  calculated_vat_amount := ROUND(calculated_net_total * 0.07, 2);
  calculated_gross_total := calculated_net_total + calculated_vat_amount;

  -- Update the order with calculated values
  UPDATE orders
  SET 
    net_total = calculated_net_total,
    vat_amount = calculated_vat_amount,
    gross_total = calculated_gross_total
  WHERE id = NEW.order_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger
CREATE TRIGGER update_order_totals
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_order_totals();