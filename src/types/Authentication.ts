/* App modules imports */
import { LoginForm } from "./FormSchemas";

export type User = {
  name: string;
};

/* Auth context types */

export type Auth = {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown | null;
  login: (data: LoginForm) => void;
  logout: () => void;
};

export enum AuthActions {
  SignIn_Request = "SIGN_IN_REQUEST",
  SignIn_Success = "SIGN_IN_SUCCESS",
  SignIn_Failure = "SIGN_IN_FAILURE",
  SignOut = "SIGN_OUT",
  SetUserProfile = "SET_USER_PROFILE",
}

export interface AuthReducer {
  type: AuthActions | "";
  payload: Error | null;
}

/* Session storage types */

/**
 * Information required for user sign-up verification step.
 */
export interface SignUpInfo {
  email: string;
}

/* Local storage types */

/**
 * Represents a user profile stored in local storage.
 */
export interface Profile {
  accessToken: string;
}
