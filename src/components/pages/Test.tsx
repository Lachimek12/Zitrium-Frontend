/* Libraries */
import { useEffect, useRef, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

/* App modules imports */
import expand from "@assets/images/expand.svg";
import { removeSessionStorageItem } from "@/services/SessionStorage";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const contentBox = useRef<HTMLDivElement | null>(null);
  //const [skibidi, setSkibidi] = useState<number>(0);

  const [value, setValue, removeValue] = useSessionStorage<number>("key", 0);

  useEffect(() => {
    removeSessionStorageItem("skibidi");
  }, []);

  useEffect(() => {
    if (contentBox.current) {
      if (isOpen) {
        contentBox.current.style.width = "200px";
      } else {
        contentBox.current.style.width = "0px";
      }
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex h-full">
        <div className="relative left-0 top-0 flex overflow-x-hidden">
          <div ref={contentBox} className="bg-red-400 duration-500"></div>
          <div className="w-10 bg-green-400"></div>
        </div>
        <div className="w-full overflow-y-scroll">
          <button
            className="h-10 w-full"
            onClick={() => {
              setValue(value + 1);
              setIsOpen(!isOpen);
            }}
          ></button>
          <div>{value}</div>
          <div className="h-[3000px] w-10 bg-red-600"></div>
        </div>
      </div>
    </>
  );
}

export default Test;
