import { useEffect, useState } from "react";
import { AddButton } from "../AddButton/AddButton";
import { OptionsList } from "../OptionsList/OptionsList";
import style from "./NuevoRegistro.module.css";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	addNewRegister?: (data: any) => void;
	dataStructure?: any;
	addButtonText?: string;
	listOptions?: any;
	listTitle?: string;
	data?: any;
	setTotalAmount?: any;
}

export const NuevoRegistro = ({
	addNewRegister,
	dataStructure,
	addButtonText,
	listOptions,
	listTitle,
	data,
	setTotalAmount,
}: Props) => {
	// pasos
	const [stepNewRegister, setStepNewRegister] = useState(1);
	const [total, setTotal] = useState(0);

	const handleStepNewRegister = () => {
		if (listTitle === "Factura") {
			handleAddNewRegister("Factura o nota de débito", null);
			return;
		}

		if (stepNewRegister === 1) {
			setStepNewRegister((prev) => prev + 1);
		}
	};

	const calculateTotal = () => {
		let calculatedTotal = 0;
		if (data && Array.isArray(data)) {
			data.forEach((item) => {
				calculatedTotal += Number(item.amount);
			});
		}
		setTotal(calculatedTotal);

		if (setTotalAmount) setTotalAmount(calculatedTotal);
	};

	useEffect(() => {
		calculateTotal();
	}, [data]);

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
				{/* <p className={style.nuevoRegistro__total__text}>{`$ ${total}`}</p> */}
				<p className={style.nuevoRegistro__total__text}>{formatPrice(total)}</p>
			</div>
		</div>
	);
};
