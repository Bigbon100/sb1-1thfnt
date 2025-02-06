import { StorageState } from '../types/storage';

export const storageKeys = {
  MENU_STATE: 'menuState',
  CUSTOMER_INFO: 'customerInfo',
  UI_STATE: 'uiState',
} as const;

export function clearStorageData(): void {
  try {
    Object.values(storageKeys).forEach(key => {
      sessionStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing storage data:', error);
  }
}

export function getStorageData(): Partial<StorageState> {
  try {
    return {
      menuItems: JSON.parse(sessionStorage.getItem(storageKeys.MENU_STATE) || '[]'),
      customerInfo: JSON.parse(sessionStorage.getItem(storageKeys.CUSTOMER_INFO) || '{}'),
      uiState: JSON.parse(sessionStorage.getItem(storageKeys.UI_STATE) || '{}'),
    };
  } catch (error) {
    console.error('Error getting storage data:', error);
    return {};
  }
}