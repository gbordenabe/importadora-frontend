import { AppStructure } from "@/components/AppStructure/AppStructure";
import style from "./RecuperarContraseña.module.css";
import { useNavigate } from "react-router-dom";

export const RecuperarContraseña = () => {
	const navigate = useNavigate();

	const handleNavigateLogin = () => {
		navigate("/login");
	};

  const handleNavigateChangePassword = () => {
		navigate("/cambiar-password");
	};

	return (
		<AppStructure>
			<div className={style.login__container}>
				<div className={style.loginForm__container}>
					<p className={style.loginForm__title}>Recuperar contraseña</p>

					<div className={style.box__conainer__group}>
						<div className={style.box__container}>
							<p>
								Escribe tu correo electronico y te enviaremos un token para que cambies tu
								contraseña
							</p>

							<div className={style.textInput__container}>
								<label className={style.textInput__label}>Email / Usuario</label>
								<input className={style.textInput__input} type="text" />
							</div>

							<div className={style.loginForm__button__container}>
								<button className={style.loginForm__button}>Enviar</button>
							</div>
						</div>

						<div className={style.box__container}>
							<div className={style.textInput__container}>
								<label className={style.textInput__label}>Ingresa el token</label>
								<input className={style.textInput__input} type="text" />
							</div>

							<div className={style.loginForm__button__container}>
								<button className={style.loginForm__button} onClick={handleNavigateChangePassword}>Comprobar</button>
							</div>
						</div>
					</div>

					<p className={style.back__home} onClick={handleNavigateLogin}>Volver a iniciar sesión</p>
				</div>
			</div>
		</AppStructure>
	);
};
