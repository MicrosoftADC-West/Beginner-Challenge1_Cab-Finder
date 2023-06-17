import "./FormInput.css";
import { FormInputProps, FormDropdownProps } from "./types";
import Select from "react-select";

export default function FormInput(props: FormInputProps) {
  const { name, type, label, value, placeholder, onChange } = props;
  return (
    <div className="inputContainer">
      <label className="formInputLabel" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        className="inputBox"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type ?? "text"}
      />
    </div>
  );
}

export function FormDropdown(props: FormDropdownProps) {
  const { name, label, onChange, options, loading } = props;
  return (
    <div>
      <label className="formInputLabel" htmlFor={name}>
        {label}
      </label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name={name}
        options={options}
        onChange={onChange}
        isLoading={loading}
        isDisabled={loading}
      />
    </div>
  );
}
