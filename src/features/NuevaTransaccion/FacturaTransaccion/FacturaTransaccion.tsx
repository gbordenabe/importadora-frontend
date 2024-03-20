import style from "./FacturaTransaccion.module.css";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { validationSchema } from "@/hooks/customFormik";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { FacturaLayout } from "./layouts/FacturaLayout/FacturaLayout";
import { facturasStructure } from "../data/data";
// import { useTransactionContext } from "@/hooks/contexts/errorsContext";

export interface IFacturas {
	number: string;
	amount: number;
	date: string;
	observation: string;
}

interface Props {
	facturas?: IFacturas[];
	setFacturas?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
	setTotalAmount?: any;
}

export const FacturaTransaccion = ({
	setFacturas,
	isBlocked,
	onChangeStatusGroup,
	setTotalAmount,
}: Props) => {
	const [section, setSection] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState('');

	const initialValues: any = {
		bills: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: () => {
			try {
				// onChangeStatusGroup("facturas");

			} catch (error) {
				console.error("Error:", error);
			}
		},
	});

	const formikValuesRef = useRef(formik.values);

	useEffect(() => {
		if (formikValuesRef.current !== formik.values) {
			setFacturas(formik.values);
			formikValuesRef.current = formik.values;
		}
	}, [formik.values, setFacturas]);


	const handleChange = (event: { target: { name: any; value: any; }; }, index: any, section: string) => {
		const { name, value } = event.target;
		const sectionValues = formik.values[section];
		const updatedSectionValues = [...sectionValues];
		updatedSectionValues[index][name] = value;
		formik.setFieldValue(section, updatedSectionValues);
	};

	const handleAdd = (section: string, newData: any) => {
		if (formik.values.bills.length === 0) {
			const newValues = { ...formik.values };
			const currentValues = [...formik.values[section]];
			currentValues.unshift(newData);
			newValues[section] = currentValues;
			formik.setValues(newValues);
		} else {
			const lastBill = formik.values.bills[0];
			const isLastBillComplete =
				lastBill.number !== '' &&
				lastBill.amount !== '' &&
				lastBill.date !== '';
			if (isLastBillComplete) {
				const newValues = { ...formik.values };
				const currentValues = [...formik.values[section]];
				currentValues.unshift(newData);
				newValues[section] = currentValues;
				formik.setValues(newValues);
				setErrorMessage('');
			} else {
				setErrorMessage('Completa todos los campos de la factura actual antes de agregar otra.');
			}
		}
	};

	const handleRemove = (index: number, section: string) => {
		const updatedValues = [...formik.values[section]];
		updatedValues.splice(index, 1);
		formik.setFieldValue(section, updatedValues);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={style.box__container}>
				<div className={style.box__head}>
					<h2> Factura o nota de débito </h2>
					<div>
						{isBlocked ? (
							<SecondaryButton
								text="Editar"
								type="submit"
								onClick={() => { onChangeStatusGroup("facturas") }}
							/>
						) : (
							<PrimaryButton
								text="Confirmar"
								type="submit"
								onClick={() => { onChangeStatusGroup("facturas") }}
							/>
						)}
					</div>
				</div>
				<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px" }}>

						<div className={style.box__content}>
							{Object.keys(formik.values).map((sectionKey) => (
								formik.values[sectionKey].map((pago: any, index: number) => (
									<div key={index}>
										<FacturaLayout
											section="bills"
											values={pago}
											handleChange={handleChange}
											handleRemove={handleRemove}
											errors={formik.errors.bills}
											index={index}
										/>
									</div>
								))
							))}
						</div>

						<NuevoRegistro
							addNewRegister={handleAdd}
							dataStructure={facturasStructure}
							addButtonText="+ Nueva Factura o Débito"
							listOptions={[]}
							listTitle="Factura"
							data={formik.values}
							setTotalAmount={setTotalAmount}
							section={section}
							setSection={setSection}
							errorMessage={errorMessage}
						/>
					</div>
				</BlockUI>
			</div>
		</form>
	);
};
