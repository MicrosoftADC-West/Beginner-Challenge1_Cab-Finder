import axios from "axios";
import env from "../../utils/env";
const { API_URL } = env;

class RideServicesService {
  getAllRideServices() {
    return axios.get(`${API_URL}/rideservices`);
  }
  createNewRideService(data: { rideservice_name: string; priceperkm: number }) {
    return axios.post(`${API_URL}/rideservices`, data);
  }
}

export default RideServicesService;
