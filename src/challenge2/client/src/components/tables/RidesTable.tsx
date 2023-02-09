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

  const service = new RideService();
  const rideService = new RideServicesService();

  const getRides = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await service.getAllRides();
      setState(response?.data);
      setInitialRidesValues(response?.data);
      setState({ ...state, loading: false, data: response?.data });

      // setRideFetching(false);
    } catch (error) {
      setState({ ...state, loading: false, error: error });

      console.log(error);
      // setRideFetching(false);
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
                <td>100</td>
                <td>
                  <Button
                    fullWidth
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
