import spinner from "../../../assets/icons/spinner.png";
import "./pageLoading.css";

function PageLoading() {
  return (
    <div className="page-loading">
      <img src={spinner} alt="" />
    </div>
  );
}

export default PageLoading;
