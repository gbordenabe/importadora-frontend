import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioEmpresa.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Props {
	setOptionCreateSelect?: any;
	onHideModal?: any;
}

export const FormularioEmpresa = ({ setOptionCreateSelect, onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/empresa", "Empresa");

	const [nuevaEmpresa, setNuevaEmpresa] = useState({
		name: "",
		verifyName: "",
		number: "",
		abbreviation: "",
	});

	const handleReset = () => {
		setOptionCreateSelect("");
	};

	const handleCreate = async () => {
		const { verifyName, ...restData } = nuevaEmpresa;
		const dataCreate = { ...restData, abbreviation: nuevaEmpresa.name.substring(0, 3) };
		try {
			await postFetchData(dataCreate);
			onHideModal();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de la empresa:"
					name="name"
					value={nuevaEmpresa.name}
					onChange={(e) => handleChangeInput(e, setNuevaEmpresa)}
				/>
				<TextBoxField
					textLabel="Repite el nombre:"
					name="verifyName"
					value={nuevaEmpresa.verifyName}
					onChange={(e) => handleChangeInput(e, setNuevaEmpresa)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
