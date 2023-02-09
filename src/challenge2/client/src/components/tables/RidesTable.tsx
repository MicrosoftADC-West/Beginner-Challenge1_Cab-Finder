/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import "./Tables.css";
import { useEffect, useState } from "react";
import SortAndSearch from "../sortAndSearch/SortAndSearch";
import PopModal from "../modal/PopModal";
import Button from "../Button";
import RideService from "../../services/ride-service";
import RideServicesService from "../../services/rideServices-service";
import reformatForReactSelect from "../../utils/reformatForReactSelect";
import { TableSkeletonLoader } from "../skeletonLoaders/TableSkeletonLoader";
import FormButton from "../form/formButton";
import FormInput, { FormDropdown } from "../form/formInput";
import Header from "../header";
import { CreateRideRequestDataType } from "../../services/ride-service/types";
import notify from "../../helpers/notify";
import LocationService from "../../services/location-service";

type RideType = {
  ride_id: string;
  location_description: string;
  rideservice_name: string;
  estimated_arrival_time: string;
};

function RidesTable({ setState, state }: { setState: any; state: any }) {
  // const [rides, setState] = useState<RideType[]>([]);
  // const [rideFetching, setRideFetching] = useState<boolean>(false);
  const [initialRideValues, setInitialRidesValues] = useState<RideType[]>([]);
  const [rideServices, setStateervices] = useState<any>([]);
  const [filterByKeyword, setFilterByKeyword] = useState<String>("");
  const [deleteRide, setDeleteRide] = useState<{
    status: boolean;
    id: string;
  }>({ status: false, id: "" });
  const [editRide, setEditRide] = useState<{
    status: boolean;
    data: any;
  }>({ status: false, data: "" });

  const service = new RideService();
  const rideService = new RideServicesService();

  const getRides = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await service.getAllRides();
      setState(response?.data);
      setInitialRidesValues(response?.data);
      setState({ ...state, loading: false, data: response?.data });
    } catch (error) {
      setState({ ...state, loading: false, error: error });
      console.log(error);
    }
  };
  const getRideServices = async () => {
    try {
      const response = await rideService.getAllRideServices();
      setStateervices(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRides();
    getRideServices();
  }, []);

  useEffect(() => {
    if (filterByKeyword === "") {
      setState(initialRideValues);
    } else {
      const temprides = initialRideValues.filter(
        (ride) => ride?.rideservice_name === filterByKeyword
      );
      setState({ ...state, data: temprides });
    }
  }, [filterByKeyword]);
  return (
    <section>
      {deleteRide.status && (
        <DeleteRideModal
          onClose={() => setDeleteRide({ status: false, id: "" })}
          id={deleteRide.id}
          reRenderFunction={getRides}
        />
      )}
      {editRide.status && (
        <EditRideModal
          onClose={() => setEditRide({ status: false, data: "" })}
          data={editRide.data}
          reRenderFunction={getRides}
        />
      )}
      <SortAndSearch
        state={state}
        setState={setState}
        searchKey="ride_id"
        sortByOptions={reformatForReactSelect(
          rideServices,
          "rideservice_id",
          "rideservice_name"
        )}
        sortFunction={(sortedKeyword: { value: String; label: String }) =>
          setFilterByKeyword(sortedKeyword.label)
        }
        initialState={initialRideValues}
      />

      {state.loading ? (
        <TableSkeletonLoader
          rowNo={20}
          columnValues={[
            "Ride Id",
            "Ride Route",
            "Ride Service",
            "Ride Arrival Time",
            "Ride Price",
            "Action",
          ]}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ride Id</th>
              <th>Ride Route</th>
              <th>Ride Service</th>
              <th>Ride Arrival Time</th>
              <th>Ride Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.data?.map((data: any) => (
              <tr key={data.ride_id}>
                <td>{data.ride_id}</td>
                <td>{data.location_description}</td>
                <td>{data.rideservice_name}</td>
                <td>{`${data?.estimated_arrival_time.slice(
                  0,
                  10
                )} ${data?.estimated_arrival_time.slice(11, 19)}`}</td>
                {data.price && <td>{parseFloat(data?.price.toFixed(2))}</td>}

                <td className="action_buttons">
                  <Button
                    content="Edit Ride"
                    variant="contained"
                    color="green"
                    size="xs"
                    onClick={() => setEditRide({ status: true, data })}
                  />
                  <Button
                    content="Delete Ride"
                    variant="contained"
                    color="red"
                    size="xs"
                    onClick={() =>
                      setDeleteRide({ status: true, id: data.ride_id })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
export default RidesTable;

const DeleteRideModal = ({
  onClose,
  id,
  reRenderFunction,
}: {
  onClose: () => void;
  id: string;
  reRenderFunction: () => void;
}) => {
  const service = new RideService();
  const [deleting, setDeleting] = useState<boolean>(false);
  const deleteRide = async () => {
    setDeleting(true);
    try {
      await service.deleteRideWithId(id);
      onClose();
      reRenderFunction();
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };
  return (
    <PopModal onClose={onClose}>
      <div>
        Are you sure you want to delete this Ride?
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            content="Cancel"
            variant="outlined"
            color="#62cf3a"
            size="xs"
            onClick={onClose}
            width="100px"
          />
          <Button
            content="Delete Ride"
            variant="contained"
            color="red"
            size="xs"
            loading={deleting}
            onClick={deleteRide}
            width="100px"
          />
        </div>
      </div>
    </PopModal>
  );
};

const EditRideModal = ({
  onClose,
  data,
  reRenderFunction,
}: {
  onClose: () => void;
  data: any;
  reRenderFunction: () => void;
}) => {
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
      arrival_time: data.estimated_arrival_time.slice(0, 10),
      ride_service: "",
    });
  console.log(data);

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
    if (
      !createRideRequestData.start_location.lat &&
      !createRideRequestData.start_location.long &&
      !createRideRequestData.end_location.lat &&
      !createRideRequestData.end_location.long
    ) {
      notify("error", `LOCATION is not filled`);
      return;
    }
    const validationResult = handleValidateData(createRideRequestData);

    if (validationResult) {
      notify("error", `${validationResult.toLocaleUpperCase()} is not filled`);
      return;
    }
    setRideCreating(true);
    try {
      const response = await ride.updateRide(
        createRideRequestData,
        data.ride_id
      );
      if (response.status === 200) {
        window.location.reload();
      }
      setRideCreating(false);
    } catch (error) {
      console.log(error);
      setRideCreating(false);
    }
  };
  const handleValidateData = (obj: CreateRideRequestDataType) => {
    for (let key in obj) {
      if (!obj[key as keyof CreateRideRequestDataType]) {
        return key;
      }
    }
  };

  useEffect(() => {
    getLocations();
    getRideServices();
  }, []);

  return (
    <PopModal height="300px" width="500px" onClose={onClose}>
      <div>
        <Header content="Update Ride" size="sm" />
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
          <FormButton content="Update" loading={rideCreating} />
        </form>
      </div>
    </PopModal>
  );
};
