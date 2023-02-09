/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import SortAndSearch from "../sortAndSearch/SortAndSearch";
import "./Tables.css";
import { useEffect, useState } from "react";
import LocationService from "../../services/location-service";

function LocationsTable() {
  const [allLocations, setAllLocations] = useState<any[]>([]);
  const service = new LocationService();
  const getAllLocations = async () => {
    try {
      const response = await service.getAllLocations();
      setAllLocations(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLocations();
  }, []);
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Location Id</th>
            <th>Location Description</th>
            <th>Location Starting Longtitude</th>
            <th>Location Starting Latitude</th>
            <th>Location Ending Longtitude</th>
            <th>Location Ending Latitude</th>
          </tr>
        </thead>
        <tbody>
          {allLocations.map((data) => (
            <tr key={data.location_id}>
              <td>{data.location_id}</td>
              <td>{data.location_description}</td>
              <td>{data.start_coord_long}</td>
              <td>{data.start_coord_lat}</td>
              <td>{data.destination_coord_long}</td>
              <td>{data.destination_coord_lat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default LocationsTable;
