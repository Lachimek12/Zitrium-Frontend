/* Libraries */
import { useEffect, useRef, useState } from "react";

/* App modules imports */
import expand from "@assets/images/expand.svg";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const contentBox = useRef<HTMLDivElement | null>(null);
  //const [skibidi, setSkibidi] = useState<number>(0);

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
        <div className="flex relative top-0 left-0 overflow-x-hidden">
          <div ref={contentBox} className="duration-500 bg-red-400"></div>
          <div className="w-10 bg-green-400"></div>
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/ bg-background-800 left-1/2 dark:text-white ">
            or
          </span>
        </div>
      </div>
    </>
  );
}

export default Test;
