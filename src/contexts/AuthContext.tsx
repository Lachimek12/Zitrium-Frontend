/* Libraries */
import { createContext, FC, memo, PropsWithChildren, useCallback, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

/* App modules imports */
import authReducer from "./authReducer";
import API from "@/app/api";
import { LOCAL_STORAGE_PROFILE_KEY, LOGIN_ADDRESS, LOGOUT_ADDRESS } from "@utils/constants";

/* Types imports */
import { Auth, AuthActions, AuthReducer, Profile } from "@customTypes/authentication";
import { LoginForm } from "@customTypes/formSchemas";
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

async function initializeAuth(dispatch: React.Dispatch<AuthReducer>) {
  const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)!)?.accessToken;
  if (accessToken) {
    dispatch({ type: AuthActions.SetUserProfile } as AuthReducer);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
