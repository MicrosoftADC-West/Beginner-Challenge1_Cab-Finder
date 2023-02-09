import React, { useState, useEffect } from "react";
import PopModal from "../modal/PopModal";
import Header from "../header";
import FormInput, { FormDropdown } from "../form/formInput";
import FormButton from "../form/formButton";
import reformatForReactSelect from "../../utils/reformatForReactSelect";
import notify from "../../helpers/notify";
import LocationService from "../../services/location-service";
import RideServicesService from "../../services/rideServices-service";
import RideService from "../../services/ride-service";
import { CreateRideRequestDataType } from "../../services/ride-service/types";

import "./CreateUtilsModal.css";

const LookForRide = ({
  onClose,
  state,
  setState,
}: {
  onClose: () => void;
  state: any;
  setState: any;
}) => {
  // Services
  const locationService = new LocationService();
  const ride = new RideService();

  // States
  const [locations, setLocations] = useState<{
    data: any[];
    loading: boolean;
    error: any;
  }>({ data: [], loading: false, error: null });
  const [createRideRequestData, setCreateRideRequestData] = useState<any>({
    start_location: {
      lat: "",
      long: "",
    },
    end_location: {
      lat: "",
      long: "",
    },
  });

  // Api Services
  const getLocations = async () => {
    setLocations({ ...locations, loading: true });
    try {
      const response = await locationService.getAllLocations();
      setLocations({ ...locations, loading: false, data: response?.data });
    } catch (error) {
      console.log(error);
      setLocations({ ...locations, loading: false, error });
    }
  };

  const handleGetLocation = (val: { value: string; label: string }) => {
    const selectedLocation = locations.data.filter(
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

  const getRides = async (e:any) => {
    e.preventDefault()
    if (
      !createRideRequestData.start_location.lat &&
      !createRideRequestData.start_location.long &&
      !createRideRequestData.end_location.lat &&
      !createRideRequestData.end_location.long
    ) {
      notify("error", `LOCATION is not filled`);
      return;
    }
    onClose();
    setState({ ...state, loading: true });
    try {
      const response = await ride.getRidesByLatAndLong(createRideRequestData);
      setState({ ...state, loading: false, data: response?.data });
    } catch (error) {
      setState({ ...state, loading: false, error: error });
      console.log(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  return (
    <PopModal height="200px" width="500px" onClose={onClose}>
      <div>
        <Header content="Look for a Ride" size="sm" />
        <form onSubmit={getRides}>
          <div>
            <FormDropdown
              name="locations"
              label="Locations"
              onChange={handleGetLocation}
              options={reformatForReactSelect(
                locations.data,
                "location_id",
                "location_description"
              )}
              loading={locations.loading}
            />
          </div>
          <span className="location_toggler">Manually enter co-ordinates</span>
          <FormButton content="Search" />
        </form>
      </div>
    </PopModal>
  );
};

export default LookForRide;
