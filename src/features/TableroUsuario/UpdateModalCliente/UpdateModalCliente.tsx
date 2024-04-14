import { useEffect, useState } from "react";
import style from "./UpdateModalCliente.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SelectField } from "@/components/SelectField/SelectField";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalCliente = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
		initialValues: {
			id: "",
			name: "",
			business_name: "",
			client_number: "",
			cuit_cuil: "",
			province: "",
			city: "",
			location: ".",
			is_active: "",
		},
		onSubmit: async (values) => {
			try {
				const { id, is_active, ...restData } = values;
				updateFetchData(id, restData);
				onHideModal();
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Este campo es requerido"),
			business_name: Yup.string().required("Este campo es requerido"),
			client_number: Yup.string().required("Este campo es requerido"),
			cuit_cuil: Yup.string(),
			province: Yup.string(),
			city: Yup.string(),
			location: Yup.string(),
		}),
	});

	const [provincias, setProvincias] = useState<any>([]);
	const [municipios, setMunicipios] = useState<any>([]);

	console.log(provincias);
	console.log(municipios);
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
			// setvalues((prev: any) => ({ ...prev, city: "", location: "" }));
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
	// 		// setvalues((prev: any) => ({ ...prev, location: "" }));
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

	useEffect(() => {
		if (currentUpdateData) {
			resetForm({
				values: {
					id: currentUpdateData.id,
					name: currentUpdateData.name,
					business_name: currentUpdateData.business_name,
					client_number: currentUpdateData.client_number,
					cuit_cuil: currentUpdateData.cuit_cuil,
					province: currentUpdateData.province,
					city: currentUpdateData.city,
					location: currentUpdateData.location,
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
						textLabel="Nombre del cliente:"
						name="name"
						value={values.name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.name && errors.name && <span className="msg__form__error">{errors.name}</span>}
				</div>
				<div>
					<TextBoxField
						textLabel="Razón Social:"
						name="business_name"
						value={values.business_name || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.business_name && errors.business_name && (
						<span className="msg__form__error">{errors.business_name}</span>
					)}
				</div>
				<div>
					<TextBoxField
						textLabel="N° de cliente:"
						name="client_number"
						value={values.client_number || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.client_number && errors.client_number && (
						<span className="msg__form__error">{errors.client_number}</span>
					)}
				</div>

				<div>
					<TextBoxField
						textLabel="Cuit / Cuil:"
						name="cuit_cuil"
						value={values.cuit_cuil || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.cuit_cuil && errors.cuit_cuil && (
						<span className="msg__form__error">{errors.cuit_cuil}</span>
					)}
				</div>

				{/* Arreglar el componente principal de select, se edito el componente general */}
				<div>
					<SelectField
						textLabel="Provincia:"
						name="province"
						options={provincias}
						value={values.province || ""}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.province && errors.province && <span className="msg__form__error">{errors.province}</span>}
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
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Editar values" type="submit" fitWidth />
			</div>
		</form>
	);
};
