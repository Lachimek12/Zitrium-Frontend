/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/register", { replace: true });
    }
  }, [navigate, user]);

  return children;
}

export default ProtectedRoute;
