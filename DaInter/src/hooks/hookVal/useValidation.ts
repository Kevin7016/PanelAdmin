import { useState } from "react";
import {
  validacionEmail,
  validacionCampo,
  validacionPassword,
  validarConfirmacionPassword,
  validacionRol,
  verificarUser,
} from "../../utilities/validation.utilities";


export function useValidations() {
  const [emailError, setEmailWordError] = useState({
    error: false,
    message: "",
  });

  const [nombreError, setNombreError] = useState({ error: false, message: "" });

  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: false,
    message: "",
  });

  const [rolError, setRolError] = useState({
    error: false,
    message: "",
  });

  const validateEmail = (text: string, usuarios: Record<string, any>[]) => {
    const emailValidator = validacionEmail(text);
    setEmailWordError(emailValidator);

    if (!emailValidator.error) {
      const usuarioExistente = verificarUser(text, usuarios);
      if (usuarioExistente) {
        return false;
      }
    }
    return !emailValidator.error;
  };

  const validateNombre = (text: string) => {
    const nombreValidation = validacionCampo(text, "Nombre");
    setNombreError(nombreValidation);
    return !nombreValidation.error;
  };

  const validatePassword = (text: string) => {
    const passwordValidacion = validacionPassword(text);
    setPasswordError(passwordValidacion);
    return !passwordValidacion.error;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    const confirmPasswordValidation = validarConfirmacionPassword(
      password,
      confirmPassword
    );
    setConfirmPasswordError(confirmPasswordValidation);
    return !confirmPasswordValidation.error;
  };

  const validateRol = (rol: string) => {
    const rolValidation = validacionRol(rol);
    setRolError(rolValidation);
    return !rolValidation.error;
  };

  return {
    emailError,
    nombreError,
    passwordError,
    confirmPasswordError,
    rolError,
    validateEmail,
    validateNombre,
    validatePassword,
    validateConfirmPassword,
    validateRol,
  };
}
