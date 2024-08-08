/* Types imports */
import { Auth, AuthActions, AuthReducer } from "@/types/Authentication";

const authReducer = (state: Auth, action: AuthReducer) => {
  switch (action.type) {
    case AuthActions.SignIn_Request:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
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
        isError: action.payload,
      };
    case AuthActions.SignOut:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
