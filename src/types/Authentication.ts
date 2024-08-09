/* App modules imports */
import { LoginForm } from "./FormSchemas";

export type User = {
  name: string;
};

/* Auth context types */

export type Auth = {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (data: LoginForm) => void;
  logout: () => void;
};

export enum AuthActions {
  SignIn_Request = "SIGN_IN_REQUEST",
  SignIn_Success = "SIGN_IN_SUCCESS",
  SignIn_Failure = "SIGN_IN_FAILURE",
  SignOut_Request = "SIGN_OUT_REQUEST",
  SignOut_Success = "SIGN_OUT_SUCCESS",
  SignOut_Failure = "SIGN_OUT_FAILURE",
}

export interface AuthReducer {
  type: AuthActions | "";
  payload: unknown;
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
