import style from "./SaldosTransaccion.module.css";

import { saldosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { CreditoLayout } from "./layouts/CreditoLayout/CreditoLayout";
import { NotaCreditoLayout } from "./layouts/NotaCreditoLayout/NotaCreditoLayout";
import { RetencionLayout } from "./layouts/RetencionLayout/RetencionLayout";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/hooks/customFormik";

interface Props {
	setSaldos?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
	setTotalAmount?: any;
	setFilesBlob?: any;
}

export const SaldosTransaccion = ({
	setSaldos,
	isBlocked,
	onChangeStatusGroup,
	setTotalAmount,
	setFilesBlob,
}: Props) => {

	const [section, setSection] = useState<string>('');

	const initialValues: any = {
		credits: [],
		credit_notes: [],
		retentions: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	useEffect(() => {
		setSaldos(formik.values);
	}, [formik.values, setSaldos]);

	const handleChange = (event: { target: { name: any; value: any; }; }, index: any, section: string) => {
		const { name, value } = event.target;
		const sectionValues = formik.values[section];
		const updatedSectionValues = [...sectionValues];
		updatedSectionValues[index][name] = value;
		formik.setFieldValue(section, updatedSectionValues);
	};

	const handleAdd = (section: string, newData: any) => {
		const newValues = { ...formik.values };
		const currentValues = [...formik.values[section]];
		currentValues.unshift(newData);
		newValues[section] = currentValues;
		formik.setValues(newValues);
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
					<h2>Saldos</h2>
					<div>
						{isBlocked ? (
							<SecondaryButton text="Editar" type='submit' onClick={() => onChangeStatusGroup("saldos")} />
						) : (
							<PrimaryButton text="Confirmar" type='submit' onClick={() => onChangeStatusGroup("saldos")} />
						)}
					</div>
				</div>

				<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px" }}>

						<div className={style.box__content}>
							{Object.keys(formik.values).map((sectionKey) => (
								formik.values[sectionKey].map((saldo: any, index: number) => (
									<div key={index}>
										{saldo.tipo === "Crédito" && (
											<CreditoLayout
												section="credits"
												values={saldo}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.credits}
												index={index}
											/>
										)}
										{saldo.tipo === "NC o Saldo recibido" && (
											<NotaCreditoLayout
												section="credit_notes"
												values={saldo}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.credit_notes}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={saldo.file_field_name}
											/>
										)}
										{saldo.tipo === "Retención impositiva" && (
											<RetencionLayout
												section="retentions"
												values={saldo}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.retentions}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={saldo.file_field_name}
											/>
										)}
									</div>
								))
							))}
						</div>


						<NuevoRegistro
							addNewRegister={handleAdd}
							dataStructure={saldosStructure}
							addButtonText="+ Nuevo Saldo"
							listOptions={listOptions}
							listTitle="Tipo de saldo"
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
		name: "Crédito",
		hasSubType: true,
		subTypeList: [
			{ id: 1, name: "Financiero" },
			{ id: 2, name: "Comercial" },
		],
	},
	{ name: "NC o Saldo recibido", hasSubType: false, subTypeList: [] },
	{ name: "Retención impositiva", hasSubType: false, subTypeList: [] },
];
