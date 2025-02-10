/*
  # Add image URL to dishes table

  1. Changes
    - Add image_url column to dishes table
    - Add index for faster image URL lookups
*/

-- Add image_url column to dishes table
ALTER TABLE dishes
ADD COLUMN IF NOT EXISTS image_url text;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_dishes_image_url ON dishes(image_url);