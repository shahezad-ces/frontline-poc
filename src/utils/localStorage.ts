/**
 * Save data to localStorage
 * @param key - The key under which data will be stored
 * @param value - The data to store (any type)
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Get data from localStorage
 * @param key - The key to retrieve
 * @returns Parsed data or null if not found
 */
export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * Remove data from localStorage
 * @param key - The key to remove
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
