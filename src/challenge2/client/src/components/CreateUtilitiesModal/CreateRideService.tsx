import React from "react";
import PopModal from "../modal/PopModal";

const CreateRideService = ({ onClose }: { onClose: () => void }) => {
  return (
    <PopModal onClose={onClose}>
      <div></div>
    </PopModal>
  );
};

export default CreateRideService;
