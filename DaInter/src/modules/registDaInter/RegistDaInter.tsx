import React, { useEffect, useState } from "react";
import style from "./registdainter.module.css";
import { DaInterUser } from "../../interfaces/daInter-interface";
import { store2 } from "../../../DB/index";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { validacionEmail } from "../../utilities/validation.utilities";
import { validacionCampo } from "../../utilities/validation.utilities";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

const Insert = () => {
  const initialState: DaInterUser = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    escuela: "",
    actaNacimiento: null,
    ine: null,
    comprobanteDomicilio: null,
    curp: null,
    cv: null,
    horario: null,
    fechaIngreso: "",
  };
  const [resetFileLabels, setResetFileLabels] = useState(false);
  const [formData, setFormData] = useState<DaInterUser>(initialState);
  const [contador, setContador] = useState<number>(0);
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [nombreError, setNombreError] = useState({ error: false, message: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [apellidoPaternoError, setApellidoPaternoError] = useState({
    error: false,
    message: "",
  });
  const [apellidoMaternoError, setApellidoMaternoError] = useState({
    error: false,
    message: "",
  });
  const [escuelaError, setEscuelaError] = useState({
    error: false,
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    switch (name) {
      case "nombre":
        const nombreValidationResult = validacionCampo(value, "Nombre");
        setNombreError({
          error: nombreValidationResult.error,
          message: nombreValidationResult.message,
        });
        break;
      case "apellidoPaterno":
        const apellidoPaternoValidationResult = validacionCampo(
          value,
          "Apellido Paterno"
        );
        setApellidoPaternoError({
          error: apellidoPaternoValidationResult.error,
          message: apellidoPaternoValidationResult.message,
        });
        break;
      case "apellidoMaterno":
        const apellidoMaternoValidationResult = validacionCampo(
          value,
          "Apellido Materno"
        );
        setApellidoMaternoError({
          error: apellidoMaternoValidationResult.error,
          message: apellidoMaternoValidationResult.message,
        });
        break;
      case "escuela":
        const escuelaValidationResult = validacionCampo(value, "Escuela");
        setEscuelaError({
          error: escuelaValidationResult.error,
          message: escuelaValidationResult.message,
        });
        break;
      case "email":
        const emailValidationResult = validacionEmail(value);
        setEmailError({
          error: emailValidationResult.error,
          message: emailValidationResult.message,
        });
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const emailValidationResult = validacionEmail(formData.email);
    setEmailError({
      error: emailValidationResult.error,
      message: emailValidationResult.message,
    });
  
    if (!emailValidationResult.error) {
      try {
        let emailExists = false;
        await store2.iterate((value: DaInterUser) => {
          if (value.email === formData.email) {
            emailExists = true;
          }
        });
  
        if (emailExists) {
          toast.warning('DaInter ya registrado');
        } else {
          const uniqueKey = `DaInter-${contador + 1}`;
          const fechaIngreso = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  
          const dataToSave: DaInterUser = {
            ...formData,
            fechaIngreso,
          };
  
          await store2.setItem(uniqueKey, dataToSave);
          await store2.setItem("contador", contador + 1);
          setContador(contador + 1);
          setResetFileLabels(true);
          setFormData(initialState);
          toast.success('DaInter Ingresado Correctamente');
          console.log("Datos guardados en LocalForage-store2.");
        }
      } catch (error) {
        toast.error('Error al guardar');
        console.error(
          "Error al guardar los datos en LocalForage-store2:",
          error
        );
      }
    }
  };
  

  useEffect(() => {
    store2
      .getItem("contador")
      .then((value) => {
        if (typeof value === "number") {
          setContador(value);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el contador desde LocalForage:", error);
      });
  }, []);

  useEffect(() => {
    setIsButtonDisabled(
      nombreError.error ||
        apellidoPaternoError.error ||
        apellidoMaternoError.error ||
        escuelaError.error ||
        emailError.error
    );
  }, [
    nombreError,
    apellidoPaternoError,
    apellidoMaternoError,
    escuelaError,
    emailError,
  ]);

  useEffect(() => {
    setIsButtonDisabled(
      !formData.nombre ||
        !formData.apellidoPaterno ||
        !formData.apellidoMaterno ||
        !formData.email ||
        !formData.escuela ||
        nombreError.error ||
        apellidoPaternoError.error ||
        apellidoMaternoError.error ||
        escuelaError.error ||
        emailError.error
    );
  }, [
    formData,
    nombreError,
    apellidoPaternoError,
    apellidoMaternoError,
    escuelaError,
    emailError,
  ]);

  console.log(isButtonDisabled);

  return (
    <div>
      <h1 className={`${style["tittle"]}`}>Nuevo DaInter</h1>
      <form onSubmit={handleSubmit} className={`${style["register-form"]}`}>
        <div className={`${style["form-group"]}`}>
          <Input
            label="Nombre:"
            placeholder="Nombres"
            tipo="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            error={nombreError.error}
            message={nombreError.message}
            customStyles={`${style["input"]}`}
            required
          />

          <Input
            placeholder="Apellido Paterno"
            label="Apellido Paterno:"
            tipo="text"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleInputChange}
            error={apellidoPaternoError.error}
            message={apellidoPaternoError.message}
            customStyles={`${style["input"]}`}
            required
          />

          <Input
            placeholder="Apellido Materno"
            label="Apellido Materno:"
            tipo="text"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleInputChange}
            error={apellidoMaternoError.error}
            message={apellidoMaternoError.message}
            customStyles={`${style["input"]}`}
            required
          />

          <Input
            placeholder="Correo"
            label="Correo:"
            tipo="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={emailError.error}
            message={emailError.message}
            customStyles={`${style["input"]}`}
            required
          />
        </div>

        <div className={`${style["form-group"]}`}>
          <Input
            placeholder="Escuela"
            label="Escuela:"
            tipo="text"
            name="escuela"
            value={formData.escuela}
            onChange={handleInputChange}
            error={escuelaError.error}
            message={escuelaError.message}
            customStyles={`${style["input"]}`}
            required
          />
          <Input
            placeholder=""
            label="CV (pdf):"
            tipo="file"
            name="cv"
            onChange={handleFileChange}
            customStyles={`${style["input"]}`}
            accept=".pdf"
            resetFileLabel={resetFileLabels}
          />

          <div className={`${style["fixed"]}`}>
            <Input
              placeholder=""
              label="Acta Nacimiento (pdf):"
              tipo="file"
              name="actaNacimiento"
              onChange={handleFileChange}
              accept=".pdf"
              resetFileLabel={resetFileLabels}
            />
            <div className={`${style["fixed"]}`}>
              <Input
                placeholder=""
                label="Horario (pdf):"
                tipo="file"
                name="hr"
                onChange={handleFileChange}
                accept=".pdf"
                resetFileLabel={resetFileLabels}
              />
            </div>
          </div>
        </div>
        <div className={`${style["form-group"]}`}>
          <Input
            placeholder=""
            label="INE (pdf):"
            tipo="file"
            name="ine"
            onChange={handleFileChange}
            accept=".pdf"
            resetFileLabel={resetFileLabels}
          />
          <div className={`${style["fixed"]}`}>
            <Input
              placeholder=""
              label="Comprobante Domicilio (pdf):"
              tipo="file"
              name="comprobanteDomicilio"
              onChange={handleFileChange}
              accept=".pdf"
              resetFileLabel={resetFileLabels}
            />
          </div>

          <div className={`${style["fixed"]}`}>
            <Input
              placeholder=""
              label="CURP (pdf):"
              tipo="file"
              name="curp"
              onChange={handleFileChange}
              accept=".pdf"
              resetFileLabel={resetFileLabels}
            />
          </div>
          <Button
            name="guardar"
            type="submit"
            text="Guardar"
            onClick={handleSubmit}
            customStyles={`${style["submit-button"]} ${
              isButtonDisabled ? style["invalid-button"] : style["valid-button"]
            }`}
            disabled={isButtonDisabled}
          />
        </div>
        <div className={`${style["form-group"]}`}></div>
      </form>
      <ToastContainer className={`${style["toast-container"]}`} />
    </div>
  );
};
export default Insert;
