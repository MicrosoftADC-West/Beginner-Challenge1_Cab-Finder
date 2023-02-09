import { useEffect, useState } from "react";
import close from "../../../assets/icons/close.svg";
import { PopModalProps } from "./types";
import "./modal.css";

function PopModal({ children, title, onClose, scroll }: PopModalProps) {
  const [showModalCard, setShowModalCard] = useState(false);

  const onClickClose = () => {
    setShowModalCard(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    setShowModalCard(true);
  }, []);

  return (
    <div className="modal pop-modal">
      <div className="modal-background" onClick={onClickClose} />
      <div
        className={`modal-card ${showModalCard ? "show" : ""} ${
          scroll ? "scroll" : ""
        }`}
      >
        <div className="modal-header">
          <div />
          <p>{title}</p>
          <img src={close} alt="" onClick={onClickClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default PopModal;
