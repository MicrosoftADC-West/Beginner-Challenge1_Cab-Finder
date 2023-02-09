import { useState } from "react";
import AdminDashboardLayout from "../components/adminDashboardLayout";
import Button from "../components/Button";
import CreateRide from "../components/CreateUtilitiesModal/CreateRide";
import LookForRide from "../components/CreateUtilitiesModal/LookForRide";
import Header from "../components/header";
import RidesTable from "../components/tables/RidesTable";

function AdminHome() {
  const [rideToggler, setRideToggler] = useState<{
    state: boolean;
    type: "create_ride" | "look_for_ride";
  }>({ state: false, type: "create_ride" });

  const [allRides, setAllRides] = useState<{
    data: any[];
    loading: boolean;
    error: any;
  }>({ data: [], loading: false, error: null });

  return (
    <AdminDashboardLayout>
      <>
        {rideToggler.state && rideToggler.type === "create_ride" && (
          <CreateRide
            onClose={() => setRideToggler({ ...rideToggler, state: false })}
          />
        )}
        {rideToggler.state && rideToggler.type === "look_for_ride" && (
          <LookForRide
            state={allRides}
            setState={setAllRides}
            onClose={() => setRideToggler({ ...rideToggler, state: false })}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Header content="Rides List" size="sm" />
          <div>
            
            <Button
              content="Look for a Ride"
              variant="contained"
              color="#62cf3a"
              onClick={() =>
                setRideToggler({ state: true, type: "look_for_ride" })
              }
            />
            <Button
              content="Create New Ride"
              variant="contained"
              color="#62cf3a"
              onClick={() =>
                setRideToggler({ state: true, type: "create_ride" })
              }
            />
          </div>
        </div>
        <RidesTable setState={setAllRides} state={allRides} />
      </>
    </AdminDashboardLayout>
  );
}

export default AdminHome;
