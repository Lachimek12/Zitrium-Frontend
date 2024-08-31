/* Types imports */
import { ProfileFramePrompts } from "@customTypes/componentArguments";

function ProfileFrame({ image, clickEvent = () => {} }: ProfileFramePrompts) {
  return (
    <div className="flex aspect-square h-[70%] justify-center self-center">
      <div
        className={`flex aspect-square rotate-45 justify-center self-center border-[0.0625rem] border-border-700 shadow-3xl transition-all hover:h-[95%] hover:cursor-pointer hover:shadow-3xl-hover`}
        onClick={clickEvent}
      >
        <div className="flex aspect-square flex-1 justify-center self-center overflow-clip">
          <img className="h-[141%] w-[141%] max-w-[142%] flex-shrink-0 -rotate-45 self-center" src={image} />
        </div>
      </div>
    </div>
  );
}

export default ProfileFrame;
