import { useEffect } from "react";
import style from "./AddModal.module.css";
import { SelectField } from "@/components/SelectField/SelectField";

import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
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

			{optionCreateSelect === "Vendedor" && (
				<FormularioVendedor
					setOptionCreateSelect={setOptionCreateSelect}
					onHideModal={onHideModal}
				/>
			)}
			{optionCreateSelect === "Tesorero" && (
				<FormularioTesorero
					setOptionCreateSelect={setOptionCreateSelect}
					onHideModal={onHideModal}
				/>
			)}
		</div>
	);
};

const typeUserOptions = [
	{
		name: "Vendedor",
		value: "Vendedor",
	},
	{
		name: "Tesorero",
		value: "Tesorero",
	},
];
