/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { ReactComponent as EyeOpen } from "../../../assets/icons/eyeOpen.svg";
import { ReactComponent as EyeClose } from "../../../assets/icons/eyeClose.svg";
import "../form.css";
import "./formInput.css";

// prop type
import { FormInputProps } from "./propType";

function FormInput({
  color,
  label, // optional
  subLabel, // optional
  bottomLabel, // optional
  type,
  register,
  name,
  placeholder, // optional
  defaultValue, // optional
  formState,
  rules,
  disabled, // optional
  small // optional
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`FormInput ${small ? "FormInput-small" : ""}`}>
      {label && (
        <div className="label-wrapper">
          <label htmlFor={name}>{label}</label>
        </div>
      )}
      {subLabel && <p className="subLabel">{subLabel}</p>}
      <div className="input-wrapper">
        <input
          className={color === "white" ? "transparent" : ""}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          {...register(name, rules)}
        />
        {type === "password" && showPassword && <EyeOpen onClick={() => setShowPassword(false)} />}
        {type === "password" && !showPassword && <EyeClose onClick={() => setShowPassword(true)} />}
      </div>
      {bottomLabel && <p className="bottom-label">{bottomLabel}</p>}
      {formState.errors[name] && (
        <p className="formfeedback">
          {formState.errors[name as keyof typeof formState.errors]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormInput;
