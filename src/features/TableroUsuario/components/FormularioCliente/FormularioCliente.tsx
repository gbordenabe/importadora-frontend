import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioCliente.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	setOptionCreateSelect?: any;
}

export const FormularioCliente = ({ setOptionCreateSelect }: Props) => {
	const [nuevoCliente, setNuevoCliente] = useState({
		nombre: "",
		razonSocial: "",
		numeroCliente: "",
		cuitCuil: "",
		ciudad: "",
		localidad: "",
		provincia: "",
	});

	const handleReset = () => {
		setOptionCreateSelect("");
		setNuevoCliente({
			nombre: "",
			razonSocial: "",
			numeroCliente: "",
			cuitCuil: "",
			ciudad: "",
			localidad: "",
			provincia: "",
		});
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de la empresa:"
					name="nombre"
					value={nuevoCliente.nombre}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Razón Social:"
					name="razonSocial"
					value={nuevoCliente.razonSocial}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="N° de cliente:"
					name="numeroCliente"
					value={nuevoCliente.numeroCliente}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Cuit / Cuil:"
					name="cuitCuil"
					value={nuevoCliente.cuitCuil}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Ciudad:"
					name="ciudad"
					value={nuevoCliente.ciudad}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Localidad:"
					name="localidad"
					value={nuevoCliente.localidad}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
				<TextBoxField
					textLabel="Provincia:"
					name="provincia"
					value={nuevoCliente.provincia}
					onChange={(e) => handleChangeInput(e, setNuevoCliente)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={() => console.log(nuevoCliente)} fitWidth />
			</div>
		</div>
	);
};
