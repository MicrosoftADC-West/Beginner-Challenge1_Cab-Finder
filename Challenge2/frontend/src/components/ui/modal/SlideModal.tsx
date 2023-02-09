import { useEffect, useState } from "react";
import close from "../../../assets/icons/close.svg";
import { SlideModalProps } from "./types";
import "./modal.css";

function SlideModal({ title, titleIcon, onClose, children }: SlideModalProps) {
  const [hideModal, setHideModal] = useState(true);

  const onClickClose = () => {
    setHideModal(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setHideModal(false);
  }, []);

  return (
    <div className="modal slide-modal">
      <div className="modal-background" onClick={onClickClose} />
      <div className={`modal-card ${hideModal ? "hide" : ""}`}>
        <div className="modal-header">
          <p>
            {titleIcon && <img src={titleIcon} alt="" />}
            {title}
          </p>
          <img src={close} alt="" onClick={onClickClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default SlideModal;
