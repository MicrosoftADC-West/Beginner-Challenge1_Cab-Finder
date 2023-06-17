import "./style.css";
import FormButtonProps from "./type";
import CircularProgress from "@mui/material/CircularProgress";

function FormButton(props: FormButtonProps) {
  const { content, loading } = props;

  return (
    <button disabled={loading} type="submit" className="form-button">
      {loading ? <CircularProgress size={30} /> : <span> {content}</span>}
    </button>
  );
}
export default FormButton;
