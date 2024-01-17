import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioEmpresa.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	setOptionCreateSelect?: any;
}

export const FormularioEmpresa = ({ setOptionCreateSelect }: Props) => {
	const [nuevaEmpresa, setNuevaEmpresa] = useState({
		nombre: "",
		verificarNombre: "",
	});

	const handleReset = () => {
		setOptionCreateSelect("");
		setNuevaEmpresa({
			nombre: "",
			verificarNombre: "",
		});
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de la empresa:"
					name="nombre"
					value={nuevaEmpresa.nombre}
					onChange={(e) => handleChangeInput(e, setNuevaEmpresa)}
				/>
				<TextBoxField
					textLabel="Repite el nombre:"
					name="verificarNombre"
					value={nuevaEmpresa.verificarNombre}
					onChange={(e) => handleChangeInput(e, setNuevaEmpresa)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={() => console.log(nuevaEmpresa)} fitWidth />
			</div>
		</div>
	);
};
