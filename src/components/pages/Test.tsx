/* Libraries */
import { useEffect, useRef, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

/* App modules imports */

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const contentBox = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useSessionStorage<number>("key", 0);

  useEffect(() => {
    if (contentBox.current) {
      if (isOpen) {
        contentBox.current.style.width = "200px";
      } else {
        contentBox.current.style.width = "0px";
      }
    }
  }, [isOpen]);

  const items = Array.from({ length: 9 });

  return (
    <>
      <div className="flex h-full">
        <div className="relative left-0 top-0 flex overflow-x-hidden">
          <div ref={contentBox} className="bg-red-400 duration-500"></div>
          <div
            className="w-10 bg-green-400"
            onClick={() => {
              setValue(value + 1);
              setIsOpen(!isOpen);
            }}
          ></div>
        </div>
        <div className="h-full w-full p-10">
          <div className="grid h-full w-full grid-cols-5 gap-4">
            {items.map((_, index) => (
              <div className="flex flex-col gap-2">
                <div className="flex-1">
                  <img key={index} className="inset-0 h-full w-full rounded-lg object-fill" src={PATRICK_BATEMAN} />
                </div>
                <h2>
                  <strong>Patrick Bateman</strong>
                </h2>
                <p className="opacity-80">Patrick Bateman is a character created by novelist Bret Easton Ellis.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const PATRICK_BATEMAN = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuq6moo9Mj_OhWXMULwNzjw9vGPzMkpGWWMg&s";

export default Test;
