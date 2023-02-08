import { useState } from "react";
import AdminDashboardLayout from "../components/adminDashboardLayout";
import Button from "../components/Button";
import CreateRide from "../components/CreateUtilitiesModal/CreateRide";
import Header from "../components/header";
import RidesTable from "../components/tables/RidesTable";

function AdminHome() {
  const [rideToggler, setRideToggler] = useState<{
    state: boolean;
    type: "create_ride" | "look_for_ride";
  }>({ state: false, type: "create_ride" });

  return (
    <AdminDashboardLayout>
      <>
        {rideToggler.state && rideToggler.type === "create_ride" && (
          <CreateRide
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
        <RidesTable />
      </>
    </AdminDashboardLayout>
  );
}

export default AdminHome;
