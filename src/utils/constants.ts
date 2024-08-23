/* Adresses */
export const BASE_URL = import.meta.env.VITE_SERVER_ADDRESS || "";
export const API_ADRESS = "/api";

/* Authentication Adresses */
export const REGISTER_ADDRESS = "/register";
export const LOGIN_ADDRESS = "/login";
export const LOGOUT_ADDRESS = "/logout";
export const VERIFY_EMAIL_ADDRESS = "/verify-email";
export const RESEND_VERIFICATION_ADDRESS = "/register/resend-verify";

/* Local storage keys */
export const LOCAL_STORAGE_PROFILE_KEY = "profile";

/* Other */
export const VERIFICATION_CODE_EXPIRATION_TIMEOUT_SEC = 600;
