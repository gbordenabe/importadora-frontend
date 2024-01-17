import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.svg";

import style from "./ContenedorLogin.module.css";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/slices/auth";

export let ContenedorLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [login, setLogin] = useState<any>({
		username: "",
		password: "",
	});

	const handleLogin = () => {
		dispatch(getUser(login));
		// navigate("/tablero-vendedor");
		// navigate("/tablero-tesorero");
	};

	const handleRecuperarContraseña = () => {
		navigate("/recuperar-password");
	};

	return (
		<div className={style.login__container}>
			<div className={style.logo__container}>
				<img className={style.logoImg} src={logoImg} alt="logo de la empresa" />
			</div>

			<div className={style.loginForm__container}>
				<p className={style.loginForm__title}>Iniciar sesión</p>

				<div className={style.textInput__container}>
					{/* <label className={style.textInput__label}>Email / Usuario</label> */}
					<label className={style.textInput__label}>Usuario</label>
					<input
						className={style.textInput__input}
						type="text"
						name="username"
						value={login.username}
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

				<p className={style.recoveryPassword__text} onClick={handleRecuperarContraseña}>
					Olvidaste tu contraseña?
				</p>

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
