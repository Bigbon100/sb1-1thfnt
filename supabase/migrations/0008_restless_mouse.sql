/*
  # Update dishes table schema and populate with menu items

  1. Schema Updates
    - Add `subcategory` column
    - Add `unit` column for price units (€ pp., € stk., etc.)
    - Add `quantity_increment` for minimum order quantities

  2. Data Population
    - Populate with all existing menu items
    - Maintain categorization and pricing
*/

-- Add new columns
ALTER TABLE dishes
ADD COLUMN subcategory text,
ADD COLUMN unit text NOT NULL DEFAULT '€ pp.',
ADD COLUMN quantity_increment integer NOT NULL DEFAULT 1;

-- Populate dishes table with menu items
INSERT INTO dishes (name, description, category, subcategory, base_price, unit) VALUES
-- Vorspeisen - Suppen
('Mercimek Çorbasi', 'Rote Linsen, Gemüse', 'Vorspeisen', 'Suppen', 6.60, '€ pp.'),
('Tomaten Suppe', 'Tomaten, Gemüse', 'Vorspeisen', 'Suppen', 6.50, '€ pp.'),
('Hühner Suppe', 'Hähnchen, Möhren, Erbsen (türkische Art)', 'Vorspeisen', 'Suppen', 6.70, '€ pp.'),

-- Vorspeisen - Mezeler
('Zaziki (Cacık)', 'Joghurt, Gurken, Knoblauch', 'Vorspeisen', 'Mezeler', 3.70, '€ pp.'),
('Möhren Salat', 'Geröstete Möhren, Olivenöl, Joghurt, Knoblauch, Dill, Walnuss', 'Vorspeisen', 'Mezeler', 6.60, '€ pp.'),
('Feinkost Tablet', 'Tarator, Hummus (vegan), Frischkäse oder Auberginen-Salat', 'Vorspeisen', 'Mezeler', 98.00, '€'),

-- Hauptspeisen - Fleischgerichte
('Izmir Köfte', 'Rindfleisch-Frikadelle, Kartoffel, Möhren, Tomaten-Knoblauch-Kräuter-Soße', 'Hauptspeisen', 'Fleischgerichte', 12.50, '€ pp.'),
('Içli Köfte', 'Gefüllte Frikadelle mit Rinderhackfleisch, Kräuter, Mandelbulgur', 'Hauptspeisen', 'Fleischgerichte', 6.30, '€ stk.'),
('Weiße Bohnen mit Rinderhackfleisch oder Rindfleisch', NULL, 'Hauptspeisen', 'Fleischgerichte', 12.50, '€ pp.'),
('Grüne Bohnen mit Rinderhackfleisch', 'Zwiebel, Paprika, Tomaten, Kräuter, Knoblauch', 'Hauptspeisen', 'Fleischgerichte', 13.80, '€ pp.'),
('Lammfleisch mit Gemüse', NULL, 'Hauptspeisen', 'Fleischgerichte', 16.60, '€ pp.'),
('Rindfleisch mit Gemüse', NULL, 'Hauptspeisen', 'Fleischgerichte', 14.70, '€ pp.'),
('Auberginen Auflauf mit Rindergehacktes', NULL, 'Hauptspeisen', 'Fleischgerichte', 14.70, '€ pp.'),
('Hähnchen Pfanne', 'Hähnchen, Gemüse, weiße Soße', 'Hauptspeisen', 'Fleischgerichte', 11.90, '€ pp.'),
('Hähnchen Schnitzel mit Wunschsoße', NULL, 'Hauptspeisen', 'Fleischgerichte', 9.80, '€ stk.'),
('Hähnchen Keule mariniert', NULL, 'Hauptspeisen', 'Fleischgerichte', 5.20, '€ stk.'),

-- Hauptspeisen - Vegetarische/Vegane Gerichte
('Gebratenes Gemüse', 'Paprika, Aubergine, Zucchini, Kartoffel, Möhren, Blumenkohl', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 11.50, '€ pp.'),
('Weiße Bohnen Eintopf', 'Zwiebel, Paprika, Tomaten, Kräuter, Knoblauch', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 9.90, '€ pp.'),
('Grüne Bohnen Eintopf', 'Zwiebel, Paprika, Tomaten, Kräuter, Knoblauch', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 12.90, '€ pp.'),
('Pilz Pfanne', NULL, 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 11.90, '€ pp.'),
('Auberginen Auflauf', 'Tomaten, Paprika, Zwiebel, Knoblauch, Kräuter', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 13.60, '€ pp.'),
('Zucchini Auflauf', NULL, 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 10.90, '€ pp.'),
('Nudel Auflauf', NULL, 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 9.90, '€ pp.'),
('Bandnudel mit Kräuter/Käse-Soße oder Butter/Kräuter', NULL, 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 7.90, '€ pp.'),
('Reis mit griechischen Nudeln (Pilav)', 'Reis, griechische Nudeln, Butter', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 5.70, '€ pp.'),
('Rosmarin Kartoffeln', 'Kartoffeln, Rosmarin', 'Hauptspeisen', 'Vegetarische/Vegane Gerichte', 5.40, '€ pp.'),

