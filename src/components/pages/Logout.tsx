/* Libraries */
import { useEffect} from "react";

/* App modules imports */
// import { SERVER_ADDRESS } from "@utils/constants";
import { useFetch } from "@/hooks/useFetch";
import { usePostFetch } from "@/hooks/useFetch";
// import { DataTransfer } from "../../types/ApiResponse";
import UserData from "@customTypes/UserData";
import { DataTransfer } from "@/types/ApiResponse";
import { useLocation } from "react-router-dom";

/* Types imports */

function VerifyEmail() {
  //token from local storage!
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjM0ZTdmNzE5MzFjMzg1YzE0NDBlYiIsImVtYWlsIjoibWljaGFsX3N6a29sYTIwQHdwLnBsIiwiaWF0IjoxNzIzMDI4NTk2LCJleHAiOjE3MjMwMzIxOTZ9.fUjBjC7T1LUQRXm-VhOd1hUr9czs-c9JxBMHVCZabsQ';
  const token2: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjM0ZTdmNzE5MzFjMzg1YzE0NDBlYiIsImVtYWlsIjoibWljaGFsX3N6a29sYTIwQHdwLnBsIiwiaWF0IjoxNzIzMDMwMDgxLCJleHAiOjE3MjMwMzM2ODF9.kJwYtR4sLZAVlwSZ_J95TSWty56iO6mfHYPH';
  const data = {
    email: 'michal_szkola20@wp.pl',
  }
  const options: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token2}`
    },
    body: JSON.stringify(data),
  }
  const sendToken = usePostFetch(data, 'http://localhost:3000/logout', options);

  useEffect(() => {
    sendToken.request();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
        <p>Hi</p>
    </div>
  );
}

export default VerifyEmail;