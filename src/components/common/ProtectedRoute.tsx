/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return children;
}

export default ProtectedRoute;
