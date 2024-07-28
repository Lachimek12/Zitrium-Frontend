/* Libraries */
import { useState, useEffect } from "react";

/* App modules imports */
import { useFetch, usePostFetch } from "@/hooks/useFetch";
import logo from "@assets/images/logo.svg";

/* Types imports */
import { SERVER_ADDRESS } from "@/utils/constants";
import { DataTransfer } from "@/types/ApiResponse";
import type UserData from "@/types/UserData";

function HomePage() {
  const [userData, setUserData] = useState<UserData>({
    name: "Jeff",
    email: "xdd@wp.pl",
  });
  const response: DataTransfer<UserData> = useFetch<UserData>(SERVER_ADDRESS);
  const post: DataTransfer<string> = usePostFetch(userData, SERVER_ADDRESS);

  useEffect(() => {
    if (response.error) {
      console.error(response.error.message);
    }
  }, [response.error]);

  useEffect(() => {
    if (post.error) {
      console.error(post.error.message);
    }
  }, [post.error]);

  const handleReceiveButton = async () => {
    response.request();
  };

  const handleSendButton = async () => {
    post.request();
  };

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <img src={logo} className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="text-[#61dafb]" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div className="flex gap-2.5 pt-12">
          <button
            disabled={response.loading}
            className="text-black bg-[#8a2be2] active:bg-[#388bc5] border-black text-lg p-5 px-7.5 border-0.5 cursor-pointer"
            onClick={handleReceiveButton}
          >
            {response.loading ? "...Loading" : "Recieve"}
          </button>
          <button
            className="text-black bg-[#8a2be2] active:bg-[#388bc5] border-black text-lg p-5 px-7.5 border-0.5 cursor-pointer"
            onClick={handleSendButton}
          >
            Send
          </button>
        </div>
        <div>
          <p>{response.data ? `${response.data.name} ${response.data.email}` : ""}</p>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
