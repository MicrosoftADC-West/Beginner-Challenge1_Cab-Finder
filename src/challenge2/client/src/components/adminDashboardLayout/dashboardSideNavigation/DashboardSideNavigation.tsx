import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { ReactComponent as Home } from "../../../assets/icons/home.svg";
import { ReactComponent as Users } from "../../../assets/icons/users.svg";
import { ReactComponent as ProfileAnalytics } from "../../../assets/icons/profile-analytics.svg";
import "./dashboardSideNavigation.css";

type DashboardSideNavigationProps = {
  type: "desktop" | "mobile";
  closeSideNav: () => void;
  page: string;
};

function DashboardSideNavigation({
  type,
  closeSideNav,
  page,
}: DashboardSideNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onHideMenu = (route?: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (route) navigate(route);
      closeSideNav();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setMenuOpen(true);
    }, 50);
  }, []);

  return (
    <div
      className={`DashboardSideNavigation${menuOpen ? " nav-visible" : ""}${
        type === "desktop"
          ? " desktop-side-navigation"
          : " mobile-side-navigation"
      }`}
    >
      <div
        className="dashboard-sidenavigation-background"
        onClick={() => {
          onHideMenu();
        }}
      />
      <div className="dashboard-sidenavigation-content-wrapper">
        <div className="logo-wrapper">
          <span className="logo">RIDER</span>
          <Close onClick={() => onHideMenu()} />
        </div>
        <div className="navigation-middle-items">
          <ul className="desktop-ul">
            <h4>Dashboard</h4>
            <li
              onClick={() => navigate("/")}
              className={page === "" ? "active-navigation" : ""}
            >
              <Home />
              <span>Home</span>
            </li>
            <li
              onClick={() => navigate("/ride_services")}
              className={page === "ride_services" ? "active-navigation" : ""}
            >
              <Users />
              <span>Ride Services</span>
            </li>
            <li
              onClick={() => navigate("/locations")}
              className={page === "locations" ? "active-navigation" : ""}
            >
              <ProfileAnalytics />
              <span>Locations</span>
            </li>
          </ul>
          <ul className="mobile-ul">
            <h4>Home</h4>
            <li
              onClick={() => onHideMenu("/")}
              className={page === "" ? "active-navigation" : ""}
            >
              <Home />
              <span>Home</span>
            </li>
            <li
              onClick={() => onHideMenu("/ride_services")}
              className={page === "ride_services" ? "active-navigation" : ""}
            >
              <Users />
              <span>Ride Services</span>
            </li>
            <li
              onClick={() => onHideMenu("/locations")}
              className={page === "locations" ? "active-navigation" : ""}
            >
              <ProfileAnalytics />
              <span>Locations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardSideNavigation;
