import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./FormularioVendedor.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect, useState } from "react";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { usePostFetch } from "@/hooks/usePostFetch";
import { SelectField } from "@/components/SelectField/SelectField";

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
		province: "",
		city: "",
		location: ".",
		role_id: 1,
	});
	// El rol del vendedor es 1, tesorero 2.

	const [provincias, setProvincias] = useState<any>([]);
	const [municipios, setMunicipios] = useState<any>([]);
	// const [localidades, setLocalidades] = useState<any>([]);

	useEffect(() => {
		fetch("https://apis.datos.gob.ar/georef/api/provincias?max=500")
			.then((res) => res.json())
			.then((data) => {
				const respData = data?.provincias.map((item: any) => ({
					id: item.id,
					name: item.nombre,
					value: item.nombre,
				}));

				setProvincias(respData);
			});
	}, []);

	useEffect(() => {
		if (nuevoVendedor?.province) {
			setNuevoVendedor((prev) => ({ ...prev, city: "", location: "" }));
			fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${nuevoVendedor.province}&max=500`)
				.then((res) => res.json())
				.then((data) => {
					const respData = data?.departamentos.map((item: any) => ({
						id: item.id,
						name: item.nombre,
						value: item.nombre,
					}));

					setMunicipios(respData);
				});
		}
	}, [nuevoVendedor.province]);

	// useEffect(() => {
	// 	if (nuevoVendedor?.city) {
	// 		setNuevoVendedor((prev) => ({ ...prev, location: "" }));
	// 		fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${nuevoVendedor.city}&max=500`)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				const respData = data?.localidades.map((item: any) => ({
	// 					id: item.id,
	// 					name: item.nombre,
	// 					value: item.nombre,
	// 				}));

	// 				setLocalidades(respData);
	// 			});
	// 	}
	// }, [nuevoVendedor.city]);

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

				<SelectField
					textLabel="Provincia:"
					value={nuevoVendedor.province}
					name="province"
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
					options={provincias}
				/>
				<SelectField
					textLabel="Departamento:"
					value={nuevoVendedor.city}
					name="city"
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
					options={municipios}
				/>
				{/* <SelectField
					textLabel="Localidad:"
					value={nuevoVendedor.location}
					name="location"
					onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
					options={localidades}
				/> */}
			</div>

			<div className={style.container__buttons}>
				<SecondaryButton text="Volver" onClick={handleReset} fitWidth />

				<PrimaryButton text="Guardar" onClick={handleCreate} fitWidth />
			</div>
		</div>
	);
};
