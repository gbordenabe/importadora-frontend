import { AppStructure } from "@/components/AppStructure/AppStructure";
import style from "./CambiarContraseña.module.css";
import { useNavigate } from "react-router-dom";

export const CambiarContraseña = () => {
	const navigate = useNavigate();

	const handleNavigateLogin = () => {
		navigate("/login");
	};

	return (
		<AppStructure>
			<div className={style.login__container}>
				<div className={style.loginForm__container}>
					<p className={style.loginForm__title}>Recuperar contraseña</p>

					<div className={style.box__container}>
						<p>
							Hola {"{nombre de usuario}"}, estas por cambiar tu contraseña. Debes ingresarla 2
							veces para comprobar y luego iniciar sesión.
						</p>

						<div className={style.textInput__container}>
							<label className={style.textInput__label}>Contraseña</label>
							<input className={style.textInput__input} type="text" />
						</div>

						<div className={style.textInput__container}>
							<label className={style.textInput__label}>Re-escribir Contraseña</label>
							<input className={style.textInput__input} type="text" />
						</div>

						<div className={style.loginForm__button__container}>
							<button className={style.loginForm__button}>Cambiar</button>
						</div>
					</div>
					<p className={style.back__home} onClick={handleNavigateLogin}>
						Volver a iniciar sesión
					</p>
				</div>
			</div>
		</AppStructure>
	);
};
