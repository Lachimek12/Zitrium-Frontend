/* Libraries */
import { useEffect} from "react";

/* App modules imports */
// import { SERVER_ADDRESS } from "@utils/constants";
import { useFetch } from "@/hooks/useFetch";
// import { DataTransfer } from "../../types/ApiResponse";
import UserData from "@customTypes/UserData";
import { DataTransfer } from "@/types/ApiResponse";
import { useLocation } from "react-router-dom";

/* Types imports */

function VerifyEmail() {
  const query = new URLSearchParams(useLocation().search);
  const token: string | null = query.get("token");
  const response: DataTransfer<UserData> = useFetch<UserData>(`http://localhost:3000/verify-email?token=${token}`);

  useEffect(() => {
    response.request();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
        <p>Hi</p>
    </div>
  );
}

export default VerifyEmail;