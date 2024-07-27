import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import UserData from "../../types/UserData";
import { DataTransfer } from "../../types/ApiResponse";
import { useFetch } from "../../hooks/useFetch";
import { SERVER_ADDRESS } from "../../utils/constants";
import { usePostFetch } from "../../utils/fetch";

function HomePage() {
  const [count, setCount] = useState(0);
  const response: DataTransfer<UserData> = useFetch<UserData>(SERVER_ADDRESS);
  const post: DataTransfer<String> = usePostFetch({ number: count }, SERVER_ADDRESS);

  useEffect(() => {
    if (response.error) {
      console.error(response.error.message);
    }
    if (post.error) {
      console.error(post.error.message);
    }
  }, [response.error, post.error]);

  const handleReceiveButton = async () => {
    response.request();
  };

  const handleSendButton = async () => {
    setCount(count + 1);
    post.request();
  };

  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <img src={logo} className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="text-[#61dafb]" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div className="flex gap-2.5 pt-12">
          <button
            className="text-black bg-[#8a2be2] active:bg-[#388bc5] border-black text-lg p-5 px-7.5 border-0.5 cursor-pointer"
            onClick={handleReceiveButton}
          >
            Receive
          </button>
          <button
            className="text-black bg-[#8a2be2] active:bg-[#388bc5] border-black text-lg p-5 px-7.5 border-0.5 cursor-pointer"
            onClick={handleSendButton}
          >
            Send
          </button>
        </div>

        <div>
          {response.data == null ? (
            <p>Loading...</p>
          ) : (
            <p>
              {response.data.name} {response.data.email}
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default HomePage;
