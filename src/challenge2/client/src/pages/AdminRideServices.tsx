import { useState } from "react";
import AdminDashboardLayout from "../components/adminDashboardLayout";
import Button from "../components/Button";
import CreateRideService from "../components/CreateUtilitiesModal/CreateRideService";
import Header from "../components/header";
import RideServiceTable from "../components/tables/RideServiceTable";

function AdminRideServices() {
  const [createRideServiceToggler, setCreateRideServiceToggler] =
    useState<boolean>(false);

  return (
    <AdminDashboardLayout>
      <>
        {createRideServiceToggler && (
          <CreateRideService
            onClose={() => setCreateRideServiceToggler(false)}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Header content="Ride Services List" size="sm" />
          <Button
            content="Create New Ride Service"
            variant="contained"
            color="#62cf3a"
            onClick={() => setCreateRideServiceToggler(true)}
          />
        </div>
        <RideServiceTable />
      </>
    </AdminDashboardLayout>
  );
}

export default AdminRideServices;
