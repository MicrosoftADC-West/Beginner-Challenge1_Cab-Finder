export interface ButtonProps {
  content: string;
  variant: "outlined" | "contained" | "text";
  color: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  width?:String
  loading?:boolean
}
