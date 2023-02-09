/* eslint-disable class-methods-use-this */

import { GetRidesParameters, AddRideParameters, EditRideParameters } from "./types";

import baseURL from "../baseUrl";

class Rides {
  async getRides(data: GetRidesParameters) {
    const response = await fetch(
      `${baseURL}/rides?start_location=${data.start_location}&end_location=${data.end_location}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok || response.status === 400 || response.status === 500) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to get rides` };
  }

  async getSingleRide({ id }: { id: number }) {
    const response = await fetch(`${baseURL}/rides/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok || response.status === 404 || response.status === 500) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to get single ride` };
  }

  async addRide(data: AddRideParameters) {
    const response = await fetch(`${baseURL}/rides`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_location: data.start_location,
        end_location: data.end_location,
        ride_service: data.ride_service,
        estimated_arrival_time: data.estimated_arrival_time
      })
    });

    if (response.ok || response.status === 400 || response.status === 500) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to add ride` };
  }

  async updateRide(data: EditRideParameters) {
    const response = await fetch(`${baseURL}/rides${data.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_location: data.start_location,
        end_location: data.end_location,
        ride_service: data.ride_service,
        estimated_arrival_time: data.estimated_arrival_time
      })
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to update ride` };
  }

  async deleteRide({ id }: { id: number }) {
    const response = await fetch(`${baseURL}/rides${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status === 204) {
      return { success: true, message: "ride deleted successfully" };
    }

    if (response.status === 404 || response.status === 500) {
      return response.json();
    }

    return { message: `${response.statusText}. unable to delete ride` };
  }
}
const instance = new Rides();
export default instance;
