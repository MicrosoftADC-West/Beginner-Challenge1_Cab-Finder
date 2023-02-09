import { Control, FieldValues, FormState } from "react-hook-form";

export type FormSelectProps = {
  color: "white" | "blue";
  label?: string;
  subLabel?: string;
  bottomLabel?: string;
  control: Control<FieldValues, any> | undefined;
  name: string;
  placeholder?: string;
  options: {
    label: string;
    value: string | number;
  }[];
  formState: FormState<FieldValues>;
  rules: any;
  disabled?: boolean;
  multi?: boolean;
  small?: boolean;
};
