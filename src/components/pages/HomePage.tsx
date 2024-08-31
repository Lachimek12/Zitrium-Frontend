/* Libraries */
import { useState, useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

/* App modules imports */
import { useFetch, usePostFetch } from "@/hooks/useFetch";
import logo from "@assets/images/logo.svg";
import SideBar from "@components/SideBar";
import { API_ADRESS } from "@/utils/constants";
import { SIMULATION_DATA } from "@/services/SessionStorage";
import { nextTurn, simulatorInitialState } from "@utils/simulator";
import API from "@/app/api";

/* Types imports */
import { DataTransfer } from "@customTypes/ApiResponse";
import type UserData from "@/types/userData";
import { SimulatorData } from "@customTypes/Simulator";

function HomePage() {
  const [simulatorData, setSimulatorData] = useSessionStorage<SimulatorData>(SIMULATION_DATA, simulatorInitialState);

  // OLD STUFF

  const [userData] = useState<UserData>({
    name: "Jeff",
    email: "xdd@wp.pl",
  });
  const response: DataTransfer<UserData> = useFetch<UserData>(API_ADRESS);
  const post: DataTransfer<string> = usePostFetch(userData, API_ADRESS);

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
    nextTurn(simulatorData, setSimulatorData);
  };

  const handleSendButton = async () => {
    API.post(API_ADRESS, userData).catch((error) => {
      console.log(error);
    });
    post.request();
    console.log("skibidi");
    console.log(simulatorData.isGameOver);
  };

  // END OF OLD STUFF

  return (
    <div className="relative flex flex-grow">
      <SideBar />
      <header className="flex flex-1 flex-col items-center justify-center text-center text-[calc(10px+2vmin)] text-white">
        <img src={logo} className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="text-[#61dafb]" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div className="flex gap-2.5 pt-12">
          <button
            disabled={response.loading}
            className="px-7.5 border-0.5 cursor-pointer border-black bg-[#8a2be2] p-5 text-lg text-black active:bg-[#388bc5]"
            onClick={handleReceiveButton}
          >
            {response.loading ? "...Loading" : "Recieve"}
          </button>
          <button
            className="px-7.5 border-0.5 cursor-pointer border-black bg-[#8a2be2] p-5 text-lg text-black active:bg-[#388bc5]"
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