-- Salate
('Großes Salat Tablet der Saison mit Dressing', 'ca. 20 Personen', 'Salate', 'Alle', 98.00, '€'),
('Medium Salat Tablet der Saison mit Dressing', 'ca. 10 Personen', 'Salate', 'Alle', 55.00, '€'),
('Kartoffel Salat', 'pro Glas', 'Salate', 'Alle', 5.30, '€'),
('Kartoffel Salat', 'pro Schale', 'Salate', 'Alle', 5.70, '€'),
('Nudel Salat', 'Getrocknete Tomaten, Pesto, Basilikum (pro Glas)', 'Salate', 'Alle', 5.40, '€'),
('Nudel Salat', 'Getrocknete Tomaten, Pesto, Basilikum', 'Salate', 'Alle', 5.60, '€ pp.'),

-- Fingerfood - Teigspezialitäten
('Zigarren Börek', 'Blätterteig mit Feta-Käse, Petersilie', 'Fingerfood', 'Teigspezialitäten', 2.30, '€ stk.'),
('Mini Börek mit Käse', NULL, 'Fingerfood', 'Teigspezialitäten', 2.80, '€ stk.'),
('Mini Börek mit Spinat', NULL, 'Fingerfood', 'Teigspezialitäten', 2.90, '€ stk.'),
('Mini Börek mit Kartoffel', NULL, 'Fingerfood', 'Teigspezialitäten', 3.10, '€ stk.'),

-- Fingerfood - Fleisch Fingerfood
('Mini Hähnchenspieß', 'Soja-Soße, Ingwer, Ananas-Saft mariniert', 'Fingerfood', 'Fleisch Fingerfood', 3.20, '€ stk.'),
('Frikadellen Variationen', NULL, 'Fingerfood', 'Fleisch Fingerfood', 2.60, '€ stk.'),
('Panierte mini Hähnchenkeule/Schenkel', NULL, 'Fingerfood', 'Fleisch Fingerfood', 2.90, '€ stk.'),
('Mini Hähnchen Schnitzel', NULL, 'Fingerfood', 'Fleisch Fingerfood', 3.40, '€ stk.'),

-- Fingerfood - Vegetarische/Vegane Fingerfood
('Mozzarella-Tomaten-Spieß', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 3.90, '€ stk.'),
('Falafel mit Joghurt/Tahini Dip', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 2.50, '€ stk.'),
('Gefüllte Weinblätter', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 1.60, '€ stk.'),
('Zucchini Puffer', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 2.20, '€ stk.'),
('Mini Gemüse/Kartoffel Frikadellen mit Käse Füllung Spieß', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 2.50, '€ stk.'),
('Verschiedene Brotaufstriche auf Baguette/Ciabatta', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 2.50, '€ stk.'),
('Frischkäse/Kräuter gefüllte Krepp', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 3.70, '€ stk.'),
('Zucchini Röllchen mit Frischkäse/Kräuter', NULL, 'Fingerfood', 'Vegetarische/Vegane Fingerfood', 3.40, '€ stk.'),

-- Nachspeisen
('Grießpudding', 'Apfel, Zimt, Walnuss (pro Glas)', 'Nachspeisen', 'Alle', 5.60, '€'),
('Grießpudding', 'Apfel, Zimt, Walnuss', 'Nachspeisen', 'Alle', 5.50, '€ pp.'),
('Schokopudding', 'pro Glas', 'Nachspeisen', 'Alle', 5.50, '€'),
('Schokopudding', NULL, 'Nachspeisen', 'Alle', 5.30, '€ pp.'),
('Schoko Mousse', 'pro Glas', 'Nachspeisen', 'Alle', 5.40, '€'),
('Schoko Mousse', NULL, 'Nachspeisen', 'Alle', 5.20, '€ pp.'),
('Schokoladen Brownie mit Schoko-Soße', 'pro Glasform', 'Nachspeisen', 'Alle', 68.00, '€'),
('Obst Joghurt', 'pro Glas', 'Nachspeisen', 'Alle', 5.60, '€'),
('Obst Joghurt', NULL, 'Nachspeisen', 'Alle', 5.40, '€ pp.'),
('Baklava', NULL, 'Nachspeisen', 'Alle', 3.00, '€ stk.'),

-- Zusatzleistungen
('Lieferung', NULL, 'Zusatzleistungen', 'Alle', 50.00, '€'),
('Lieferung', NULL, 'Zusatzleistungen', 'Alle', 100.00, '€'),
('Tischkarten', NULL, 'Zusatzleistungen', 'Alle', 2.30, '€ stk.'),
('Karbid', NULL, 'Zusatzleistungen', 'Alle', 3.00, '€ stk.');