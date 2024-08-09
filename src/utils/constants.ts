/* Adresses */
export const SERVER_ADDRESS: string = "http://localhost:3000";
export const API_ADRESS: string = SERVER_ADDRESS + "/api";

/* Authentication Adresses */
export const REGISTER_ADDRESS: string = SERVER_ADDRESS + "/register";
export const LOGIN_ADDRESS: string = SERVER_ADDRESS + "/login";
export const LOGOUT_ADDRESS: string = SERVER_ADDRESS + "/logout";
export const VERIFY_EMAIL_ADDRESS: string = SERVER_ADDRESS + "/verify-email";
export const RESEND_VERIFICATION_ADDRESS: string = SERVER_ADDRESS + "/register/resend-verify";

export const VERIFICATION_CODE_EXPIRATION_TIMEOUT = 600; // seconds

/* Local storage keys */
export const LOCAL_STORAGE_PROFILE_KEY = "profile";
