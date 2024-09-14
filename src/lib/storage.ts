interface StorageItem<T> {
  value: T;
  expires?: number;
}

type StorageOptions = {
  expiresInSeconds?: number;
};

const setLocalStorage = <T>(
  key: string,
  value: T,
  options?: StorageOptions
): void => {
  if (options?.expiresInSeconds !== undefined) {
    const item: StorageItem<T> = {
      value,
      expires: Date.now() + options.expiresInSeconds * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const parsed = JSON.parse(item);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'value' in parsed &&
      'expires' in parsed
    ) {
      const { value, expires } = parsed as StorageItem<T>;
      if (expires && expires > Date.now()) return value;
      localStorage.removeItem(key);
    } else {
      return parsed as T;
    }
  } catch (error) {
    console.error('parse localStorage item error', error);
    localStorage.removeItem(key);
  }
  return null;
};

const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

const clearLocalStorage = (): void => {
  localStorage.clear();
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
};
