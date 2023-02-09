import axios from "axios";
import env from "../../utils/env";
import { CreateRideRequestDataType } from "./types";
const { API_URL } = env;

class RideService {
  getAllRides() {
    return axios.get(`${API_URL}/allrides`);
  }
  getRidesByLatAndLong(data: any) {
    return axios.get(`${API_URL}/rides`, {
      params: data,
    });
  }
  createNewRide(data: CreateRideRequestDataType) {
    return axios.post(`${API_URL}/rides`, data);
  }
  updateRide(data: CreateRideRequestDataType, id: number) {
    return axios.put(`${API_URL}/rides/${id}`, data);
  }
  deleteRideWithId(id: String) {
    return axios.delete(`${API_URL}/rides/${id}`);
  }
}

export default RideService;
