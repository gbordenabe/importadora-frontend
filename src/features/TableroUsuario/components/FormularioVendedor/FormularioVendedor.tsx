import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioVendedor.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";
import { SelectField } from "@/components/SelectField/SelectField";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
	setOptionCreateSelect?: any;
	onHideModal?: any;
}

export const FormularioVendedor = ({ setOptionCreateSelect, onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/user", "Usuario");

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues: {
			user_name: "",
			name: "",
			last_name: "",
			password: "",
			email: "",
			verifyEmail: "",
			province: "",
			city: "",
			location: ".",
			role_id: 1,
		},
		onSubmit: async (values) => {
			const { verifyEmail, ...restData } = values;
			try {
				await postFetchData(restData);
				onHideModal();
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema: Yup.object({
			user_name: Yup.string().required("Este campo es requerido"),
			name: Yup.string().required("Este campo es requerido"),
			last_name: Yup.string().required("Este campo es requerido"),
			password: Yup.string()
				.min(8, "La contraseña debe de tener mínimo 8 dígitos")
				.matches(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
				.matches(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula")
				.matches(/\d/, "La contraseña debe incluir al menos un número")
				.required("La contraseña es obligatoria"),
			email: Yup.string()
				.email("El formato del correo electrónico es incorrecto")
				.required("Este campo es requerido"),
			verifyEmail: Yup.string()
				.email("El formato del correo electrónico es incorrecto")
				.oneOf([Yup.ref("email")], "Los correos ingresados no coinciden")
				.required("Este campo es requerido"),
		}),
	});

	// El rol del vendedor es 1, tesorero 2.

	const [provincias, setProvincias] = useState<any>([]);
	const [municipios, setMunicipios] = useState<any>([]);
	// const [localidades, setLocalidades] = useState<any>([]);

	useEffect(() => {
		fetch("https://apis.datos.gob.ar/georef/api/provincias?max=500")
			.then((res) => res.json())
			.then((data) => {
				const respData = data?.provincias.map((item: any) => ({
					id: item.id,
					name: item.nombre,
					value: item.nombre,
				}));

				setProvincias(respData);
			});
	}, []);

	useEffect(() => {
		if (values?.province) {
			// setvalues((prev) => ({ ...prev, city: "", location: "" }));
			fetch(
				`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${values.province}&max=500`
			)
				.then((res) => res.json())
				.then((data) => {
					const respData = data?.departamentos.map((item: any) => ({
						id: item.id,
						name: item.nombre,
						value: item.nombre,
					}));

					setMunicipios(respData);
				});
		}
	}, [values.province]);

	// useEffect(() => {
	// 	if (values?.city) {
	// 		setvalues((prev) => ({ ...prev, location: "" }));
	// 		fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${values.city}&max=500`)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				const respData = data?.localidades.map((item: any) => ({
	// 					id: item.id,
	// 					name: item.nombre,
	// 					value: item.nombre,
	// 				}));

	// 				setLocalidades(respData);
	// 			});
	// 	}
	// }, [values.city]);

	const handleReset = () => {
		setOptionCreateSelect("");
	};

	return (
		<form noValidate onSubmit={handleSubmit} className={style.form__container}>
			<div className={style.form__group}>
				<div>
					<TextBoxField
						textLabel="Nombre de usuario:"
						name="user_name"
						value={values.user_name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.user_name && errors.user_name && (
						<span className="msg__form__error">{errors.user_name}</span>
					)}
				</div>
				<div>
					<TextBoxField
						textLabel="Nombre:"
						name="name"
						value={values.name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.name && errors.name && <span className="msg__form__error">{errors.name}</span>}
				</div>
				<div>
					<TextBoxField
						textLabel="Apellido:"
						name="last_name"
						value={values.last_name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.last_name && errors.last_name && (
						<span className="msg__form__error">{errors.last_name}</span>
					)}
				</div>
				<div>
					<TextBoxField
						textLabel="Contraseña:"
						name="password"
						type="password"
						value={values.password || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.password && errors.password && (
						<span className="msg__form__error">{errors.password}</span>
					)}
				</div>
				<div>
					<TextBoxField
						textLabel="Email:"
						name="email"
						type="email"
						value={values.email || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.email && errors.email && (
						<span className="msg__form__error">{errors.email}</span>
					)}
				</div>
				<div>
					<TextBoxField
						textLabel="Repetir email:"
						name="verifyEmail"
						type="email"
						value={values.verifyEmail || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.verifyEmail && errors.verifyEmail && (
						<span className="msg__form__error">{errors.verifyEmail}</span>
					)}
				</div>

				<div>
					<SelectField
						textLabel="Provincia:"
						name="province"
						options={provincias}
						value={values.province || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.province && errors.province && (
						<span className="msg__form__error">{errors.province}</span>
					)}
				</div>
				<div>
					<SelectField
						textLabel="Departamento:"
						name="city"
						options={municipios}
						value={values.city || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.city && errors.city && <span className="msg__form__error">{errors.city}</span>}
				</div>

				{/* <SelectField
					textLabel="Localidad:"
					value={values.location}
					name="location"
					onChange={(e) => handleChangeInput(e, setvalues)}
					options={localidades}
				/> */}
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" type="submit" fitWidth />
			</div>
		</form>
	);
};
