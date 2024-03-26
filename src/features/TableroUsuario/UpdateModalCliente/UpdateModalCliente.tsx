import { useEffect, useState } from "react";
import style from "./UpdateModalCliente.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SelectField } from "@/components/SelectField/SelectField";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalCliente = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const [cliente, setCliente] = useState<any>({
		name: "",
		business_name: "",
		client_number: "",
		cuit_cuil: "",
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
		if (cliente?.province) {
			// setCliente((prev: any) => ({ ...prev, city: "", location: "" }));
			fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${cliente.province}&max=500`)
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
	}, [cliente.province]);

	// useEffect(() => {
	// 	if (cliente?.city) {
	// 		// setCliente((prev: any) => ({ ...prev, location: "" }));
	// 		fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${cliente.city}&max=500`)
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
	// }, [cliente.city]);

	const handleUpdate = () => {
		const { id, is_active, ...restData } = cliente;
		updateFetchData(id, restData);
		onHideModal();
	};

	useEffect(() => {
		if (currentUpdateData) {
			setCliente(currentUpdateData);
		}
	}, []);

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre del cliente:"
					name="name"
					value={cliente.name}
					onChange={(e) => handleChangeInput(e, setCliente)}
				/>
				<TextBoxField
					textLabel="Razón Social:"
					name="business_name"
					value={cliente.business_name}
					onChange={(e) => handleChangeInput(e, setCliente)}
				/>
				<TextBoxField
					textLabel="N° de cliente:"
					name="client_number"
					value={cliente.client_number}
					onChange={(e) => handleChangeInput(e, setCliente)}
				/>
				<TextBoxField
					textLabel="Cuit / Cuil:"
					name="cuit_cuil"
					value={cliente.cuit_cuil}
					onChange={(e) => handleChangeInput(e, setCliente)}
				/>
				<SelectField
					textLabel="Provincia:"
					value={cliente.province}
					name="province"
					onChange={(e) => handleChangeInput(e, setCliente)}
					options={provincias}
				/>
				<SelectField
					textLabel="Departamento:"
					value={cliente.city}
					name="city"
					onChange={(e) => handleChangeInput(e, setCliente)}
					options={municipios}
				/>
				{/* <SelectField
					textLabel="Localidad:"
					value={cliente.location}
					name="location"
					onChange={(e) => handleChangeInput(e, setCliente)}
					options={localidades}
				/> */}
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Editar cliente" onClick={handleUpdate} fitWidth />
			</div>
		</div>
	);
};
