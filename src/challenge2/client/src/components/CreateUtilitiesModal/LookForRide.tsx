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
  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);
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

  const getRides = async (e: any) => {
    e.preventDefault();
    if (
      !createRideRequestData.start_location.lat ||
      !createRideRequestData.start_location.long ||
      !createRideRequestData.end_location.lat ||
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
          {useCoordinates ? (
            <div className="form-container">
              <FormInput
                name="start_longtitude"
                label="Starting Longtitude"
                value={createRideRequestData.start_location.long}
                onChange={(e: any) =>
                  setCreateRideRequestData({
                    ...createRideRequestData,
                    start_location: {
                      ...createRideRequestData.start_location,
                      long: e.target.value,
                    },
                  })
                }
                placeholder="3.6000"
                type="number"
              />
              <FormInput
                name="start_latitude"
                label="Starting Latitude"
                value={createRideRequestData.start_location.lat}
                onChange={(e: any) =>
                  setCreateRideRequestData({
                    ...createRideRequestData,
                    start_location: {
                      ...createRideRequestData.start_location,
                      lat: e.target.value,
                    },
                  })
                }
                placeholder="3.87772"
                type="number"
              />
              <FormInput
                name="destination_longtitude"
                label="Destination Longitude"
                value={createRideRequestData.end_location.long}
                onChange={(e: any) =>
                  setCreateRideRequestData({
                    ...createRideRequestData,
                    end_location: {
                      ...createRideRequestData.end_location,
                      long: e.target.value,
                    },
                  })
                }
                placeholder="6.1112"
                type="number"
              />
              <FormInput
                name="destination_latitude"
                label="Destination Latitude"
                value={createRideRequestData.end_location.lat}
                onChange={(e: any) =>
                  setCreateRideRequestData({
                    ...createRideRequestData,
                    end_location: {
                      ...createRideRequestData.end_location,
                      lat: e.target.value,
                    },
                  })
                }
                placeholder="9.112"
                type="number"
              />
            </div>
          ) : (
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
          )}
          <span
            className="location_toggler"
            onClick={() => setUseCoordinates(!useCoordinates)}
          >
            {useCoordinates
              ? "Select Location Automatically"
              : "Manually enter co-ordinates"}
          </span>
          <FormButton content="Search" />
        </form>
      </div>
    </PopModal>
  );
};

export default LookForRide;
