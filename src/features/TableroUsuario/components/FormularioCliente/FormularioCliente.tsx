import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioCliente.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect, useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";
import { SelectField } from "@/components/SelectField/SelectField";

interface Props {
	onHideModal?: any;
}

export const FormularioCliente = ({ onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/client", "Cliente");

	const [nuevoCliente, setNuevoCliente] = useState({
		name: "",
		business_name: "",
		client_number: "",
		cuit_cuil: "",
		city: "",
		location: "",
		province: "",
	});

	const [provincias, setProvincias] = useState<any>([]);
	const [municipios, setMunicipios] = useState<any>([]);
	const [localidades, setLocalidades] = useState<any>([]);

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
		if (nuevoCliente?.province) {
			setNuevoCliente((prev) => ({ ...prev, city: "", location: "" }));
			fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${nuevoCliente.province}&max=500`)
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
	}, [nuevoCliente.province]);

	useEffect(() => {
		if (nuevoCliente?.city) {
			setNuevoCliente((prev) => ({ ...prev, location: "" }));
			fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${nuevoCliente.city}&max=500`)
				.then((res) => res.json())
				.then((data) => {
					const respData = data?.localidades.map((item: any) => ({
						id: item.id,
						name: item.nombre,
						value: item.nombre,
					}));

					setLocalidades(respData);
				});
		}
	}, [nuevoCliente.city]);

	const handleCreate = async () => {
		try {
			await postFetchData(nuevoCliente);
			onHideModal();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre del cliente:"
					name="name"
					value={nuevoCliente.name}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Razón Social:"
					name="business_name"
					value={nuevoCliente.business_name}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="N° de cliente:"
					name="client_number"
					value={nuevoCliente.client_number}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Cuit / Cuil:"
					name="cuit_cuil"
					value={nuevoCliente.cuit_cuil}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<SelectField
					textLabel="Provincia:"
					value={nuevoCliente.province}
					name="province"
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
					options={provincias}
				/>
				<SelectField
					textLabel="Ciudad:"
					value={nuevoCliente.city}
					name="city"
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
					options={municipios}
				/>
				<SelectField
					textLabel="Localidad:"
					value={nuevoCliente.location}
					name="location"
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
					options={localidades}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
