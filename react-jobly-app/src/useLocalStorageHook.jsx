import { useState } from 'react';

// Helper function to check if a string is valid JSON
const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored JSON or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Check if item is JSON or not
      return item ? (isJsonString(item) ? JSON.parse(item) : item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  // that persists the new value to localStorage.
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Only stringify non-string data
      localStorage.setItem(key, typeof valueToStore === "string" ? valueToStore : JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
