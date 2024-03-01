import { useEffect, useState } from "react";
import style from "./UpdateModalEmpresa.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalEmpresa = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const [empresa, setEmpresa] = useState<any>({
		name: "",
		verifyName: "",
		acronym: "",
	});

	const handleUpdate = () => {
		const { id, verifyName, ...restData } = empresa;
		updateFetchData(id, restData);
		onHideModal();
	};

	useEffect(() => {
		if (currentUpdateData) {
			setEmpresa({
				...currentUpdateData,
				verifyName: currentUpdateData.name,
			});
		}
	}, []);

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de la empresa:"
					name="name"
					value={empresa.name}
					onChange={(e) => handleChangeInput(e, setEmpresa)}
				/>
				<TextBoxField
					textLabel="Repite el nombre:"
					name="verifyName"
					value={empresa.verifyName}
					onChange={(e) => handleChangeInput(e, setEmpresa)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

				<PrimaryButton text="Editar empresa" onClick={handleUpdate} fitWidth />
			</div>
		</div>
	);
};
