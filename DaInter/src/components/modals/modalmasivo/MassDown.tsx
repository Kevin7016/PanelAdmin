import React from "react";
import style from "./massdown.module.css";
import Button from "../../button/Button";

type UserFormDataType = Record<string, any>;

interface ModalProps {
  user: string;
  users: UserFormDataType[];
  onClose: () => void;
  downloadDocument: (fileKey: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, downloadDocument }) => {
  return (
    <div className={`${style["modal-overlay"]}`}>
      <div className={`${style["modal"]}`}>
        <div className={`${style["modal-header"]}`}>
          <h2 className={`${style["tittle"]}`}>DESCARGAR DOCUMENTOS</h2>
        </div>
        <div className={`${style["modal-content"]}`}>
          <Button
            name="actaModalMas"
            onClick={() => downloadDocument("actaNacimiento")}
            text="Acta de Nacimiento"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="ineModalMas"
            onClick={() => downloadDocument("ine")}
            text="Descargar INE"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="comprobanteModalMas"
            onClick={() => downloadDocument("comprobanteDomicilio")}
            text="Comprobante de Domicilio"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="curpModalMas"
            onClick={() => downloadDocument("curp")}
            text="Descargar CURP"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="cvModalMas"
            onClick={() => downloadDocument("cv")}
            text="Descargar CV"
            customStyles={`${style["button"]}`}
          />
          <Button
            name="hrModalMas"
            onClick={() => downloadDocument("hr")}
            text="Descargar Horario"
            customStyles={`${style["button"]}`}
          />
        </div>
        <Button
          name="cancelModalMas"
          onClick={onClose}
          text="Cancelar"
          customStyles={`${style["button-cancel"]}`}
        />
      </div>
    </div>
  );
};

export default Modal;
