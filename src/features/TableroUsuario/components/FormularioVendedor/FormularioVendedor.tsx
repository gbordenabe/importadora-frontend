import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioVendedor.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	setOptionCreateSelect?: any;
}

export const FormularioVendedor = ({ setOptionCreateSelect }: Props) => {
	const [nuevoVendedor, setNuevoVendedor] = useState({
		usuario: "",
		nombre: "",
		apellido: "",
		contraseña: "",
		email: "",
		verificarEmail: "",
		ciudad: "",
		localidad: "",
		provincia: "",
	});

	const handleReset = () => {
		setOptionCreateSelect("");
		setNuevoVendedor({
			usuario: "",
			nombre: "",
			apellido: "",
			contraseña: "",
			email: "",
			verificarEmail: "",
			ciudad: "",
			localidad: "",
			provincia: "",
		});
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de usuario:"
					name="usuario"
					value={nuevoVendedor.usuario}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="nombre"
					value={nuevoVendedor.nombre}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="apellido"
					value={nuevoVendedor.apellido}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Contraseña:"
					name="contraseña"
					value={nuevoVendedor.contraseña}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Email:"
					name="email"
					type="email"
					value={nuevoVendedor.email}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Repetir email:"
					name="verificarEmail"
					type="email"
					value={nuevoVendedor.verificarEmail}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Ciudad:"
					name="ciudad"
					value={nuevoVendedor.ciudad}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Localidad:"
					name="localidad"
					value={nuevoVendedor.localidad}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Provincia:"
					name="provincia"
					value={nuevoVendedor.provincia}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={() => console.log(nuevoVendedor)} fitWidth />
			</div>
		</div>
	);
};
