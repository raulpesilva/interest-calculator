export class CustomStorage {
  prefix: string = '';

  storage: Storage;

  constructor(storage: Storage, prefix?: string) {
    if (prefix) this.prefix = prefix;
    this.storage = storage;
  }

  getItem<T = any>(key: string) {
    const formattedKey = this.prefix + key;
    const value = this.storage.getItem(formattedKey);
    if (!value) return null;
    const decodedValue = atob(value);
    const parsedValue = JSON.parse(decodedValue);
    return parsedValue.value as T;
  }

  setItem<T = any>(key: string, value: T) {
    const formattedKey = this.prefix + key;
    if (value === undefined) this.storage.removeItem(formattedKey);

    const formattedValue = JSON.stringify({ value });
    const encodedValue = btoa(formattedValue);

    if (value !== undefined) this.storage.setItem(formattedKey, encodedValue);
  }

  removeItem(key: string) {
    const formattedKey = this.prefix + key;
    this.storage.removeItem(formattedKey);
  }
}

const PREFIX = import.meta.env.VITE_PREFIX;
export const customLocalStorage = new CustomStorage(localStorage, PREFIX);
export const customSessionStorage = new CustomStorage(sessionStorage, PREFIX);
