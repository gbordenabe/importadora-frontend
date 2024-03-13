import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.svg";

import style from "./ContenedorLogin.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/slices/auth";
import Loading from "@/components/Loading/Loading";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { ValidationModal } from "@/features/NuevaTransaccion/ValidationModal/ValidationModal";

export let ContenedorLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorLogin = useModal();

  const [loading, setLoading] = useState<boolean>(false);

  const [login, setLogin] = useState<any>({
    user_name_or_email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      await dispatch(getUser(login));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
      errorLogin.onVisibleModal();
    }
  };
  const handleRecuperarContraseña = () => {
    navigate("/recuperar-password");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.login__container}>
          <div className={style.logo__container}>
            <img
              className={style.logoImg}
              src={logoImg}
              alt="logo de la empresa"
            />
          </div>

          <div className={style.loginForm__container}>
            <p className={style.loginForm__title}>Iniciar sesión</p>

            <div className={style.textInput__container}>
              {/* <label className={style.textInput__label}>Email / Usuario</label> */}
              <label className={style.textInput__label}>Usuario</label>
              <input
                className={style.textInput__input}
                type="text"
                name="user_name_or_email"
                value={login.user_name_or_email}
                onChange={(e) => handleChangeInput(e, setLogin)}
              />
            </div>

            <div className={style.textInput__container}>
              <label className={style.textInput__label}>Contraseña</label>
              <input
                className={style.textInput__input}
                type="password"
                name="password"
                value={login.password}
                onChange={(e) => handleChangeInput(e, setLogin)}
              />
            </div>

            <p
              className={style.recoveryPassword__text}
              onClick={handleRecuperarContraseña}
            >
              Olvidaste tu contraseña?
            </p>

            <div className={style.loginForm__button__container}>
              <button className={style.loginForm__button} onClick={handleLogin}>
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
      <PrimeModal
        header="Error en inicio de sesión"
        modalStatus={errorLogin.modalStatus}
        onHideModal={errorLogin.onHideModal}
        titleCenter
      >
        <ValidationModal
          onHideModal={errorLogin.onHideModal}
          description="Usuario o contraseña son incorrectas"
          textButton="Volver a intentar"
        />
      </PrimeModal>
    </>
  );
};
