/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext, useEffect, useReducer } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useLocalStorage } from "usehooks-ts";

/* App modules imports */
import authReducer from "./authReducer";
import API from "@/app/api";
import {
  LOCAL_STORAGE_PROFILE_KEY,
  LOGIN_ADDRESS,
  LOGOUT_ADDRESS,
  USER_TOKEN_EXPIRATION_TIMEOUT_MS,
} from "@utils/constants";

/* Types imports */
import { Auth, AuthActions, AuthReducer, Profile } from "@/types/authentication";
import { LoginForm } from "@customTypes/formSchemas";

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
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    initializeAuth(dispatch);
  }, []);

  const login = useCallback(
    async (data: LoginForm) => {
      dispatch({ type: AuthActions.SignIn_Request } as AuthReducer);

      await API.post(LOGIN_ADDRESS, data)
        .then((response) => {
          const { token } = response.data;

          dispatch({
            type: AuthActions.SignIn_Success,
          } as AuthReducer);

          setProfile({
            accessToken: token,
            expiryDate: Date.now() + USER_TOKEN_EXPIRATION_TIMEOUT_MS,
          } as Profile);

          navigate("/");
        })
        .catch((error: AxiosError) => {
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
        if (!checkForAuthError(error, dispatch, navigate)) {
          dispatch({ type: AuthActions.SignOut, payload: error } as AuthReducer);
        }
      })
      .finally(() => {
        localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      });
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
});

function useAuth(): Auth {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthStateProvider");
  }

  return context;
}

async function initializeAuth(dispatch: React.Dispatch<AuthReducer>) {
  const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)!)?.accessToken;
  const expiryDate = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)!)?.expiryDate;

  if (accessToken && expiryDate && Date.now() < expiryDate) {
    dispatch({ type: AuthActions.SetUserProfile } as AuthReducer);
  } else if (expiryDate && Date.now() >= expiryDate) {
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
  }
}

function checkForAuthError(
  error: AxiosError,
  dispatch: React.Dispatch<AuthReducer>,
  navigate: NavigateFunction,
): boolean {
  // 401 - authentication error
  if (error.response!.status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    dispatch({ type: AuthActions.SignOut, payload: error } as AuthReducer);
    navigate("/login");
    return true;
  }

  return false;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
