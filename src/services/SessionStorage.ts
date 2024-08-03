function removeSessionStorageItem(key: string) {
  const item = sessionStorage.getItem(key);
  if (item !== null) {
    sessionStorage.removeItem(key);
    console.log(`Removed item with key: ${key}`);
  }
}

function existSessionStorageItem(key: string) {
  const item = sessionStorage.getItem(key);
  return item !== null;
}

/**
 * Session key used for registration and verification
 */

export const SIGN_UP_INFO = "signUpInfo";

export { removeSessionStorageItem, existSessionStorageItem };
