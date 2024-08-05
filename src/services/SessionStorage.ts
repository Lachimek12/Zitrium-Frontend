function removeSessionStorageItem(key: string) {
  const item = sessionStorage.getItem(key);
  if (item !== null) {
    sessionStorage.removeItem(key);
    console.log(`Removed item with key: ${key}`);
  }
}

function getSessionStorageItem<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  if (item !== null) {
    return item as T;
  } else {
    return null;
  }
}

function existSessionStorageItem(key: string) {
  const item = sessionStorage.getItem(key);
  return item !== null;
}

function useSessionStorageItem<T>(key: string, initialValue: T): [T, (value: T) => void] {}

/**
 * Session key used for registration and verification
 */

export const SIGN_UP_INFO = "signUpInfo";
export const TIMEOUT = "timeout";

export { removeSessionStorageItem, getSessionStorageItem, existSessionStorageItem };
