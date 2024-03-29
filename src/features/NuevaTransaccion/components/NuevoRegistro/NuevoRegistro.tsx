import { useEffect, useState } from "react";
import { AddButton } from "../AddButton/AddButton";
import { OptionsList } from "../OptionsList/OptionsList";
import style from "./NuevoRegistro.module.css";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	addNewRegister?: (section: any, data: any) => void;
	dataStructure?: any;
	addButtonText?: string;
	listOptions?: any;
	listTitle?: string;
	data?: any;
	setTotalAmount?: any;
	section?: any;
	setSection?: any;
	errorMessage?: string;
	closeDropdown?: any;
	addRegister?: any;
	setErrorMessage?: any
}

export const NuevoRegistro = ({
	addNewRegister,
	dataStructure,
	addButtonText,
	listOptions,
	listTitle,
	data, 
	setTotalAmount,	
	setSection,
	errorMessage,
	closeDropdown,
	addRegister,
	setErrorMessage
}: Props) => {
	const [stepNewRegister, setStepNewRegister] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(()=>{
		setStepNewRegister(1)
	},[closeDropdown])

	useEffect(()=>{
		if(addRegister) {
		setStepNewRegister(1)
		setErrorMessage('Completa todos los campos antes de agregar otro registro.');
		}
	},[addRegister])
	
	

	const handleStepNewRegister = () => {
		if (listTitle === "Factura") {
			handleAddNewRegister("Factura o nota de débito", null);
			return;
		}

		if(!addRegister) {
		if (stepNewRegister === 1) {
			setStepNewRegister((prev) => prev + 1);
		}
	}
	};

	const calculateTotal = () => {
        let calculatedTotal = 0;
        if (data && typeof data === 'object') {
            Object.keys(data).forEach((sectionKey) => {
                if (Array.isArray(data[sectionKey])) {
                    calculatedTotal += data[sectionKey].reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);
                }
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
		let section = "";
		if(tipo === 'Factura o nota de débito') {
			section = "bills";
		} else if (tipo === "Cheque") {
            section = "checks";
        } else if (tipo === "Efectivo") {
            section = "cash";
        } else if(tipo === "Depósito / Transferencia") {
            section = "deposits";
        } else if(tipo === "Solicitud de Crédito"){
			section = "credits"
		} else if (tipo === "NC o Saldo recibido") {
			section = "credit_notes"
		} else {
			section = "retentions"
		}
		if (addNewRegister) {
			addNewRegister(section, {...dataStructure, tipo: tipo || null, type: subtipo || null});
		}
		setStepNewRegister(1);
		setSection(section);
	};

	return (
		<div className={style.nuevoRegistro__container}>
			<div>
				{stepNewRegister == 1 && 
				<div className={style.container_add_register}>
					<AddButton text={addButtonText} onClick={handleStepNewRegister} /> 
					<div style={{ marginTop: '10px' }}>
    					{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
					</div>
				</div>
 				}
				{stepNewRegister == 2 && (
					<OptionsList
						addNewRegister={handleAddNewRegister}
						listOptions={listOptions}
						listTitle={listTitle}
						closeDropdown={closeDropdown}
					/>
				)}
			</div>

			<div className={style.nuevoRegistro__total}>
				<p className={style.nuevoRegistro__total__text}>Total:</p>
				<p className={style.nuevoRegistro__total__text}>{formatPrice(total)}</p>
			</div>
		</div>
	);
};
