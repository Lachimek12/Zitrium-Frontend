/* Libraries */
import { useEffect, useState } from "react";

/* App modules imports */
import DragDrop from "./DragDrop";
import UploadImage from "./icons/UploadImage";
import CopyIcon from "./icons/CopyIcon";
import { notify } from "@/app/App";
import Transparent from "../../assets/images/Transparent.png";
import DeleteIcon from "./icons/DeleteIcon";
import { useSimulator } from "@contexts/SimulatorContext";

type CopyFromClipBoardPrompts = {
  copyAction: (arg0: string) => void;
};

type TilePlayerIndex = {
  playerIndex: number;
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
      const text: string = await navigator.clipboard.readText();
      setClipboardValue(text);
      setclickIndex(clickIndex + 1);
    } catch (error) {
      notify("Failed to read from clipboard");
    }
  };

  return <div className="flex-1" onClick={handleClick}></div>;
}

function Tile({ playerIndex }: TilePlayerIndex) {
  const [isDragOver, setIsDragOver] = useState<boolean>(true);
  const simulatorContext = useSimulator();

  const createTmpUrlFromImage = (file: File) => {
    const url: string = URL.createObjectURL(file);
    simulatorContext.updatePlayerAvatar(playerIndex, url);
  };

  const setUrl = async (url: string) => {
    simulatorContext.updatePlayerAvatar(playerIndex, url);
  };

  const handleDragOver = () => {
    setIsDragOver(false);
  };

  const handleDragLeave = () => {
    setIsDragOver(true);
  };

  const handleOnError = () => {
    notify("Failed to load the image");
    simulatorContext.updatePlayerAvatar(playerIndex, Transparent);
  };

  const deleteTile = () => {
    simulatorContext.deletePlayer(playerIndex);
  };

  return (
    <div className="relative flex flex-1">
      <div
        className="group/main flex flex-1 flex-col overflow-clip rounded-lg hover:cursor-pointer hover:ring-2 hover:ring-border-600"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragExit={handleDragLeave}
        onDragEnd={handleDragLeave}
        onDrop={handleDragLeave}
      >
        {isDragOver && (
          <div
            className="absolute right-1 top-1 z-10 flex h-8 w-8 items-center opacity-50 hover:opacity-100"
            onClick={deleteTile}
          >
            <DeleteIcon />
          </div>
        )}
        <div className="group relative flex flex-1">
          <div className="flex flex-1">
            <DragDrop fileAction={createTmpUrlFromImage} />
          </div>
          <div className="pointer-events-none absolute flex h-[100%] w-[100%] items-center p-6 opacity-50 group-hover:opacity-80">
            <div className="flex h-[30%] w-[30%] flex-none scale-150 items-center justify-center pr-3">
              <UploadImage />
            </div>
            <p className="text-sm">Choose file or drag it here</p>
          </div>
        </div>
        {isDragOver && (
          <>
            <hr className="mx-4 opacity-50" />
            <div className="group relative flex flex-1">
              <div className="flex flex-1">
                <CopyFromClipBoard copyAction={setUrl} />
              </div>
              <div className="pointer-events-none absolute flex h-[100%] w-[100%] items-center p-6 opacity-50 group-hover:opacity-80">
                <div className="flex h-[30%] w-[30%] scale-150 items-center pr-3">
                  <CopyIcon />
                </div>
                <p className="text-sm">Click here to copy from clipboard</p>
              </div>
            </div>
          </>
        )}
        <div className="pointer-events-none absolute z-20 flex h-[100%] w-[100%] group-hover/main:opacity-5">
          <img
            className="rounded-lg"
            src={
              simulatorContext.simulatorData.players[playerIndex].avatar
                ? simulatorContext.simulatorData.players[playerIndex].avatar
                : ""
            }
            onError={handleOnError}
          />
        </div>
      </div>
    </div>
  );
}

export default Tile;
