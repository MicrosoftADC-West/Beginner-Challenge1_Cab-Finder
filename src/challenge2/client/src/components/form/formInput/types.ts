export type FormInputProps = {
  name: string;
  type?: "number" | "text" | "tel" | "email" | "submit" | "checkbox" | "date";
  label: string;
  placeholder?: string;
  value: string;
  onChange: any;
};
export type FormDropdownProps = {
  name: string;
  label: string;
  onChange: any;
  options: { value: string; label: string }[];
  loading?: boolean;
};
