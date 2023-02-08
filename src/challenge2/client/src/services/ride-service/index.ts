import axios from "axios";
import env from "../../utils/env";
import {CreateRideRequestDataType} from './types'
const { API_URL } = env;

class RideService {
  getAllRides() {
    return axios.get(`${API_URL}/allrides`);
  }
  createNewRide(data: CreateRideRequestDataType) {
    return axios.post(`${API_URL}/rides`, data);
  }
  deleteRideWithId(id: String) {
    return axios.delete(`${API_URL}/rides/${id}`);
  }
}

export default RideService;
