/* eslint-disable react/jsx-props-no-spreading */
import { Controller } from "react-hook-form";
import Select from "react-select";
import "../form.css";
import "./formSelect.css";
import { FormSelectProps } from "./propType";

function FormSelect({
  label, // optional
  color,
  subLabel, // optional
  bottomLabel, // optional
  control,
  name,
  placeholder, // optional
  options,
  formState,
  rules,
  disabled,
  multi,
  small
}: FormSelectProps) {
  return (
    <div
      className={`FormSelect ${small ? "FormSelect-small" : ""} ${
        color === "white" ? "transparent" : ""
      }`}
    >
      <div className="label-wrapper">
        <label htmlFor={name}>{label}</label>
      </div>
      {subLabel && <p className="subLabel">{subLabel}</p>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            options={options}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            placeholder={placeholder}
            isDisabled={disabled}
            isMulti={multi}
          />
        )}
      />
      {bottomLabel && <p className="bottom-label">{bottomLabel}</p>}
      {formState.errors[name] && (
        <p className="formfeedback">
          {formState.errors[name as keyof typeof formState.errors]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormSelect;
