import { useState } from "react";
import style from "./FormularioEmpresa.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Props {
	onHideModal?: any;
}

export const FormularioEmpresa = ({ onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/company", "Empresa");

	const [nuevaEmpresa, setNuevaEmpresa] = useState({
		name: "",
		verifyName: "",
		acronym: "",
	});

	const handleCreate = async () => {
		const { verifyName, ...restData } = nuevaEmpresa;
		const dataCreate = { ...restData, acronym: nuevaEmpresa.name.substring(0, 3) };
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
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
