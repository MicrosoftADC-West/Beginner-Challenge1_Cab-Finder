import AdminHome from "../../pages/AdminHome";
import AdminLocations from "../../pages/AdminLocations";
import AdminRideServices from "../../pages/AdminRideServices";

const riderRoutes = [
  {
    path: "/",
    title: "Rider Home",
    component: AdminHome,
  },
  {
    path: "/ride_services",
    title: "Rider | Ride Services",
    component: AdminRideServices,
  },
  {
    path: "/locations",
    title: "Rider | Locations",
    component: AdminLocations,
  },
];

export default riderRoutes;
