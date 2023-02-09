import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

export type FormInputProps = {
  color: "white" | "blue";
  label?: string;
  subLabel?: string;
  bottomLabel?: string;
  type: "text" | "tel" | "password" | "email" | "number" | "date" | "time";
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  formState: FormState<FieldValues>;
  rules: any;
  disabled?: boolean;
  small?: boolean;
};
