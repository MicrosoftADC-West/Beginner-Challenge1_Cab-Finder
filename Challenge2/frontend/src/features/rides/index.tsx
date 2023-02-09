/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import PageLoading from "../../components/ui/loader/PageLoading";
import Table from "../../components/table/Table";
import "./rides.css";
import "../../components/form/formSelect/formSelect.css";

// api service
import Ride from "../../utils/apiServices/rides";
import notify from "../../utils/notify";
import { RideType } from "./types";

function Rides() {
  const [loading, setLoading] = useState(true);
  const [rideServices, setRideServices] = useState<RideType[]>([]);
  const [bestService, setBestService] = useState<RideType>();
  const [searchParams] = useSearchParams();
  const startLocation = searchParams.get("start_location");
  const endLocation = searchParams.get("end_location");

  const navigate = useNavigate();

  const onSelectSort = (newValue: SingleValue<{ label: string; value: string }>) => {
    const sortValue = newValue?.value;
    if (sortValue && sortValue === "price") {
      const sortedServices = rideServices.sort((p1, p2) => {
        if (p1.price > p2.price) {
          return 1;
        }
        if (p1.price < p2.price) {
          return -1;
        }

        return 0;
      });

      setRideServices([...sortedServices]);
    }

    if (sortValue && sortValue === "ride_service") {
      const sortedServices = rideServices.sort((p1, p2) => {
        if (p1.rideservice_name > p2.rideservice_name) {
          return 1;
        }
        if (p1.rideservice_name < p2.rideservice_name) {
          return -1;
        }

        return 0;
      });

      setRideServices([...sortedServices]);
    }

    if (sortValue && sortValue === "estimated_arrival_time") {
      const sortedServices = rideServices.sort((p1, p2) => {
        if (p1.estimated_arrival_time > p2.estimated_arrival_time) {
          return 1;
        }
        if (p1.estimated_arrival_time < p2.estimated_arrival_time) {
          return -1;
        }

        return 0;
      });

      setRideServices([...sortedServices]);
    }
  };

  useEffect(() => {
    if (startLocation && endLocation) {
      Ride.getRides({ start_location: startLocation, end_location: endLocation }).then(res => {
        if (res.success) {
          setLoading(false);
          setRideServices(res.data.rides);
          let minService = res.data.rides[0];
          res.data.rides.forEach((ride: RideType) => {
            if (ride.price < minService.price) {
              minService = ride;
            }
          });
          setBestService(minService);
        } else {
          notify("error", res.message);
          setLoading(false);
        }
      });
    } else {
      notify("error", "Please provide starting and destination locations");
      navigate("/");
    }

    // eslint-disable-next-line
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <div className="rides">
      <div className="page-head">
        <h1>RIDE SERVICES</h1>
        <p>
          Current Best Price: {bestService?.rideservice_name} @ {bestService?.price.toFixed(2)}
        </p>
      </div>
      <div className="page-body">
        <div className="FormSelect FormSelect-small transparent">
          <div className="label-wrapper">
            <label>Sort By:</label>
          </div>
          <Select
            options={[
              { label: "Price", value: "price" },
              { label: "Ride Service", value: "ride_service" },
              { label: "Estimated Arival Time", value: "estimated_arrival_time" }
            ]}
            onChange={onSelectSort}
          />
        </div>
        <Table
          tableHead={[
            { key: 1, value: "Ride service" },
            { key: 2, value: "Price" },
            { key: 3, value: "Estimated arrival time" }
          ]}
          tableBody={rideServices.map((rideService, i) => ({
            key: i,
            entry: [
              { key: 1, value: rideService.rideservice_name },
              { key: 2, value: rideService.price.toFixed(2) },
              {
                key: 3,
                value: `${new Date(
                  rideService.estimated_arrival_time
                ).toLocaleDateString()} ${new Date(
                  rideService.estimated_arrival_time
                ).toLocaleTimeString()}`
              }
            ]
          }))}
        />
      </div>
    </div>
  );
}

export default Rides;
