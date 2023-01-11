import { useState, useEffect } from "react";

/** Custom hook for syncing state data with localStorage
 *
 * Takes a key and a value and uses it to set an inital value for that key.
 * If no value is provided the default value for the key will be null
 *
 * It works by first reading the localStorage value corresponding to the given key.
 * If there is a saved value, returns the parsed value
 * If there is no value or an error with parsing the value it returns the default value
 *
 * It uses useEffect to track changes to the value or key and updates the respective item
 * The value is parsed using stringify before being stored with its key
 * If the new value is set to null it removes the key and value from localStorage
 *
 * When used it acts like a state that is also synced to localStorage
 *
 * const [item, setItem] = useLocalStorage("item")
 */

const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });
  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      const rawValue = JSON.stringify(value);
      localStorage.setItem(key, rawValue);
    }
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
