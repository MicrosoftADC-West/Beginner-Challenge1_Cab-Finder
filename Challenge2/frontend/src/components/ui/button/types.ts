export type ButtonProps = {
  type: "text" | "contained" | "outlined";
  color: string;
  backgroundColor: string;
  icon?: string;
  text: string;
  onClick: () => void;
  big?: boolean;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
};
