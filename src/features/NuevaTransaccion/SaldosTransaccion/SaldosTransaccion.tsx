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
import { validationSchema } from "@/helpers/customFormik";
import { useToggleExpandedContext } from "@/hooks/toggleExpandedContext";

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
	const [errorMessage, setErrorMessage] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(true);
	const [addRegister, setAddRegister] = useState(false);

	const { expandedSaldos, toggleExpandedSaldos } = useToggleExpandedContext();

	const initialValues: any = {
		credits: [],
		credit_notes: [],
		retentions: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: () => {
			// console.log(values);
		},
	});

	useEffect(() => {
		setSaldos(formik.values);
	}, [formik.values]);

	const handleCloseDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleChange = (event: { target: { name: any; value: any; }; }, index: any, section: string) => {
		const { name, value } = event.target;
		const sectionValues = formik.values[section];
		const updatedSectionValues = [...sectionValues];
		updatedSectionValues[index][name] = value;
		formik.setFieldValue(section, updatedSectionValues);
	};

	const handleAdd = (section: string, newData: any) => {
		// Agregar el nuevo registro
		const newValues = { ...formik.values };
		const currentValues = [...formik.values[section]];
		currentValues.unshift(newData);
		newValues[section] = currentValues;
		formik.setValues(newValues);

		// Manejar la expansión de saldo
		const sections = formik.values
		if (sections && sections[section] && sections[section].length > 0) {
			for (const sec in sections) {
				if (sec === section) {
					const newIndex = sections[section].length;
					toggleExpandedSaldos(newIndex, "addRegister", section);
				} else {
					toggleExpandedSaldos(null, "minOneSection", sec);
				}
			}
		} else {
			for (const sec in sections) {
				if (sec === section) {
					toggleExpandedSaldos(0, "newSaldo", section);
				} else {
					toggleExpandedSaldos(null, "minOneSection", sec);
				}
			}
		}
	};

	const handleRemove = (index: number, section: string) => {
		const updatedValues = [...formik.values[section]];
		updatedValues.splice(index, 1);
		formik.setFieldValue(section, updatedValues);
	};

	useEffect(() => {
		const isIncomplete = Object.keys(formik.values).some(key => {
			const sectionValues = formik.values[key];
			if (Array.isArray(sectionValues) && sectionValues.length > 0) {
				const lastItem = sectionValues[0];

				if (lastItem.tipo === 'Retención impositiva') {
					const completedRegisterDeposits = lastItem &&
						(lastItem.number === '' || lastItem.amount === null || lastItem.amount === 0 || lastItem.date === '' || lastItem.file_field_name === '')
					return completedRegisterDeposits
				}

				const completedRegister = lastItem &&
					(lastItem.number === '' || lastItem.amount === null || lastItem.amount === 0 || lastItem.date === '')
				return completedRegister
			}
			return false;
		});

		if (isIncomplete) {
			setAddRegister(true)
			return;
		}
		setAddRegister(false)
		setErrorMessage('');

	}, [handleChange, handleRemove])

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={style.box__container}>
				<div className={style.box__head}>
					<h2>Saldos</h2>
					<div>
						{isBlocked ? (
							<SecondaryButton text="Editar" type='submit' onClick={() => { onChangeStatusGroup("saldos"); handleCloseDropdown() }} />
						) : (
							<PrimaryButton text="Confirmar" type='submit' onClick={() => { onChangeStatusGroup("saldos"); handleCloseDropdown() }} />
						)}
					</div>
				</div>

				<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px", padding: "0.5rem" }}>

						<div className={style.box__content}>
							{Object.keys(formik.values).map((sectionKey) => (
								formik.values[sectionKey].map((saldo: any, index: number) => (
									<div key={index}>
										{saldo.tipo === "Solicitud de Crédito" && (
											<CreditoLayout
												section="credits"
												values={saldo}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.credits}
												index={index}
												expandedItems={expandedSaldos}
												toggleExpanded={toggleExpandedSaldos}
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
												expandedItems={expandedSaldos}
												toggleExpanded={toggleExpandedSaldos}
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
												expandedItems={expandedSaldos}
												toggleExpanded={toggleExpandedSaldos}
												allSaldos={formik.values}
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
							errorMessage={errorMessage}
							closeDropdown={isDropdownOpen}
							addRegister={addRegister}
							setErrorMessage={setErrorMessage}
						/>
					</div>
				</BlockUI>
			</div>
		</form>
	);
};

const listOptions = [
	{
		name: "Solicitud de Crédito",
		hasSubType: true,
		subTypeList: [
			{ id: 1, name: "Financiero" },
			{ id: 2, name: "Comercial" },
		],
	},
	{ name: "NC o Saldo recibido", hasSubType: false, subTypeList: [] },
	{ name: "Retención impositiva", hasSubType: false, subTypeList: [] },
];
