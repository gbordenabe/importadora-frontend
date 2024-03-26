import style from "./FormularioEmpresa.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
	onHideModal?: any;
}

export const FormularioEmpresa = ({ onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/company", "Empresa");

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues: {
			name: "",
			verifyName: "",
			acronym: "",
		},
		onSubmit: async (values) => {
			const { verifyName, ...restData } = values;
			const dataCreate = { ...restData, acronym: values.name.substring(0, 3) };
			try {
				await postFetchData(dataCreate);
				onHideModal();
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(3, "El nombre de la empresa debe de tener mínimo 3 dígitos")
				.required("Este campo es requerido"),
			verifyName: Yup.string()
				.oneOf([Yup.ref("name")], "Los nombres ingresados no coinciden")
				.required("Este campo es requerido"),
		}),
	});

	return (
		<form noValidate onSubmit={handleSubmit} className={style.form__container}>
			<div className={style.form__group}>
				<div>
					<TextBoxField
						textLabel="Nombre de la empresa:"
						name="name"
						value={values.name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.name && errors.name && <span className="msg__form__error">{errors.name}</span>}
				</div>
				<div>
					<TextBoxField
						textLabel="Repite el nombre:"
						name="verifyName"
						value={values.verifyName || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.verifyName && errors.verifyName && (
						<span className="msg__form__error">{errors.verifyName}</span>
					)}
				</div>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Guardar" type="submit" fitWidth />
			</div>
		</form>
	);
};
