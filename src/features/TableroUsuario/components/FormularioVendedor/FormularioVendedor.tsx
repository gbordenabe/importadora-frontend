import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioVendedor.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Props {
	setOptionCreateSelect?: any;
	onHideModal?: any;
}

export const FormularioVendedor = ({ setOptionCreateSelect, onHideModal }: Props) => {
	const { postFetchData } = usePostFetch("/user", "Usuario");
	const [nuevoVendedor, setNuevoVendedor] = useState({
		user_name: "",
		name: "",
		last_name: "",
		password: "",
		email: "",
		verifyEmail: "",
		city: "",
		location: "",
		province: "",
		role_id: 1,
	});
	// El rol del vendedor es 1, tesorero 2.

	const handleReset = () => {
		setOptionCreateSelect("");
	};

	const handleCreate = async () => {
		const { verifyEmail, ...restData } = nuevoVendedor;

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
					value={nuevoVendedor.user_name}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Nombre:"
					name="name"
					value={nuevoVendedor.name}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Apellido:"
					name="last_name"
					value={nuevoVendedor.last_name}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Contraseña:"
					name="password"
					type="password"
					value={nuevoVendedor.password}
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
					name="verifyEmail"
					type="email"
					value={nuevoVendedor.verifyEmail}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Ciudad:"
					name="city"
					value={nuevoVendedor.city}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Localidad:"
					name="location"
					value={nuevoVendedor.location}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
				<TextBoxField
					textLabel="Provincia:"
					name="province"
					value={nuevoVendedor.province}
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
				/>
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
