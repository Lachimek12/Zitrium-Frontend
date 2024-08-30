/* Libraries */
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

/* App modules imports */
import styles from "./test.module.css";
import Dropzone from "react-dropzone";

const fileTypes = ["JPG", "PNG", "GIF"];

type DragDropPrompts = {
  setUrl: React.Dispatch<SetStateAction<string | null>>;
};

function DragDrop({ setUrl }: DragDropPrompts) {
  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setUrl(url);
    });
  };

  return (
    <Dropzone onDrop={handleDrop} multiple={false}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept }) => (
        <div className={`flex h-[100px] w-[100px] hover:cursor-pointer hover:opacity-80`} {...getRootProps()}>
          <input className="flex-1" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
}

function Tile() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="relative flex flex-1 overflow-clip">
      <div className="m-0 flex flex-1 p-0 hover:opacity-50">
        <div className="absolute h-[100%] w-[100%]">
          <DragDrop setUrl={setImageUrl} />
        </div>
        <div className="pointer-events-none absolute left-[50%] top-[50%] flex -translate-x-[50%] -translate-y-[50%]">
          <AddImageIcon />
        </div>
        <div className="absolute flex h-[100%] w-[100%] object-contain hover:hidden">
          <img className="flex-1 rounded-lg" src={imageUrl ? imageUrl : ""} />
        </div>
      </div>
    </div>
  );
}

function PlusSymbol() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="5" y1="13" x2="19" y2="13" />
    </svg>
  );
}

function Test() {
  return (
    <div className={`${styles.backgroundImage} flex h-full bg-cover`}>
      <div className="flex flex-1 justify-center bg-background2-900 bg-opacity-90">
        <div className="grid grid-cols-6 grid-rows-6 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex h-[120px] w-[100px] rounded-lg bg-primary2-800">
              <Tile />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//        <img className="h-10 w-10 self-center" src={PATRICK_BATEMAN} />

const PATRICK_BATEMAN = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuq6moo9Mj_OhWXMULwNzjw9vGPzMkpGWWMg&s";
const JASIEK2R =
  "https://w7.pngwing.com/pngs/424/623/png-transparent-diablo-iii-reaper-of-souls-video-game-blizzard-entertainment-battle-net-diablo-logo-expansion-pack-action-roleplaying-game-thumbnail.png";
export default Test;

/*
        <div className="relative left-0 top-0 flex overflow-x-hidden">
          <div ref={contentBox} className="bg-red-400 duration-500">
            skibidi toilet
          </div>
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

*/

function AddImageIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.33317 6.66667H22.6665V16H25.3332V6.66667C25.3332 5.196 24.1372 4 22.6665 4H5.33317C3.8625 4 2.6665 5.196 2.6665 6.66667V22.6667C2.6665 24.1373 3.8625 25.3333 5.33317 25.3333H15.9998V22.6667H5.33317V6.66667Z"
        fill="currentColor"
      ></path>
      <path
        d="M10.6665 14.6667L6.6665 20H21.3332L15.9998 12L11.9998 17.3333L10.6665 14.6667Z"
        fill="currentColor"
      ></path>
      <path
        d="M25.3332 18.6667H22.6665V22.6667H18.6665V25.3333H22.6665V29.3333H25.3332V25.3333H29.3332V22.6667H25.3332V18.6667Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
