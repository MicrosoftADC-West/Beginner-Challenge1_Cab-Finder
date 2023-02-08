/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import SortAndSearch from "../sortAndSearch/SortAndSearch";
import "./Tables.css";
import { useEffect, useState } from "react";
import RideServicesService from "../../services/rideServices-service";

function RideServiceTable() {
  const [rideServices, setRideServices] = useState<any[]>([]);
  const service = new RideServicesService();

  const getRideServices = async () => {
    try {
      const response = await service.getAllRideServices();
      setRideServices(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRideServices();
  }, []);
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Service id</th>
            <th>Service Name</th>
            <th>Price per KM</th>
          </tr>
        </thead>
        <tbody>
          {rideServices.map((data) => (
            <tr key={data.rideservice_id}>
              <td>{data.rideservice_id}</td>
              <td>{data.rideservice_name}</td>
              <td>{data.priceperkm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default RideServiceTable;
