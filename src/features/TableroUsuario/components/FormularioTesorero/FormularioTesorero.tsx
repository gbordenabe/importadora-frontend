import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioTesorero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Props {
	setOptionCreateSelect?: any;
	onHideModal?: any;
}

export const FormularioTesorero = ({ setOptionCreateSelect, onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/user", "Usuario");
	const [nuevoTesorero, setNuevoTesorero] = useState({
		user_name: "",
		name: "",
		last_name: "",
		password: "",
		email: "",
		verifyEmail: "",
		city: "",
		location: "",
		province: "",
		role_id: 2,
	});
	// El rol del vendedor es 1, tesorero 2.

	const handleReset = () => {
		setOptionCreateSelect("");
	};

	const handleCreate = async () => {
		const { verifyEmail, ...restData } = nuevoTesorero;

		try {
			await postFetchData(restData);
			onHideModal();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.form__container}>
			<div className={style.form__group}>
				<TextBoxField
					textLabel="Nombre de usuario:"
					name="user_name"
					value={nuevoTesorero.user_name}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="name"
					value={nuevoTesorero.name}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="last_name"
					value={nuevoTesorero.last_name}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
				<TextBoxField
					textLabel="Contraseña:"
					name="password"
					type="password"
					value={nuevoTesorero.password}
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
					name="verifyEmail"
					type="email"
					value={nuevoTesorero.verifyEmail}
					onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
