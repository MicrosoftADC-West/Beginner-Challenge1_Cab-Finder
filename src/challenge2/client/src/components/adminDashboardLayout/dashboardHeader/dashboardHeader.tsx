import { useNavigate } from "react-router-dom";
import bellIcon from "../../../assets/icons/bellIcon.svg";
import userPicture from "../../../assets/images/placeholder-image.png";
import { ReactComponent as Menu } from "../../../assets/icons/menu.svg";
import "./dashboardHeader.css";

type DashboardHeaderProps = {
  page: string;
  onClickMenu: () => void;
  admin: any;
};

function DashboardHeader({ page, onClickMenu, admin }: DashboardHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="DashboardHeader">
      <div className="dashboard-header-left">
        <Menu onClick={onClickMenu} />
      </div>
      <div className="dashboard-header-right">
        <div
          className="notification-pill"
          // onClick={() => {
          //   navigate("/notifications");
          // }}
        >
          <img src={bellIcon} alt="" />
          <div className="active-indicator" />
        </div>
        <div
          className="user-tile"
          // onClick={() => {
          //   navigate("/personalinformation");
          // }}
        >
          <img src={admin.profilePicture || userPicture} alt="" />
          <p>{admin.name}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
