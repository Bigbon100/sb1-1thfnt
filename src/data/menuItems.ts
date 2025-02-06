import { MenuItem } from '../types';
import { appetizers } from './menu/appetizers';
import { mainDishes } from './menu/mainDishes';
import { salads } from './menu/salads';
import { fingerfood } from './menu/fingerfood';
import { desserts } from './menu/desserts';
import { additionalServices } from './additionalServices';

export const presetMenuItems: MenuItem[] = [
  ...appetizers,
  ...mainDishes,
  ...salads,
  ...fingerfood,
  ...desserts,
  ...additionalServices
];