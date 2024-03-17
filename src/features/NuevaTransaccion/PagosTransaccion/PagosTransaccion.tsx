import style from "./PagosTransaccion.module.css";
import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { ChequeLayout } from "./layouts/ChequeLayout/ChequeLayout";
import { DepositoLayout } from "./layouts/DepositoLayout/DepositoLayout";
import { EfectivoTransferenciaLayout } from "./layouts/EfectivoTransferenciaLayout/EfectivoTransferenciaLayout";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { useFormik } from "formik";
import { validationSchema } from "@/hooks/customFormik";
import { useState } from "react";

interface Props {
	setPagos?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
	setTotalAmount?: any;
	setFilesBlob?: any;
}

export const PagosTransaccion = ({
	setPagos,
	isBlocked,
	onChangeStatusGroup,
	setTotalAmount,
	setFilesBlob,
}: Props) => {
	const [section, setSection] = useState<string>('');

	const initialValues: any = {
		checks: [],
		deposits: [],
		cash: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			// Aquí puedes enviar los valores del formulario al servidor
			console.log(values);
			onChangeStatusGroup("pagos")
			setPagos(values)
		},
	});

	const handleChange = (event: { target: { name: any; value: any; }; }, index: any, section: string) => {
		const { name, value } = event.target;
		const sectionValues = formik.values[section];
		const updatedSectionValues = [...sectionValues];
		updatedSectionValues[index][name] = value;
		formik.setFieldValue(section, updatedSectionValues);
	};

	const handleAdd = (section: string, newData: any) => {
		console.log('section', section, "newData", newData);
		const newValues = { ...formik.values };
		const currentValues = [...formik.values[section]];
		currentValues.push(newData);
		newValues[section] = currentValues;
		formik.setValues(newValues);
	};

	const handleRemove = (index: number, section: string) => {
		const updatedValues = [...formik.values[section]];
		updatedValues.splice(index, 1);
		formik.setFieldValue(section, updatedValues);
	};

	console.log('valuesActualizado2', formik.values);
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={style.box__container}>
				<div className={style.box__head}>
					<h2>Pagos</h2>
					<div>
						{isBlocked ? (
							<SecondaryButton text="Editar" type='submit' />
						) : (
							<PrimaryButton text="Confirmar" type='submit'/>
						)}
					</div>
				</div>

				<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px" }}>

						<div className={style.box__content}>
							{Object.keys(formik.values).map((sectionKey) => (
								formik.values[sectionKey].map((pago: any, index: number) => (
									<div key={index}>
										{pago.tipo === "Cheque" && (
											<ChequeLayout
												section="checks"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.checks}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
											/>
										)}
										{pago.tipo === "Depósito / Transferencia" && (
											<DepositoLayout
												section="deposits"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.deposits}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
											/>
										)}
										{pago.tipo === "Efectivo" && (
											<EfectivoTransferenciaLayout
												section="cash"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.cash}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
											/>
										)}
									</div>
								))
							))}
						</div>

						<NuevoRegistro
							addNewRegister={handleAdd}
							dataStructure={pagosStructure}
							addButtonText="+ Nuevo Pago"
							listOptions={listOptions}
							listTitle="Tipo de pago"
							data={formik.values}
							setTotalAmount={setTotalAmount}
							section={section}
							setSection={setSection}
						/>
					</div>
				</BlockUI>
			</div>
		</form>
	);
};

const listOptions = [
	{
		name: "Cheque",
		hasSubType: true,
		subTypeList: [
			{ id: 1, name: "Propio" },
			{ id: 2, name: "De terceros" },
			{ id: 3, name: "Electrónico" },
		],
	},
	{ name: "Efectivo", hasSubType: false, subTypeList: [] },
	{ name: "Depósito / Transferencia", hasSubType: false, subTypeList: [] },
]