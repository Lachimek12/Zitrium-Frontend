/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* App modules imports */
import { existSessionStorageItem, SIGN_UP_INFO } from "@/services/sessionStorage";

type VerificationRouteProps = PropsWithChildren;

function VerificationRoute({ children }: VerificationRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === "/verification" && !existSessionStorageItem(SIGN_UP_INFO)) {
      navigate("/register", { replace: true });
    }
  }, [navigate, location.pathname]);

  return children;
}

export default VerificationRoute;
