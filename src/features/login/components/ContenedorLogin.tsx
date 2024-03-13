
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logoImg from "../../../assets/logo.svg";

import style from "./ContenedorLogin.module.css";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/slices/auth";
import Loading from "@/components/Loading/Loading";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { ValidationModal } from "@/features/NuevaTransaccion/ValidationModal/ValidationModal";

export let ContenedorLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false)
	const errorLogin = useModal();

	const validationSchema = Yup.object().shape({
		user_name_or_email: Yup.string().required("El usuario es requerido"),
		password: Yup.string().required("La contraseña es requerida"),
	});

	const formik = useFormik({
		initialValues: {
			user_name_or_email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values: any) => {
			try {
				setLoading(true);
				await dispatch(getUser(values));
			} catch (error) {
				console.error("Error al iniciar sesión:", error);
				
			} finally {
				setLoading(false);
				errorLogin.onVisibleModal();
			}
		},
	});

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
			  <img className={style.logoImg} src={logoImg} alt="logo de la empresa" />
			</div>
	
			<div className={style.loginForm__container}>
			  <p className={style.loginForm__title}>Iniciar sesión</p>
	
			  <form onSubmit={formik.handleSubmit}>
				<div className={style.textInput__container}>
				  <label className={style.textInput__label}>Usuario</label>
				  <input
					className={style.textInput__input}
					type="text"
					name="user_name_or_email"
					value={formik.values.user_name_or_email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				  />
				  {formik.touched.user_name_or_email && formik.errors.user_name_or_email ? (
					<div className={style.error}>{formik.errors.user_name_or_email as any}</div>
				  ) : null}
				</div>
	
				<div className={style.textInput__container}>
				  <label className={style.textInput__label}>Contraseña</label>
				  <input
					className={style.textInput__input}
					type="password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				  />
				  {formik.touched.password && formik.errors.password ? (
					<div className={style.error}>{formik.errors.password as any}</div>
				  ) : null}
				</div>
	
				<p className={style.recoveryPassword__text} onClick={handleRecuperarContraseña}>
				  Olvidaste tu contraseña?
				</p>
	
				<div className={style.loginForm__button__container}>
				  <button className={style.loginForm__button} type="submit">
					Ingresar
				  </button>
				</div>
			  </form>
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
			  textButton='Volver a intentar'
			/>
		  </PrimeModal>
		</>
	  );
};