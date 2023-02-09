import { ReactComponent as Spinner } from "../../../assets/icons/buttonSpinner.svg";
import "./formButton.css";

// prop type
import { FormButtonProps } from "./types";

function FormButton({ label, error, loading, small }: FormButtonProps) {
  return (
    <button
      disabled={loading || error}
      className={`FormButton${error ? " formbutton-error" : ""}${
        loading ? " formbutton-loading" : ""
      }${small ? " formbutton-small" : ""}`}
      type="submit"
    >
      {loading && <Spinner className="spinner" />}
      {label}
    </button>
  );
}

export default FormButton;
