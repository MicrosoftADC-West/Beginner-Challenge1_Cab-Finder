import SelectRide from "../features/rides/SelectRide";
import Rides from "../features/rides";
import NotFound from "../components/ui/page/NotFound";

const baseRoutes = [
  {
    path: "/",
    component: SelectRide,
    meta: {
      redirectUrl: "/"
    }
  },
  {
    path: "/rides",
    component: Rides,
    meta: {
      redirectUrl: "/"
    }
  },
  {
    path: "*",
    component: NotFound,
    meta: {
      redirectUrl: "/"
    }
  }
];

export default baseRoutes;
