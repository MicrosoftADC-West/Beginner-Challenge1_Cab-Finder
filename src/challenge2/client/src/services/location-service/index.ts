import axios from "axios";
import env from "../../utils/env";
const { API_URL } = env;

class LocationService {
  getAllLocations() {
    return axios.get(`${API_URL}/locations`);
  }
  createNewLocation(data: any) {
    return axios.post(`${API_URL}/locations`, data);
  }
}

export default LocationService;
