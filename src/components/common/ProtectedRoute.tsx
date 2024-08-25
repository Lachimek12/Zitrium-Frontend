/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";
import { LOCAL_STORAGE_PROFILE_KEY } from "@utils/constants";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const expiryDate = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)!)?.expiryDate;
    if (expiryDate && Date.now() >= expiryDate) {
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      authContext.isAuthenticated = false;
    }

    if (authContext.isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [navigate, authContext.isAuthenticated]);

  return children;
}

export default ProtectedRoute;
