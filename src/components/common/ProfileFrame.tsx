type ProfileFramePrompts = {
  image: string;
  clickEvent?: () => void;
};

function ProfileFrame({ image, clickEvent = () => {} }: ProfileFramePrompts) {
  return (
    <div className="flex aspect-square h-[70%] justify-center self-center">
      <div
        className={`shadow-3xl hover:shadow-3xl-hover border-border-700 flex aspect-square rotate-45 justify-center self-center border-[0.0625rem] transition-all hover:h-[95%] hover:cursor-pointer`}
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
