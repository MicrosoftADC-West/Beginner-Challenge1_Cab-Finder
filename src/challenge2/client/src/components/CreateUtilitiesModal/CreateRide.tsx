import React, { useState, useEffect } from "react";
import PopModal from "../modal/PopModal";
import Header from "../header";
import FormInput, { FormDropdown } from "../form/formInput";
import FormButton from "../form/formButton";
import reformatForReactSelect from "../../utils/reformatForReactSelect";
import LocationService from "../../services/location-service";
import RideServicesService from "../../services/rideServices-service";
import RideService from "../../services/ride-service";
import { CreateRideRequestDataType } from "../../services/ride-service/types";

import "./CreateUtilsModal.css";

const CreateRide = ({ onClose }: { onClose: () => void }) => {
  // Services
  const locationService = new LocationService();
  const rideService = new RideServicesService();
  const ride = new RideService();

  // States
  const [rideCreating, setRideCreating] = useState<boolean>(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [rideServices, setRideServices] = useState<any[]>([]);
  const [createRideRequestData, setCreateRideRequestData] =
    useState<CreateRideRequestDataType>({
      start_location: {
        lat: "",
        long: "",
      },
      end_location: {
        lat: "",
        long: "",
      },
      arrival_time: "",
      ride_service: "",
    });

  // Api Services
  const getLocations = async () => {
    try {
      const response = await locationService.getAllLocations();
      setLocations(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRideServices = async () => {
    try {
      const response = await rideService.getAllRideServices();
      setRideServices(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetLocation = (val: { value: string; label: string }) => {
    const selectedLocation = locations.filter(
      (location) => location.location_id === val.value
    );
    const {
      destination_coord_lat,
      destination_coord_long,
      start_coord_lat,
      start_coord_long,
    } = selectedLocation[0];
    setCreateRideRequestData({
      ...createRideRequestData,
      start_location: { lat: start_coord_lat, long: start_coord_long },
      end_location: {
        lat: destination_coord_lat,
        long: destination_coord_long,
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setRideCreating(true);
    try {
      const response = await ride.createNewRide(createRideRequestData);
      if (response.status === 201) {
        window.location.reload();
      }
      setRideCreating(false);
    } catch (error) {
      console.log(error);
      setRideCreating(false);
    }
  };

  useEffect(() => {
    getLocations();
    getRideServices();
  }, []);
  return (
    <PopModal height="300px" width="500px" onClose={onClose}>
      <div>
        <Header content="Create New Ride" size="sm" />
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <FormDropdown
              name="locations"
              label="Locations"
              onChange={handleGetLocation}
              options={reformatForReactSelect(
                locations,
                "location_id",
                "location_description"
              )}
            />
            <FormDropdown
              name="ride_services"
              label="Ride Service"
              onChange={(value: { value: string; label: string }) =>
                setCreateRideRequestData({
                  ...createRideRequestData,
                  ride_service: value.value,
                })
              }
              options={reformatForReactSelect(
                rideServices,
                "rideservice_id",
                "rideservice_name"
              )}
            />
            <FormInput
              name="arrival_date"
              label="Estimated Arrival Time"
              value={createRideRequestData.arrival_time}
              onChange={(e: any) =>
                setCreateRideRequestData({
                  ...createRideRequestData,
                  arrival_time: e.target.value,
                })
              }
              type="date"
            />
          </div>
          <span className="location_toggler">
            Location not shown above, click here to manually input co-ordinates
          </span>
          <FormButton content="Create" loading={rideCreating} />
        </form>
      </div>
    </PopModal>
  );
};

export default CreateRide;
