/* Types imports */
import { Auth, AuthActions, AuthReducer } from "@customTypes/Authentication";

const authReducer = (state: Auth, action: AuthReducer) => {
  switch (action.type) {
    case AuthActions.SignIn_Request:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
      };
    case AuthActions.SignIn_Success:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    case AuthActions.SignIn_Failure:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case AuthActions.SignOut:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case AuthActions.SetUserProfile:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
