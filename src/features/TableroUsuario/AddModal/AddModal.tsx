import { useEffect } from "react";
import style from "./AddModal.module.css";
import { SelectField } from "@/components/SelectField/SelectField";

import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FormularioEmpresa } from "../components/FormularioEmpresa/FormularioEmpresa";
import { FormularioCliente } from "../components/FormularioCliente/FormularioCliente";
import { FormularioVendedor } from "../components/FormularioVendedor/FormularioVendedor";
import { FormularioTesorero } from "../components/FormularioTesorero/FormularioTesorero";

interface Props {
	onHideModal?: any;
	optionCreateSelect?: any;
	setOptionCreateSelect?: any;
}

export const AddModal = ({ onHideModal, optionCreateSelect, setOptionCreateSelect }: Props) => {
	useEffect(() => {
		setOptionCreateSelect("");
	}, []);

	return (
		<div className={style.column__container}>
			{!optionCreateSelect && (
				<>
					<SelectField
						placeholder="Selecciona el tipo de usuario"
						onChange={(e) => setOptionCreateSelect(e.target.value)}
						name=""
						value={optionCreateSelect}
						options={typeUserOptions}
					/>

					<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />
				</>
			)}

			{optionCreateSelect === "Empresa" && (
				<FormularioEmpresa
					setOptionCreateSelect={setOptionCreateSelect}
					onHideModal={onHideModal}
				/>
			)}
			{optionCreateSelect === "Cliente" && (
				<FormularioCliente setOptionCreateSelect={setOptionCreateSelect} />
			)}
			{optionCreateSelect === "Vendedor" && (
				<FormularioVendedor setOptionCreateSelect={setOptionCreateSelect} />
			)}
			{optionCreateSelect === "Tesorero" && (
				<FormularioTesorero setOptionCreateSelect={setOptionCreateSelect} />
			)}
		</div>
	);
};

const typeUserOptions = [
	{
		name: "Empresa",
		value: "Empresa",
	},
	{
		name: "Cliente",
		value: "Cliente",
	},
	{
		name: "Vendedor",
		value: "Vendedor",
	},
	{
		name: "Tesorero",
		value: "Tesorero",
	},
];
