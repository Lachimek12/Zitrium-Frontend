/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext, useReducer } from "react";

/* App modules imports */
import authReducer from "./AuthReducer";

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

  const login = useCallback(async (data: LoginData) => {
    dispatch({
      type: AuthActions.SignIn_Request,
    } as AuthReducer);

    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({
      type: AuthActions.SignIn_Success,
    } as AuthReducer);
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
