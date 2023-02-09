import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/form/formInput/FormInput";
import FormButton from "../../components/form/formButton/FormButton";
import "./rides.css";

function SelectRide() {
  const { register, handleSubmit, formState } = useForm();

  const navigate = useNavigate();

  const onEnterLocation: SubmitHandler<FieldValues> = data => {
    navigate(`/rides?start_location=${data.start_location}&end_location=${data.end_location}`);
  };

  return (
    <div className="select-ride">
      <div className="page-head">
        <h1>SELECT RIDE</h1>
      </div>
      <div className="page-body">
        <p>
          Enter a starting and destination location, to get the prices for different ride services
          (e.g., Uber, InDrive, Taxi, Bolt) for that route.
        </p>
        <form onSubmit={handleSubmit(onEnterLocation)}>
          <FormInput
            type="text"
            label="Starting Location:"
            subLabel="use the format - long, lat e.g 3.337778, 6.524722"
            name="start_location"
            color="white"
            register={register}
            formState={formState}
            rules={{ required: "Enter starting location" }}
            small
          />
          <FormInput
            type="text"
            label="Destination Location"
            subLabel="use the format - long, lat e.g 3.318611, 6.583333"
            name="end_location"
            color="white"
            register={register}
            formState={formState}
            rules={{ required: "Enter destination location" }}
            small
          />
          <FormButton label="Enter" error={false} loading={false} />
        </form>
      </div>
    </div>
  );
}

export default SelectRide;
