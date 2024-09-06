/* Libraries */
import { PropsWithChildren, useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

/* App modules imports */
import { existSessionStorageItem } from "@/services/SessionStorage";
import { SIGN_UP_INFO } from "@utils/constants";

type VerificationRouteProps = PropsWithChildren;

function VerificationRoute({ children }: VerificationRouteProps) {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath: string = location.pathname;

    if (currentPath === "/verification" && !existSessionStorageItem(SIGN_UP_INFO)) {
      navigate("/register", { replace: true });
    }
  }, [navigate, location.pathname]);

  return children;
}

export default VerificationRoute;
