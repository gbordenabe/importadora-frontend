import { useState } from "react";
import { AddButton } from "../AddButton/AddButton";
import { OptionsList } from "../OptionsList/OptionsList";
import style from "./NuevoRegistro.module.css";

interface Props {
	addNewRegister?: (data: any) => void;
	dataStructure?: any;
	addButtonText?: string;
	listOptions?: any;
	listTitle?: string;
}

export const NuevoRegistro = ({
	addNewRegister,
	dataStructure,
	addButtonText,
	listOptions,
	listTitle,
}: Props) => {

	// pasos
	const [stepNewRegister, setStepNewRegister] = useState(1);


	
	
	const handleStepNewRegister = () => {
		if (listTitle === "Factura") {
			handleAddNewRegister("Factura o nota de débito", null);
			return;
		}

		if (stepNewRegister === 1) {
			setStepNewRegister((prev) => prev + 1);
		}
	};



	// registro de nueva tabla
	const handleAddNewRegister = (tipo: string | null, subtipo: string | null) => {
		const editStructure = {
			...dataStructure,
			tipo: tipo || null, //se setea el tipo
			type: subtipo || null, //se setea el subtipo
		};

		if (addNewRegister) {
			addNewRegister(editStructure);
		}
		setStepNewRegister(1);
	};



	return (
		<div className={style.nuevoRegistro__container}>
			<div>
				{stepNewRegister == 1 && <AddButton text={addButtonText} onClick={handleStepNewRegister} />}
				{stepNewRegister == 2 && (
					<OptionsList
						addNewRegister={handleAddNewRegister}
						listOptions={listOptions}
						listTitle={listTitle}
					/>
				)}
			</div>

			<div className={style.nuevoRegistro__total}>
				<p className={style.nuevoRegistro__total__text}>Total:</p>
				<p className={style.nuevoRegistro__total__text}>---------</p>
			</div>
		</div>
	);
};
