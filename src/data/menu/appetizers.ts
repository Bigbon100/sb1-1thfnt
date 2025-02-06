import { MenuItem } from '../../types';

export const appetizers: MenuItem[] = [
  // Suppen
  {
    id: 'soup-1',
    name: 'Mercimek Çorbasi',
    description: 'Rote Linsen, Gemüse',
    price: '6.60',
    unit: '€ pp.',
    category: 'Vorspeisen',
    subcategory: 'Suppen'
  },
  {
    id: 'soup-2',
    name: 'Tomaten Suppe',
    description: 'Tomaten, Gemüse',
    price: '6.50',
    unit: '€ pp.',
    category: 'Vorspeisen',
    subcategory: 'Suppen'
  },
  {
    id: 'soup-3',
    name: 'Hühner Suppe',
    description: 'Hähnchen, Möhren, Erbsen (türkische Art)',
    price: '6.70',
    unit: '€ pp.',
    category: 'Vorspeisen',
    subcategory: 'Suppen'
  },
  // Mezeler
  {
    id: 'meze-1',
    name: 'Zaziki (Cacik)',
    description: 'Joghurt, Gurken, Knoblauch',
    price: '3.70',
    unit: '€ pp.',
    category: 'Vorspeisen',
    subcategory: 'Mezeler'
  },
  {
    id: 'meze-2',
    name: 'Möhren Salat',
    description: 'Geröstete Möhren, Olivenöl, Joghurt, Knoblauch, Dill, Walnuss',
    price: '6.60',
    unit: '€ pp.',
    category: 'Vorspeisen',
    subcategory: 'Mezeler'
  },
  {
    id: 'meze-3',
    name: 'Feinkost Tablet',
    description: 'Tarator, Hummus (vegan), Frischkäse oder Auberginen-Salat',
    price: '98.00',
    unit: '€',
    category: 'Vorspeisen',
    subcategory: 'Mezeler'
  }
];