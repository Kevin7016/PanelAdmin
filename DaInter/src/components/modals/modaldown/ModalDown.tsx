import React from "react";
import style from "./modaldown.module.css";
import Button from "../../button/Button";

interface ModalProps {
  user: string;
  onClose: () => void;
  downloadDocument: (fileKey: string) => void;
}

const Modal: React.FC<ModalProps> = ({ user, onClose, downloadDocument }) => {
  return (
    <div className={`${style["modal-overlay"]}`}>
      <div className={`${style["modal"]}`}>
        <div className={`${style["modal-header"]}`}>
          <h2 className={`${style["tittle"]}`}>{`Descargar Documento de ${user}`}</h2>
        </div>
        <div className={`${style["modal-content"]}`}>
          <Button
            name="actaModal"
            onClick={() => downloadDocument("actaNacimiento")}
            text="Acta de Nacimiento"
            customStyles={`${style["button"]}`}
          />

          <Button
            name="ineModal"
            onClick={() => downloadDocument("ine")}
            text="Descargar Ine"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="comprobanteModal"
            onClick={() => downloadDocument("comprobanteDomicilio")}
            text="Descargar Comprobante"
            customStyles={`${style["button"]}`}
          />

          <Button
            name="curpModal"
            onClick={() => downloadDocument("curp")}
            text="Descargar Curp"
            customStyles={`${style["button"]}`}
          />

          <Button
            name="cvModal"
            onClick={() => downloadDocument("cv")}
            text="Descargar CV"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="hrModal"
            onClick={() => downloadDocument("hr")}
            text="Descargar Horario"
            customStyles={`${style["button"]}`}
          />
        </div>
        <Button
          name="cancelModal"
          onClick={onClose}
          text="Cancelar"
          customStyles={`${style["button-cancel"]}`}
        />
      </div>
    </div>
  );
};

export default Modal;
