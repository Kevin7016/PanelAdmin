import React from "react";
import style from "./register.module.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import Peye from "../../assets/login-icons/Peye";
import PeyeLock from "../../assets/login-icons/PeyeLock";
import useRegist from "../../hooks/hookRegist/useRegist";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DaCodes from "../../assets/login-icons/DaCodes"

function Register() {
  const navigate = useNavigate();
  const {
    formUser,
    passwordError,
    emailError,
    nombreError,
    selectedRole,
    confirmPassword,
    confirmPasswordError,
    isFormValid,
    showPassword,
    showPassword2,
    rolError,
    setShowPassword,
    setShowPassword2,
    handleForm,
    handleRegistro,
  } = useRegist();

  
  const roleOptions = ["Administrador", "Secretario"];

  return (
    <div className={`${style["register-container"]}`}>
      <div className={`${style["icon"]}`}>
      <DaCodes/>
      </div>
      <form className={`${style["register-form"]}`}>
        <h2 className={`${style["text"]}`}>INGRESE SU INFORMACIÓN</h2>
        <div className={`${style["form-group"]}`}>
          
          <Input
            customStyles={`${style["input"]}`}
            name="nombre"
            tipo="text"
            label="Nombres"
            placeholder="Nombres"
            value={formUser.name}
            onChange={(event) => handleForm(event.target.value, 1)}
            error={nombreError.error}
            message={nombreError.message}
            required
          />

          <div className={`${style["div-select"]}`}>
          <Select
            nombre="select-rol"
            label="Rol"
            customStyles={`${style["select"]}`}
            selectedValue={selectedRole}
            onChange={(event) => handleForm(event.target.value, 2)}
            required
            options={roleOptions}
            error={rolError.error}
            message={rolError.message}
            defaultOption="Seleccione un rol"
          ></Select>
          </div>

          <Input
            customStyles={`${style["input"]}`}
            name="correo"
            tipo="email"
            label="Correo"
            placeholder="Correo"
            value={formUser.email}
            onChange={(event) => handleForm(event.target.value, 3)}
            error={emailError.error}
            message={emailError.message}
            required
          />

          <Input
            customStyles={`${style["input"]}`}
            name="contraseña"
            tipo={showPassword ? "text" : "password"}
            label="Contraseña"
            placeholder="Contraseña"
            value={formUser.password}
            onChange={(e) => handleForm(e.target.value, 4)}
            error={passwordError.error}
            message={passwordError.message}
            required
          >
            <Button
              type="button"
              text=""
              customStyles={`${style["eye-button"]}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Peye /> : <PeyeLock />}
            </Button>
          </Input>

          <Input
            customStyles={`${style["input"]}`}
            name="Repita la contraseña"
            placeholder="Repita la contraseña"
            label="Repetir contraseña"
            tipo={showPassword2 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handleForm(e.target.value, 5)}
            error={confirmPasswordError.error}
            message={confirmPasswordError.message}
            required
          >
            <Button
              text=""
              customStyles={`${style["eye-button"]}`}
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <Peye /> : <PeyeLock />}
            </Button>
          </Input>
        </div>
        <div className={`${style["button-content"]}`}>
          <Button
            type="submit"
            text="Registrarse"
            customStyles={`${style["register-button"]} ${
              isFormValid ? style["valid-button"] : style["invalid-button"]
            }`}
            onClick={handleRegistro}
            disabled={!isFormValid}
          />
          <Button
            text="Cancelar"
            onClick={() => navigate(`/`)}
            customStyles={`${style["register-button2"]}`}
          />
        </div>
      </form>
      <ToastContainer className={`${style["toast-container"]}`} />
    </div>
  );
}

export default Register;
