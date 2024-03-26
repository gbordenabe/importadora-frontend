import { useEffect, useState } from "react";
import style from "./UpdateModalVendedor.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SelectField } from "@/components/SelectField/SelectField";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalVendedor = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const [vendedor, setVendedor] = useState<any>({
		id: "",
		user_name: "",
		name: "",
		last_name: "",
		province: "",
		city: "",
		location: ".",
	});

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
		if (vendedor?.province) {
			// setVendedor((prev: any) => ({ ...prev, city: "", location: "" }));
			fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${vendedor.province}&max=500`)
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
	}, [vendedor.province]);

	// useEffect(() => {
	// 	if (vendedor?.city) {
	// 		// setVendedor((prev: any) => ({ ...prev, location: "" }));
	// 		fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${vendedor.city}&max=500`)
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
	// }, [vendedor.city]);

	const handleUpdate = () => {
		const { id, is_email_verified, is_active, role, ...restData } = vendedor;
		updateFetchData(id, restData);
		onHideModal();
	};

	useEffect(() => {
		if (currentUpdateData) {
			setVendedor(currentUpdateData);
		}
	}, []);

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de usuario:"
					name="user_name"
					value={vendedor.user_name}
					onChange={(e) => handleChangeInput(e, setVendedor)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="name"
					value={vendedor.name}
					onChange={(e) => handleChangeInput(e, setVendedor)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="last_name"
					value={vendedor.last_name}
					onChange={(e) => handleChangeInput(e, setVendedor)}
				/>

				<SelectField
					textLabel="Provincia:"
					value={vendedor.province}
					name="province"
					onChange={(e) => handleChangeInput(e, setVendedor)}
					options={provincias}
				/>
				<SelectField
					textLabel="Departamento:"
					value={vendedor.city}
					name="city"
					onChange={(e) => handleChangeInput(e, setVendedor)}
					options={municipios}
				/>
				{/* <SelectField
					textLabel="Localidad:"
					value={vendedor.location}
					name="location"
					onChange={(e) => handleChangeInput(e, setVendedor)}
					options={localidades}
				/> */}
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={() => onHideModal()} fitWidth />

				<PrimaryButton text="Editar vendedor" onClick={handleUpdate} fitWidth />
			</div>
		</div>
	);
};
