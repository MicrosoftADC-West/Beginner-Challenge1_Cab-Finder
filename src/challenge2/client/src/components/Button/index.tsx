import { ButtonProps } from "./types";
import "./Button.css";

function Button(props: ButtonProps) {
  const { content, variant, color, disabled, fullWidth, onClick, size, width } =
    props;
  const fontSize = () => {
    switch (size) {
      case "xs":
        return "10px";
      case "sm":
        return "15px";
      case "md":
        return "20px";
      case "lg":
        return "25px";
      case "xl":
        return "30px";
      default:
        return "11px";
    }
  };
  const style = () => {
    switch (variant) {
      case "text":
        return {
          fontSize: fontSize(),
          color: color ?? "rgb(51, 51, 51)",
          width: fullWidth ? "100%" : "",
        };
      case "contained":
        return {
          fontSize: fontSize(),
          color: "white",
          backgroundColor: color,
          width: fullWidth ? "100%" : width ? width : "",
        };
      case "outlined":
        return {
          fontSize: fontSize(),
          color,
          border: `1px solid ${color}`,
          width: fullWidth ? "100%" : width ? width : "",
        };
      default:
        return { color };
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className="button"
      style={style() as any}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
export default Button;
