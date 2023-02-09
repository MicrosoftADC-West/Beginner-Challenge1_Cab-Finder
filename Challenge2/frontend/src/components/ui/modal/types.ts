export type SlideModalProps = {
  title: string;
  titleIcon?: string;
  onClose: () => void;
  children: JSX.Element;
};

export type PopModalProps = {
  title: string;
  onClose: () => void;
  children: JSX.Element;
  scroll?: boolean;
};
