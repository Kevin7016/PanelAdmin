import React from "react";
import style from "./confirmationmodal.module.css";
import Button from "../../button/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${style["modal-overlay"]}`}>
      <div className={`${style["modal"]}`}>
        <div className={`${style["modal-content"]}`}>
          <h1 className={`${style["tittle"]}`}>{message}</h1>
          <Button
            name="cancelmodal"
            onClick={onClose}
            text="Cancelar"
            customStyles={`${style["button-cancel"]}`}
          />
          <Button
            name="confirmodal"
            onClick={onConfirm}
            text="Confirmar"
            customStyles={`${style["button-confirm"]}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
