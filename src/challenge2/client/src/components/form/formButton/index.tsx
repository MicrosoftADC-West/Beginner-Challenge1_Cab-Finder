import "./style.css";
import FormButtonProps from "./type";

function FormButton(props: FormButtonProps) {
  const { content } = props;

  return (
    <button type="submit" className="form-button">
      {content}
    </button>
  );
}
export default FormButton;
