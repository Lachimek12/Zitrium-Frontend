/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

/* App modules imports */
import authReducer from "./AuthReducer";
import { LOGOUT_ADDRESS } from "@utils/constants";

/* Types imports */
import { Auth, AuthActions, AuthReducer, LoginData } from "@/types/Authentication";

const AuthInitialState: Auth = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  login: () => {
    return null;
  },
  logout: () => {
    return null;
  },
};

const AuthContext = createContext<Auth | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);
  //const navigate = useNavigate();

  const login = useCallback(async (data: LoginData) => {
    //dispatch({  type: AuthActions.SignIn_Request,} as AuthReducer);

    dispatch({
      type: AuthActions.SignIn_Success,
    } as AuthReducer);

    //dispatch({ type: AuthActions.SignIn_Failure } as AuthReducer);
  }, []);

  const logout = useCallback(() => {
    dispatch({
      type: AuthActions.SignOut,
    } as AuthReducer);
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
});

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthStateProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
