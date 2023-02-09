import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./dashboardHeader/dashboardHeader";
import DashboardSideNavigation from "./dashboardSideNavigation/DashboardSideNavigation";
import "./adminDashboardLayout.css";

function AdminDashboardLayout({ children }: { children: JSX.Element }) {
  const [showSideNav, setShowSideNav] = useState(false);
  const location = useLocation();

  const page = location.pathname.split("/")[1];
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  return (
    <div className="admin-dahsboard-layout">
      <DashboardHeader
        page={page}
        onClickMenu={toggleSideNav}
        admin={{ value: 0 }}
      />
      <DashboardSideNavigation
        type="desktop"
        page={page}
        closeSideNav={toggleSideNav}
      />
      {showSideNav && (
        <DashboardSideNavigation
          type="mobile"
          page={page}
          closeSideNav={toggleSideNav}
        />
      )}
      {children}
    </div>
  );
}

export default AdminDashboardLayout;
