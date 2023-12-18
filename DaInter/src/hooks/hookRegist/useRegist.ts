import { useState, useEffect } from "react";
import { useValidations } from "../hookVal/useValidation";
import { toast } from "react-toastify";
import { store1} from '../../../DB/index';
import { IFormUser } from "../../interfaces/login-interfaces";

const useRegist = () => {
  const {
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
  } = useValidations();

  const [formUser, setformUser] = useState<IFormUser>({
    name: "",
    role: "",
    email: "",
    password: "",
    isAuth: false,
  });


  const [selectedRole, setSelectedRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showPassword2, setShowPassword2] = useState(false);

  const [contador, setContador] = useState<number>(0);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const [userList, setUserList] = useState<IFormUser[]>([]);

  useEffect(() => {
    store1
      .getItem("contador")
      .then((value) => {
        if (typeof value === "number") {
          setContador(value);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el contador desde localForage:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedUserList: IFormUser[] = [];
  
        const fetchUser = async (userKey: string) => {
          try {
            const userDataObject: IFormUser | null = await store1.getItem(
              userKey
            );
            if (userDataObject) {
              updatedUserList.push(userDataObject);
            }
          } catch (error) {
            console.error(`Error al obtener datos del usuario ${userKey}`, error);
          }
        };
  
        for (let i = 0; i <= contador; i++) {
          const userKey = `user-${i.toString(36)}`;
          await fetchUser(userKey);
        }
  
        setUserList(updatedUserList);
      } catch (error) {
        console.error("Error al cargar datos de usuarios", error);
      }
    };
  
    fetchData();
  }, [contador]);
  

  useEffect(() => {
    handleForm(formUser.name, 1);
    handleForm(formUser.role, 2);
    handleForm(formUser.email, 3);
    handleForm(confirmPassword, 5);
  }, [formUser.name, formUser.role, formUser.email, confirmPassword]);

  const handleForm = (text: string, who: number) => {
    let isValid = true;
    let isEmailValid = true;

    switch (who) {
      case 1:
        isValid = validateNombre(text);
        setformUser({ ...formUser, name: text });
        break;

      case 2:
        isValid = validateRol(text);
        setformUser({ ...formUser, role: text });
        setSelectedRole(text);
        break;

      case 3:
        isEmailValid = validateEmail(text, userList);
        setformUser({ ...formUser, email: text });
        break;

      case 4:
        isValid = validatePassword(text);
        setformUser({ ...formUser, password: text });
        setPassword(text);
        isValid = validateConfirmPassword(text, confirmPassword);
        break;

      case 5:
        isValid = validateConfirmPassword(password, text);
        setConfirmPassword(text);
        break;

      default:
        break;
    }
    const isAllFieldsFilled =
      validateNombre(formUser.name) &&
      validateRol(formUser.role) &&
      validateEmail(formUser.email, userList) &&
      validatePassword(formUser.password) &&
      validateConfirmPassword(formUser.password, confirmPassword);

    setIsFormValid(isValid && isAllFieldsFilled && isEmailValid);
    return isValid;
  };

  const handleRegistro = async () => {
    if (isFormValid) {
      const newContador = contador + 1;
      const userKey = `user-${newContador.toString(36)}`;
      const newUser: IFormUser = {
        name: formUser.name,
        role: selectedRole,
        email: formUser.email,
        password: formUser.password,
        isAuth:false,
      };

      try {
        await store1.setItem(userKey, newUser);

        setUserList([...userList, newUser]);

        setformUser({
          name: "",
          role: "",
          email: "",
          password: "",
          isAuth:false,
        });
        setConfirmPassword("");

        await store1.setItem("contador", newContador);

        setContador(newContador);

        toast.success("Se ha guardado su registro.");
      } catch (error) {
        console.error("Error al guardar registro", error);
        toast.error("Ha ocurrido un problema. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return {
    formUser,
    passwordError,
    emailError,
    nombreError,
    selectedRole,
    confirmPassword,
    confirmPasswordError,
    rolError,
    isFormValid,
    showPassword,
    showPassword2,
    setShowPassword2,
    setShowPassword,
    setSelectedRole,
    handleForm,
    handleRegistro,
  };
};

export default useRegist;
