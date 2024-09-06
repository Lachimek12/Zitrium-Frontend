function removeSessionStorageItem(key: string) {
  const item: string | null = sessionStorage.getItem(key);
  if (item !== null) {
    sessionStorage.removeItem(key);
    console.log(`Removed item with key: ${key}`);
  }
}

function getSessionStorageItem<T>(key: string): T | null {
  const item: string | null = sessionStorage.getItem(key);
  if (item !== null) {
    return item as T;
  } else {
    return null;
  }
}

function existSessionStorageItem(key: string): boolean {
  const item: string | null = sessionStorage.getItem(key);
  return item !== null;
}

export { removeSessionStorageItem, getSessionStorageItem, existSessionStorageItem };
