import React, { useState, useEffect } from "react";
import { DaInterPersonalData } from "../../../interfaces/daInterPersonalData";
import Input from "../../input/Input";
import Button from "../../button/Button";
import style from "./modaledit.module.css";

interface EditModalProps {
  userData: DaInterPersonalData;
  onSave: (editedData: DaInterPersonalData) => void;
  onCancel: () => void;
}

const ModalEdit: React.FC<EditModalProps> = ({
  userData,
  onSave,
  onCancel,
}) => {
  const [editedData, setEditedData] = useState<DaInterPersonalData>(userData);

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof DaInterPersonalData
  ) => {
    setEditedData({
      ...editedData,
      [fieldName]: e.target.value,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedData);
  };

  return (
    <div className={`${style["container"]}`}>
      <div className={`${style["modal-content"]}`}>
      <h2 className={`${style["tittle"]}`}>Editar DaInter</h2>
      <form>
        <div className={`${style["input-content"]}`}>
        <Input
          name="nombre"
          customStyles={`${style["input"]}`}
          placeholder="Nombre"
          label="Nombre"
          tipo="text"
          value={editedData.nombre}
          onChange={(e) => handleInputChange(e, "nombre")}
        />
        </div>
        <div className={`${style["apellidos-container"]}`}>
        <Input
          name="apellidoPaterno"
          customStyles={`${style["apellidos-input"]}`}
          placeholder="Apellido Paterno"
          label="Apellido Paterno"
          tipo="text"
          value={editedData.apellidoPaterno}
          onChange={(e) => handleInputChange(e, "apellidoPaterno")}
        />

        <Input
          name="apellidoMaterno"
          customStyles={`${style["apellidos-input"]}`}
          placeholder="Apellido Materno"
          label="Apellido Materno"
          tipo="text"
          value={editedData.apellidoMaterno}
          onChange={(e) => handleInputChange(e, "apellidoMaterno")}
        />
        </div>
        <div className={`${style["input-content"]}`}>
        <Input
          name="correo"
          customStyles={`${style["input"]}`}
          placeholder="Correo"
          label="Correo"
          tipo="text"
          value={editedData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />

        <Input
          name="escuela"
          customStyles={`${style["input"]}`}
          placeholder="Escuela"
          label="Escuela"
          tipo="text"
          value={editedData.escuela}
          onChange={(e) => handleInputChange(e, "escuela")}
        />
        </div>
        <Button type="button" onClick={onCancel} text="Cancelar" customStyles={`${style["button-cancelar"]}`}/>
        <Button type="submit" text="Guardar" onClick={handleSave} customStyles={`${style["button-guardar"]}`}/>
      </form>
      </div>
    </div>
  );
};

export default ModalEdit;
