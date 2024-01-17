import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioTesorero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	setOptionCreateSelect?: any;
}

export const FormularioTesorero = ({ setOptionCreateSelect }: Props) => {
	const [nuevoTesorero, setNuevoTesorero] = useState({
		usuario: "",
		nombre: "",
		apellido: "",
		contraseña: "",
		email: "",
		verificarEmail: "",
	});

	const handleReset = () => {
		setOptionCreateSelect("");
		setNuevoTesorero({
			usuario: "",
			nombre: "",
			apellido: "",
			contraseña: "",
			email: "",
			verificarEmail: "",
		});
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de usuario:"
					name="usuario"
					value={nuevoTesorero.usuario}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="nombre"
					value={nuevoTesorero.nombre}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="apellido"
					value={nuevoTesorero.apellido}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Contraseña:"
					name="contraseña"
					value={nuevoTesorero.contraseña}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Email:"
					name="email"
					type="email"
					value={nuevoTesorero.email}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Repetir email:"
					name="verificarEmail"
					type="email"
					value={nuevoTesorero.verificarEmail}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={() => console.log(nuevoTesorero)} fitWidth />
			</div>
		</div>
	);
};
