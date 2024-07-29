/* Libraries */
import { useEffect, useRef, useState } from "react";

/* App modules imports */
import expand from "@assets/images/expand.svg";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const contentBox = useRef<HTMLDivElement | null>(null);
  const [skibidi, setSkibidi] = useState<number>(0);

  useEffect(() => {
    // Update skibidi with the width of contentBox when component mounts or when contentBox changes
    if (contentBox.current) {
      setSkibidi(contentBox.current.offsetWidth);
    }
  }, [isOpen]); // Add contentBox.current to dependencies if it changes

  return (
    <>
      <div
        style={{
          transform: `translateX(${isOpen ? "0" : `-${skibidi}px`})`,
        }}
        className={`left-0 duration-300 transition-all flex h-screen`}
      >
        <div ref={contentBox} className=" bg-background-700">
          <p>Skibidi</p>
        </div>
        <button
          className="bg-background-700 w-10"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src={expand} className={` ${isOpen ? "-rotate-90" : "rotate-90"} scale-x-[3.0]`} />
        </button>
        <div className="flex justify-center w-full">
          <p className="self-center">Dziala</p>
        </div>
      </div>
    </>
  );
}

export default Test;
