/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

/* App modules imports */
import authReducer from "./AuthReducer";
import API from "@/app/Api";
import { LOCAL_STORAGE_PROFILE_KEY, LOGIN_ADDRESS, LOGOUT_ADDRESS } from "@utils/constants";

/* Types imports */
import { Auth, AuthActions, AuthReducer, Profile } from "@/types/Authentication";
import { LoginForm } from "@customTypes/FormSchemas";
import { useLocalStorage } from "usehooks-ts";

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
  const [, setProfile] = useLocalStorage<Profile>(LOCAL_STORAGE_PROFILE_KEY, {
    accessToken: "",
  } as Profile);
  const navigate = useNavigate();

  const login = useCallback(
    async (data: LoginForm) => {
      dispatch({ type: AuthActions.SignIn_Request } as AuthReducer);

      await API.post(LOGIN_ADDRESS, data)
        .then((response) => {
          const { token } = response.data;
          console.log(response.data);

          dispatch({
            type: AuthActions.SignIn_Success,
          } as AuthReducer);

          setProfile({
            accessToken: token,
          } as Profile);

          navigate("/");
        })
        .catch((error: AxiosError) => {
          console.error(error);
          dispatch({ type: AuthActions.SignIn_Failure, payload: error } as AuthReducer);
        });
    },
    [navigate, setProfile],
  );

  const logout = useCallback(async () => {
    API.post(LOGOUT_ADDRESS)
      .then(() => {
        dispatch({ type: AuthActions.SignOut, payload: null } as AuthReducer);
      })
      .catch((error) => {
        dispatch({ type: AuthActions.SignOut, payload: error } as AuthReducer);
      })
      .finally(() => {
        localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      });
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

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
