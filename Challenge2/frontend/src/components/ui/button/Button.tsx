import { ReactComponent as Spinner } from "../../../assets/icons/buttonSpinner.svg";
import { ButtonProps } from "./types";
import "./button.css";

function Button({
  type,
  color,
  backgroundColor,
  icon,
  text,
  onClick,
  big,
  long,
  loading,
  disabled
}: ButtonProps) {
  return (
    <div className="button-wrapper">
      <button
        className={`${big ? "big" : ""}  ${long ? "long" : ""} ${text === "" ? "no-text" : ""} ${
          disabled ? "disabled" : ""
        }`}
        style={{
          color,
          backgroundColor,
          border: type === "outlined" ? `1px solid ${color}` : "none"
        }}
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading ? (
          <Spinner stroke={color} />
        ) : (
          <>
            {icon && <img src={icon} alt="" />}
            {text}
          </>
        )}
      </button>
    </div>
  );
}

export default Button;
