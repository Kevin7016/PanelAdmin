import style from "./login.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import DaCodes from "../../assets/login-icons/DaCodes";
import DaInter from "../../assets/login-icons/svg/LogoInterns.png";
import Input from "../../components/input/Input";
import Peye from "../../assets/login-icons/Peye";
import PeyeLock from "../../assets/login-icons/PeyeLock";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "../../hooks/hookLogin/useLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserIcon from "../../assets/login-icons/UserIcon";

const Login = () => {
  const {
    logUser,
    emailError,
    showPassword,
    hasPasswordError,
    showToastContainer,
    setShowToastContainer,
    setShowPassword,
    handleForm,
    submitInfo,
  } = useLogin();

  const navigate = useNavigate();

  return (
    <div className={`${style["login-container"]}`}>
      <form className={`${style["login-form"]}`}>
      <DaCodes className={`${style["dacodes-icon"]}`} />
        <div className={style["container-mobile"]}>
          <DaCodes className={`${style["dacodes-icon-mobile"]}`} />
          <Button
            text="SING IN"
            onClick={() => navigate(`/register`)}
            customStyles={`${style["singIn-button-mobile"]}`}
            type="button"
          />
        </div>
        <h1 className={`${style["tittle-mobile"]}`}>Bienvenido</h1>
        <div className={`${style["div-icon"]}`}>
          <UserIcon className={`${style["user-icon"]}`} />
        </div>
        <div className={`${style["form-group"]}`}>
          <Input
            customStyles={`${style["input"]}`}
            placeholder="Correo"
            name="correo"
            tipo="email"
            label={emailError.message}
            value={logUser.email}
            onChange={(event) => handleForm(event.target.value, 1)}
            error={emailError.error || hasPasswordError}
            required
          />

          <Input
            placeholder="Contraseña"
            customStyles={`${style["input"]}`}
            tipo={showPassword ? "text" : "password"}
            name="contraseña"
            label=""
            error={hasPasswordError}
            value={logUser.password}
            onChange={(event) => handleForm(event.target.value, 2)}
            required
          >
            
            <Button
              text=""
              type="button"
              customStyles={`${style["eye-button"]}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(!showPassword);
                setShowToastContainer(false);
              }}
            >
              {showPassword ? <Peye /> : <PeyeLock />}
            </Button>
          </Input>
        </div>

        <Button
          text="Login"
          type="submit"
          customStyles={`${style["login-button"]}`}
          onClick={submitInfo}
        />

        <a
          className={`${style["main-page"]}`}
          href="https://dacodes.com/"
          target="_blank"
        >
          <h1 className={`${style["main-page"]}`}>Pagina de Inicio</h1>
        </a>
      </form>
      <div className={`${style["letter"]}`}>
        <Button
          text="SING IN"
          onClick={() => navigate(`/register`)}
          customStyles={`${style["singIn-button"]}`}
          type="button"
        />
        <h1
          className={`${style["font"]}`}
          style={{ fontWeight: "bold", fontFamily: "Inder", fontSize: 80 }}
        >
          BIENVENIDO
        </h1>
        <h2
          className={`${style["font"]}`}
          style={{ fontWeight: "bold", fontFamily: "Inder", paddingTop: 20 }}
        >
          Panel de Administrador
        </h2>
        <img className={`${style["img"]}`} src={DaInter} />
      </div>
      {showToastContainer && (
        <ToastContainer className={`${style["toast-container"]}`} />
      )}
    </div>
  );
};
export default Login;
