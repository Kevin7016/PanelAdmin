import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux-slices/authSlice";
import {
  verificarCredenciales,
  validacionEmail,
} from "../../utilities/validation.utilities";
import { toast } from "react-toastify";
import { store1} from '../../../DB/index';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logUser, setlogUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailWordError] = useState({
    error: false,
    message: "",
  });

  const [showToastContainer, setShowToastContainer] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const hasPasswordError = passwordError !== "";

  const [showPassword, setShowPassword] = useState(false);

  const getAllUsersFromLocalForage = async (): Promise<Record<string, any>[]> => {
    const userListKeys = await store1.keys();
    const userList = await Promise.all(
      userListKeys.map(async (userKey) => {
        try {
          const userData = await store1.getItem(userKey);
          if (userData) {
            return { key: userKey, ...userData };
          } else {
            return null;
          }
        } catch (error) {
          console.error(`Error al obtener datos del usuario con clave ${userKey}: ${error}`);
          return null;
        }
      })
    );
    return userList as Record<string, any>[];
  };
  
  const submitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");
    console.log(logUser.email);
    console.log(logUser.password);

    const usuarios = await getAllUsersFromLocalForage();

    console.log(usuarios)
    const resultado = verificarCredenciales(
      logUser.email,
      logUser.password,
      usuarios
    );

    if (typeof resultado === "string") {
      setPasswordError(resultado);
      setShowToastContainer(true)
      toast.error('Verifique el usuario y/o contraseña');
    } else {
      const usuarioAutenticado = {
        ...resultado,
        isAuth: true,
      };

      await store1.setItem(resultado.key, usuarioAutenticado);
  
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      dispatch(login());
      navigate("/dashboard");
    }
  };

  const handleForm = (text: string, who: number) => {
    switch (who) {
      case 1:
        const emailValidator = validacionEmail(text);
        setEmailWordError(emailValidator);
        if (emailValidator.error) {
        } else {
          setEmailWordError({ error: false, message: "" });
        }
        setlogUser({ ...logUser, email: text });
        break;
      case 2:
        setlogUser({ ...logUser, password: text });
        break;
      default:
        break;
    }
  };

  return {
    logUser,
    emailError,
    passwordError,
    showPassword,
    hasPasswordError,
    showToastContainer,
    setShowToastContainer,
    setShowPassword,
    handleForm,
    submitInfo,
  };
};

export default useLogin;
