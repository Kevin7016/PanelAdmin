import React, { useState, useEffect } from "react";
import { userEdit } from "../../../interfaces/userEdit";
import Input from "../../input/Input";
import Button from "../../button/Button";
import Select from "../../select/Select";
import style from "./modaledituser.module.css";

interface EditUserModalProps {
  userData: userEdit;
  onSave: (editedData: userEdit) => void;
  onCancel: () => void;
}

const ModalEditUser: React.FC<EditUserModalProps> = ({
  userData,
  onSave,
  onCancel,
}) => {
  const [editedData, setEditedData] = useState<userEdit>(userData);

  const roleOptions = ["Administrador", "Secretario"];

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: keyof userEdit
  ) => {
    if (
      fieldName === "name" ||
      fieldName === "email" ||
      fieldName === "password" ||
      fieldName === "role"
    ) {
      setEditedData({
        ...editedData,
        [fieldName]: e.target.value,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedData);
  };

  return (
    <div className={`${style["modal-container"]}`}>
      <div className={`${style["modal-content"]}`}>
      <h2 className={`${style["tittle"]}`}>Editar Usuario</h2>
      <form className={`${style["form"]}`}>
        <Input
          name="nombre"
          customStyles={`${style["input"]}`}
          placeholder="Nombre"
          label="Nombre"
          tipo="text"
          value={editedData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <Input
          name="correo"
          customStyles={`${style["input"]}`}
          placeholder="Correo"
          label="Correo"
          text="text"
          value={editedData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <Input
          name="contraseña"
          customStyles={`${style["input"]}`}
          placeholder="Contraseña"
          label="Contraseña"
          tipo="text"
          value={editedData.password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <div className={`${style["div-select"]}`}>
        <Select
          customStyles={`${style["select"]}`}
          nombre="select-modaluser"
          label="Rol"
          selectedValue={editedData.role} 
          onChange={(e) => handleInputChange(e, "role")}
          required
          defaultOption="Seleccione un rol"
          options={roleOptions}
        ></Select>
        </div>
        <div>
        <Button
          name="cancel"
          type="button"
          onClick={onCancel}
          text="Cancelar"
          customStyles={`${style["button-cancelar"]}`}
        />
        <Button
          type="submit"
          text="Guardar"
          onClick={handleSave}
          customStyles={`${style["button-guardar"]}`}
        />
        </div>
      </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
