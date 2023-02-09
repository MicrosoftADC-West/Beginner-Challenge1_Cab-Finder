import { useEffect, useState } from "react";
import "./modal.css";

function PopModal({
  children,
  width,
  height,
  onClose,
}: {
  children: JSX.Element;
  onClose: () => void;
  width?: string;
  height?: string;
}) {
  const [showModalCard, setShowModalCard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModalCard(true);
    }, 10);
  }, []);

  return (
    <div className="modal pop-modal">
      <div
        className="modal-background"
        onClick={() => {
          setShowModalCard(false);
          setTimeout(() => {
            onClose();
          }, 100);
        }}
      />
      <div
        style={{ width, minHeight: height ?? "" }}
        className={`modal-card ${showModalCard ? "show" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export default PopModal;
