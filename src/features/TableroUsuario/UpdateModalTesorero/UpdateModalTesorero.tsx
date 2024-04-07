import { useEffect } from "react";
import style from "./UpdateModalTesorero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalTesorero = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
		initialValues: {
			id: "",
			user_name: "",
			name: "",
			last_name: "",
			email: "",
			verifyEmail: "",
			province: "",
			city: "",
			location: "",
			role_id: 2,
			is_active: "",
		},
		onSubmit: async (values) => {
			try {
				const { id, is_active, verifyEmail, ...restData } = values;
				updateFetchData(id, restData);
				onHideModal();
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema: Yup.object({
			user_name: Yup.string().required("Este campo es requerido"),
			name: Yup.string().required("Este campo es requerido"),
			last_name: Yup.string().required("Este campo es requerido"),
			email: Yup.string()
				.email("El formato del correo electrónico es incorrecto")
				.required("Este campo es requerido"),
			verifyEmail: Yup.string()
				.email("El formato del correo electrónico es incorrecto")
				.oneOf([Yup.ref("email")], "Los correos ingresados no coinciden")
				.required("Este campo es requerido"),
		}),
	});

	useEffect(() => {
		if (currentUpdateData) {
			resetForm({
				values: {
					id: currentUpdateData.id,
					user_name: currentUpdateData.user_name,
					name: currentUpdateData.name,
					last_name: currentUpdateData.last_name,
					// password: currentUpdateData.password,
					email: currentUpdateData.email,
					verifyEmail: currentUpdateData.email,
					province: currentUpdateData.province,
					city: currentUpdateData.city,
					location: currentUpdateData.location,
					role_id: currentUpdateData.role?.id,
					is_active: currentUpdateData.is_active,
				},
			});
		}
	}, []);

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
			</div>
			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={() => onHideModal()} fitWidth />

				<PrimaryButton text="Editar tesorero" type="submit" fitWidth />
			</div>
		</form>
	);
};
