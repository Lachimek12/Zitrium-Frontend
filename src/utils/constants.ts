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
export const USER_TOKEN_EXPIRATION_TIMEOUT_MS = 1000 * 60 * 60 * 24 * 14; // 2 weeks

/* Placeholders */
export const SIGMA_IMAGE_SRC =
  "https://media.printables.com/media/prints/609705/images/4843766_f3a15f19-e7ee-4661-b553-2533084ac8fa_dcb27d2e-db17-433d-8f60-1d129843482d/th-387312948.png";
export const PATRICK_BATEMAN =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuq6moo9Mj_OhWXMULwNzjw9vGPzMkpGWWMg&s";
export const JASIEK2R =
  "https://w7.pngwing.com/pngs/424/623/png-transparent-diablo-iii-reaper-of-souls-video-game-blizzard-entertainment-battle-net-diablo-logo-expansion-pack-action-roleplaying-game-thumbnail.png";
