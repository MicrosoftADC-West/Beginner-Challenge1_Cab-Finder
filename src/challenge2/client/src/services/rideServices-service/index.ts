import axios from "axios";
import env from "../../utils/env";
const { API_URL } = env;

class RideServicesService {
  getAllRideServices() {
    return axios.get(`${API_URL}/rideservices`);
  }
}

export default RideServicesService;
