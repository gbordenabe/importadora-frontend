import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.svg";

import style from "./ContenedorLogin.module.css";

export let ContenedorLogin = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState<any>({
		email: "",
		password: "",
	});

	const handleLogin = () => {
		// dispatch(getUser(user));
		navigate("/tablero-vendedor");
	};

	// const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setUser({ ...user, [e.target.name]: e.target.value });
	// };

	return (
		<div className={style.login__container}>
			<div className={style.logo__container}>
				<img className={style.logoImg} src={logoImg} alt="logo de la empresa" />
			</div>

			<div className={style.loginForm__container}>
				<p className={style.loginForm__title}>Iniciar sesión</p>

				<div className={style.textInput__container}>
					<label className={style.textInput__label}>Email / Usuario</label>
					<input className={style.textInput__input} type="text" />
				</div>

				<div className={style.textInput__container}>
					<label className={style.textInput__label}>Contraseña</label>
					<input className={style.textInput__input} type="password" />
				</div>

				<p className={style.recoveryPassword__text}>Olvidaste tu contraseña?</p>

				<div className={style.loginForm__button__container}>
					<button className={style.loginForm__button} onClick={handleLogin}>
						Ingresar
					</button>
					p
				</div>
			</div>
		</div>
	);
};
