export type User = {
  name: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Auth = {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (data: LoginData) => void;
  logout: () => void;
};

export enum AuthActions {
  SignIn_Request = "SIGN_IN_REQUEST",
  SignIn_Success = "SIGN_IN_SUCCESS",
  SignIn_Failure = "SIGN_IN_FAILURE",
  SignOut = "SIGN_OUT",
}

export interface AuthReducer {
  type: AuthActions | "";
  payload: unknown;
}

export interface SignUpInfo {
  email: string;
}
