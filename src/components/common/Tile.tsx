/* Libraries */
import { useEffect, useState } from "react";

/* App modules imports */
import DragDrop from "./DragDrop";
import UploadImage from "./icons/UploadImage";
import CopyIcon from "./icons/CopyIcon";
import { notify } from "@/app/App";
import Transparent from "../../assets/images/Transparent.png";

type CopyFromClipBoardPrompts = {
  copyAction: (arg0: string) => void;
};

function CopyFromClipBoard({ copyAction }: CopyFromClipBoardPrompts) {
  const [clipboardValue, setClipboardValue] = useState<string>("");
  const [clickIndex, setclickIndex] = useState<number>(0);

  useEffect(() => {
    if (clipboardValue != "" && clickIndex != 0) {
      copyAction(clipboardValue);
    }
  }, [clipboardValue, clickIndex]);

  const handleClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardValue(text);
      setclickIndex(clickIndex + 1);
    } catch (error) {
      notify("Failed to read from clipboard");
    }
  };

  return <div className="flex-1" onClick={handleClick}></div>;
}

function Tile() {
  const [imageUrl, setImageUrl] = useState<string>(Transparent);
  const [isDragOver, setIsDragOver] = useState<boolean>(true);

  const createTmpUrlFromImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const setUrl = async (url: string) => {
    setImageUrl(url);
  };

  const handleDragOver = () => {
    setIsDragOver(false);
  };

  const handleDragLeave = () => {
    setIsDragOver(true);
  };

  const handleOnError = () => {
    notify("Failed to load the image");
    setImageUrl(Transparent);
  };

  return (
    <div className="relative flex flex-1">
      <div
        className="group/main m-0 flex flex-1 flex-col rounded-lg p-0 hover:cursor-pointer hover:ring-2 hover:ring-border-600"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragExit={handleDragLeave}
        onDragEnd={handleDragLeave}
        onDrop={handleDragLeave}
      >
        <div className="group relative flex flex-1">
          <div className="flex flex-1">
            <DragDrop fileAction={createTmpUrlFromImage} />
          </div>
          <div className="pointer-events-none absolute flex h-[100%] w-[100%] items-center justify-center p-6 opacity-50 group-hover:opacity-80">
            <div className="flex h-[30%] w-[30%] flex-none scale-150 items-center justify-center pr-3">
              <UploadImage />
            </div>
            <p className="flex-1 text-sm">Choose file or drag it here</p>
          </div>
        </div>
        {isDragOver && (
          <>
            <hr className="mx-4 opacity-50" />
            <div className="group relative flex flex-1">
              <div className="flex flex-1">
                <CopyFromClipBoard copyAction={setUrl} />
              </div>
              <div className="pointer-events-none absolute flex h-[100%] w-[100%] items-center justify-center p-6 opacity-50 group-hover:opacity-80">
                <div className="flex h-[30%] w-[30%] flex-none scale-150 items-center justify-center pr-3">
                  <CopyIcon />
                </div>
                <p className="flex-1 text-sm">Click here to copy from clipboard</p>
              </div>
            </div>
          </>
        )}
        <div className="pointer-events-none absolute flex h-[100%] w-[100%] object-contain group-hover/main:opacity-5">
          <img className="flex-1 rounded-lg" src={imageUrl ? imageUrl : ""} onError={handleOnError} />
        </div>
      </div>
    </div>
  );
}

export default Tile;
