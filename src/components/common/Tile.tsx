/* Libraries */
import { useState } from "react";

/* App modules imports */
import DragDrop from "./DragDrop";
import UploadImage from "./icons/UploadImage";

function Tile() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const createTmpUrlFromImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <div className="relative flex flex-1">
      <div className="group m-0 flex flex-1 rounded-lg p-0 hover:cursor-pointer hover:ring-2 hover:ring-border-600">
        <div className="flex flex-1">
          <DragDrop fileAction={createTmpUrlFromImage} />
        </div>
        <div className="pointer-events-none absolute flex h-[100%] w-[100%] items-center justify-center p-6 opacity-50 group-hover:opacity-80">
          <div className="flex h-[30%] w-[30%] flex-none scale-150 items-center justify-center pr-3">
            <UploadImage />
          </div>
          <p className="flex-1 text-sm">Choose file or drag it here</p>
        </div>
        <div className="pointer-events-none absolute flex h-[100%] w-[100%] object-contain group-hover:opacity-5">
          <img className="flex-1 rounded-lg" src={imageUrl ? imageUrl : ""} />
        </div>
      </div>
    </div>
  );
}

export default Tile;
