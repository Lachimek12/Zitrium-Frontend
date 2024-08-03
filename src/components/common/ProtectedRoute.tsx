/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";
import { existSessionStorageItem, SIGN_UP_INFO } from "@/services/SessionStorage";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/register", { replace: true });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === "/verification" && !existSessionStorageItem(SIGN_UP_INFO)) {
      navigate("/register", { replace: true });
    } else {
      // dont navigate anywhere and dont take into accout isAuthenticated
    }
    if (isAuthenticated === false) {
      navigate("/register", { replace: true });
    }
  }, [navigate, isAuthenticated, location.pathname]);

  return children;
}

export default ProtectedRoute;
