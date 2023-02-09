import React, { useState } from "react";
import PopModal from "../modal/PopModal";
import Header from "../header";
import { CreateLocationData } from "./types";
import FormInput from "../form/formInput";
import FormButton from "../form/formButton";
import notify from "../../helpers/notify";
import LocationService from "../../services/location-service";

import "./CreateUtilsModal.css";
import RideServicesService from "../../services/rideServices-service";

const CreateRideService = ({ onClose }: { onClose: () => void }) => {
  type RideServiceData = {
    rideservice_name: string;
    priceperkm: string;
  };
  const service = new RideServicesService();
  const [rideServiceCreating, setRideServiceCreating] =
    useState<boolean>(false);
  const [data, setData] = useState<RideServiceData>({
    rideservice_name: "",
    priceperkm: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCreatingRideService = async (e: any) => {
    e.preventDefault();
    const notFilled = handleValidateRequestBody(data);
    if (notFilled) notify("error", `${notFilled} is not Filled`);
    setRideServiceCreating(true);
    try {
      const response = await service.createNewRideService(reformatObj(data));
      if (response.status === 201) {
        setRideServiceCreating(false);
        handleResetFields();
        onClose();
        window.location.reload();
      }
    } catch (error: any) {
      console.error(error);
      notify("error", error?.message);
      setRideServiceCreating(false);
    }
  };
  const handleResetFields = () => {
    setData({
      rideservice_name: "",
      priceperkm: "",
    });
  };
  const handleValidateRequestBody = (obj: RideServiceData) => {
    for (let key in obj) {
      if (!obj[key as keyof RideServiceData]) return key;
    }
  };

  const reformatObj = (obj: RideServiceData) => {
    return {
      rideservice_name: obj.rideservice_name,
      priceperkm: parseFloat(obj.priceperkm),
    };
  };
  return (
    <PopModal onClose={onClose}>
      <div>
        <Header content="Create New Ride Service" size="sm" />
        <form className="form-container" onSubmit={handleCreatingRideService}>
          <FormInput
            name="rideservice_name"
            label="Ride Service Name"
            value={data.rideservice_name}
            onChange={handleChange}
            placeholder="Uber"
          />
          <FormInput
            name="priceperkm"
            label="Price Per Km"
            value={data.priceperkm}
            onChange={handleChange}
            placeholder="20.00"
            type="number"
          />

          <FormButton content="Create" loading={rideServiceCreating} />
        </form>
      </div>
    </PopModal>
  );
};

export default CreateRideService;
