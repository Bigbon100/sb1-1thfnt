export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  unit: string;
  category: Category;
  subcategory?: string;
  quantity?: number;
}

export type Category = 
  | 'Vorspeisen' 
  | 'Hauptspeisen' 
  | 'Salate' 
  | 'Fingerfood' 
  | 'Nachspeisen'
  | 'Zusatzleistungen';

export const categories: Category[] = [
  'Vorspeisen',
  'Hauptspeisen',
  'Salate',
  'Fingerfood',
  'Nachspeisen',
  'Zusatzleistungen'
];

export const subcategories: Record<Category, string[]> = {
  'Vorspeisen': ['Suppen', 'Mezeler'],
  'Hauptspeisen': ['Fleischgerichte', 'Vegetarische/Vegane Gerichte'],
  'Salate': ['Alle'],
  'Fingerfood': ['Teigspezialitäten', 'Fleisch Fingerfood', 'Vegetarische/Vegane Fingerfood'],
  'Nachspeisen': ['Alle'],
  'Zusatzleistungen': ['Alle']
};