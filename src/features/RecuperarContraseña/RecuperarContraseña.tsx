import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./RecuperarContraseña.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { MainButton } from "@/components/MainButton/MainButton";
import { BlockUI } from "primereact/blockui";

export const RecuperarContraseña = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [token, setToken] = useState("");
	const [errorToken, setErrorToken] = useState("");

	const handleNavigateLogin = () => {
		navigate("/login");
	};

	const handleSendEmail = async () => {
		// const resp = await getFetch(`/auth/pass-recovery-req/${email}`);
		try {
			const resp = await axios.get(`/auth/pass-recovery-req/${email}`);
			console.log(resp);
			setStep(2);
		} catch (error) {
			setErrorEmail("No se encontro el email o no ha sido verificado");
		}
	};

	const handleSendCode = async () => {
		try {
			const resp = await axios.head(`/auth/check-code-and-email/${token}/${email}`);
			console.log(resp);
			navigate("/cambiar-password");
		} catch (error) {
			setErrorToken("El token ingresado no es válido");
		}
	};

	useEffect(() => {
		if (errorEmail) {
			setTimeout(() => {
				setErrorEmail("");
			}, 7000);
		}

		if (errorToken) {
			setTimeout(() => {
				setErrorToken("");
			}, 7000);
		}
	}, [errorEmail, errorToken]);

	return (
		<AppStructure>
			<div className={style.login__container}>
				<div className={style.loginForm__container}>
					<p className={style.loginForm__title}>Recuperar contraseña</p>

					<div className={style.box__conainer__group}>
						<BlockUI blocked={step === 2}>
							<div className={style.box__container}>
								<p>
									Escribe tu correo electronico y te enviaremos un token para que cambies tu
									contraseña
								</p>

								<div className={style.textInput__container}>
									<label className={style.textInput__label}>Email</label>
									<input
										className={style.textInput__input}
										type="text"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										disabled={step === 2}
									/>
									{errorEmail && <p>{errorEmail}</p>}
								</div>

								<div className={style.loginForm__button__container}>
									<MainButton text="Enviar" onClick={handleSendEmail} />
								</div>
							</div>
						</BlockUI>

						<BlockUI blocked={step === 1}>
							<div className={style.box__container}>
								<div className={style.textInput__container}>
									<label className={style.textInput__label}>Ingresa el token</label>
									<input
										className={style.textInput__input}
										type="text"
										name="token"
										value={token}
										onChange={(e) => setToken(e.target.value)}
										disabled={step === 1}
									/>
								</div>

								<div className={style.loginForm__button__container}>
									<MainButton text="Comprobar" onClick={handleSendCode} />
								</div>
							</div>
						</BlockUI>
					</div>

					<p className={style.back__home} onClick={handleNavigateLogin}>
						Volver a iniciar sesión
					</p>
				</div>
			</div>
		</AppStructure>
	);
};
