import styles from "./style.module.css";

const FormErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className={styles.errorMessageBorder}>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
};

export default FormErrorMessage;
