import { useState } from "react";
import AdminDashboardLayout from "../components/adminDashboardLayout";
import Button from "../components/Button";
import CreateLocation from "../components/CreateUtilitiesModal/CreateLocation";
import Header from "../components/header";
import LocationsTable from "../components/tables/LocationTable";

function AdminLocations() {
  const [createLocationToggler, setCreateLocationToggler] =
    useState<boolean>(false);

  return (
    <AdminDashboardLayout>
      <>
        {createLocationToggler && (
          <CreateLocation onClose={() => setCreateLocationToggler(false)} />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Header content="Locations List" size="sm" />
          <Button
            content="Create New Location"
            variant="contained"
            color="#62cf3a"
            onClick={() => setCreateLocationToggler(true)}
          />
        </div>

        <LocationsTable />
      </>
    </AdminDashboardLayout>
  );
}

export default AdminLocations;
