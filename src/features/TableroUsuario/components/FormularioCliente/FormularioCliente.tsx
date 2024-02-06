import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioCliente.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Props {
	onHideModal?: any;
}

export const FormularioCliente = ({ onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/client", "Cliente");

	const [nuevoCliente, setNuevoCliente] = useState({
		name: "",
		business_name: "",
		cuit_cuil: "",
		city: "",
		location: "",
		province: "",
	});

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
					textLabel="Cuit / Cuil:"
					name="cuit_cuil"
					value={nuevoCliente.cuit_cuil}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Ciudad:"
					name="city"
					value={nuevoCliente.city}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Localidad:"
					name="location"
					value={nuevoCliente.location}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Provincia:"
					name="province"
					value={nuevoCliente.province}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
