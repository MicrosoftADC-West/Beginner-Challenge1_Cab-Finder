import React, { useState } from "react";
import PopModal from "../modal/PopModal";
import Header from "../header";
import { CreateLocationData } from "./types";
import FormInput from "../form/formInput";
import FormButton from "../form/formButton";
import notify from "../../helpers/notify";
import LocationService from "../../services/location-service";

import "./CreateUtilsModal.css";

const CreateLocation = ({ onClose }: { onClose: () => void }) => {
  const service = new LocationService();
  const [locationCreating, setLocationCreating] = useState<boolean>(false);
  const [data, setData] = useState<CreateLocationData>({
    startName: "",
    start_longtitude: "",
    start_latitude: "",
    destination_name: "",
    destination_longtitude: "",
    destination_latitude: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCreatingLocation = async (e: any) => {
    e.preventDefault();
    const notFilled = handleValidateRequestBody(data);
    if (notFilled) {
      notify("error", `${notFilled} is nots Filled`);
      return;
    }
    setLocationCreating(true);
    try {
      const response = await service.createNewLocation(reformatObj(data));
      if (response.status === 201) {
        setLocationCreating(false);
        handleResetFields();
        onClose();
        window.location.reload();
      }
    } catch (error: any) {
      notify("error", error?.message);
      setLocationCreating(false);
    }
  };
  const handleResetFields = () => {
    setData({
      startName: "",
      start_longtitude: "",
      start_latitude: "",
      destination_name: "",
      destination_longtitude: "",
      destination_latitude: "",
    });
  };
  const handleValidateRequestBody = (obj: CreateLocationData) => {
    for (let key in obj) {
      if (!obj[key as keyof CreateLocationData]) return key;
    }
  };

  const reformatObj = (obj: CreateLocationData) => {
    return {
      description: `${obj.startName} To ${obj.destination_name}`,
      start_longtitude: obj.start_longtitude,
      start_latitude: obj.start_latitude,
      destination_longtitude: obj.destination_longtitude,
      destination_latitude: obj.destination_latitude,
    };
  };
  return (
    <PopModal onClose={onClose}>
      <div>
        <Header content="Create New Location" size="sm" />
        <form className="form-container" onSubmit={handleCreatingLocation}>
          <FormInput
            name="startName"
            label="Start Location Name"
            value={data.startName}
            onChange={handleChange}
            placeholder="Berlin"
          />
          <FormInput
            name="start_longtitude"
            label="Start Location Longtitude"
            value={data.start_longtitude}
            onChange={handleChange}
            placeholder="3.87772"
            type="number"
          />
          <FormInput
            name="start_latitude"
            label="Start Location Latitude"
            value={data.start_latitude}
            onChange={handleChange}
            placeholder="6.1112"
            type="number"
          />
          <FormInput
            name="destination_name"
            label="End Location Name"
            value={data.destination_name}
            onChange={handleChange}
            placeholder="Ohio"
          />
          <FormInput
            name="destination_longtitude"
            label="End Location Longtitude"
            value={data.destination_longtitude}
            onChange={handleChange}
            placeholder="9.112"
            type="number"
          />
          <FormInput
            name="destination_latitude"
            label="End Location Latitude"
            value={data.destination_latitude}
            onChange={handleChange}
            placeholder="6.1112"
            type="number"
          />
          <FormButton content="Create" loading={locationCreating} />
        </form>
      </div>
    </PopModal>
  );
};

export default CreateLocation;
