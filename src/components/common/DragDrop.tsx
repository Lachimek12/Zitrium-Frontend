/* Libraries */
import Dropzone from "react-dropzone";

/* Types imports */
import { DragDropPrompts } from "@/types/componentArguments";

function DragDrop({ fileAction }: DragDropPrompts) {
  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      fileAction(file);
    });
  };

  return (
    <Dropzone onDrop={handleDrop} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div className={`flex flex-1`} {...getRootProps()}>
          <input className="flex-1" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
}

export default DragDrop;
