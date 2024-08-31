export type ProfileFramePrompts = {
  image: string;
  clickEvent?: () => void;
};

export type DragDropPrompts = {
  fileAction: (File) => void;
};
