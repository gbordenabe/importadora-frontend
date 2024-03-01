import { useEffect, useState } from "react";
import style from "./UpdateModalTesorero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Props {
	onHideModal?: any;
	currentUpdateData?: any;
	updateFetchData?: any;
}

export const UpdateModalTesorero = ({ onHideModal, currentUpdateData, updateFetchData }: Props) => {
	const [tesorero, setTesorero] = useState<any>({
		user_name: "",
		name: "",
		last_name: "",
		city: "",
		location: "",
		province: "",
	});

	const handleUpdate = () => {
		const { id, is_email_verified, is_active, role, ...restData } = tesorero;
		updateFetchData(id, restData);
		onHideModal();
	};

	useEffect(() => {
		if (currentUpdateData) {
			setTesorero(currentUpdateData);
		}
	}, []);

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de usuario:"
					name="user_name"
					value={tesorero.user_name}
					onChange={(e) => handleChangeInput(e, setTesorero)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="name"
					value={tesorero.name}
					onChange={(e) => handleChangeInput(e, setTesorero)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="last_name"
					value={tesorero.last_name}
					onChange={(e) => handleChangeInput(e, setTesorero)}
				/>
			</div>
			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={() => onHideModal()} fitWidth />

				<PrimaryButton text="Editar tesorero" onClick={handleUpdate} fitWidth />
			</div>
		</div>
	);
};
