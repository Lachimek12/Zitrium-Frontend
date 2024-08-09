/* Adresses */
export const SERVER_ADDRESS: string = import.meta.env.VITE_SERVER_ADDRESS || "";
export const API_ADRESS: string = "/api";

/* Authentication Adresses */
export const REGISTER_ADDRESS: string = "/register";
export const LOGIN_ADDRESS: string = "/login";
export const LOGOUT_ADDRESS: string = "/logout";
export const VERIFY_EMAIL_ADDRESS: string = "/verify-email";
export const RESEND_VERIFICATION_ADDRESS: string = "/register/resend-verify";

/* Local storage keys */
export const LOCAL_STORAGE_PROFILE_KEY: string = "profile";

/* Other */

/**
 * Integer time in seconds
 */
export const VERIFICATION_CODE_EXPIRATION_TIMEOUT: number = 600;
