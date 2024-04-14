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
import { validationSchema } from "@/helpers/customFormik";
import { useEffect, useState } from "react";
import { useToggleExpandedContext } from "@/hooks/toggleExpandedContext";

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
	const [errorMessage, setErrorMessage] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(true);
	const [addRegister, setAddRegister] = useState(false);
	// const [indexToRemove, setIndexToRemove] = useState<number>(0);
	// const [indexToRemoveDeposits, setIndexToRemoveDeposits] = useState<number>(0);
	// const [indexToRemoveCash, setIndexToRemoveCash] = useState<number>(0);
	// // console.log('indexToRemove', indexToRemove)

	const { expandedPagos, toggleExpandedPagos } = useToggleExpandedContext();
	//fileToUploadChecks, setFileToUploadChecks, fileToUploadDeposits, setFileToUploadDeposits, fileToUploadCash, setFileToUploadCash



	const initialValues: any = {
		checks: [],
		deposits: [],
		cash: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: () => {
			// onChangeStatusGroup("pagos")
		},
	});

	useEffect(() => {
		setPagos(formik.values);
	}, [formik.values]);

	// useEffect(() => {
	// 	if (fileToUploadChecks.length !== 0 && formik.values[section].length < fileToUploadChecks.length) {
	// 		console.log('pasa')
	// 		const updatedFileToUpload = [...fileToUploadChecks];
	// 		updatedFileToUpload.splice(indexToRemove, 1); 
	// 		setFileToUploadChecks(updatedFileToUpload);
	// 	}
	// 	if (fileToUploadDeposits.length !== 0 && formik.values[section].length < fileToUploadDeposits.length) {
	// 		console.log('pasa deposits')
	// 		const updatedfileToUploadDeposits = [...fileToUploadDeposits];
	// 		updatedfileToUploadDeposits.splice(indexToRemoveDeposits, 1); 
	// 		setFileToUploadDeposits(updatedfileToUploadDeposits);
	// 	}
	// 	if (fileToUploadCash.length !== 0 && formik.values[section].length < fileToUploadCash.length) {
	// 		console.log('pasa cash')
	// 		const updatedfileToUploadCash = [...fileToUploadCash];
	// 		updatedfileToUploadCash.splice(indexToRemoveCash, 1); 
	// 		setFileToUploadCash(updatedfileToUploadCash);
	// 	}
	// }, [formik.values[section]]);

	// console.log('fomik', formik.values);

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

	const handleAdd = (section: any, newData: any) => {
		// Agregar el nuevo registro
		const newValues = { ...formik.values };
		const currentValues = [...formik.values[section]];
		currentValues.unshift(newData);
		newValues[section] = currentValues;
		formik.setValues(newValues);


		// Manejar la expansión del pago
		const sections = formik.values

		if (sections && sections[section] && sections[section].length > 0) {
			for (const sec in sections) {
				if (sec === section) {
					const newIndex = sections[section].length;
					toggleExpandedPagos(newIndex, "addRegister", section);
				} else {
					toggleExpandedPagos(null, "minOneSection", sec);
				}

			}
		} else {
			for (const sec in sections) {
				if (sec === section) {
					toggleExpandedPagos(0, "newSaldo", section);
				} else {
					toggleExpandedPagos(null, "minOneSection", sec);
				}
			}
			toggleExpandedPagos(0, "newPago", section);
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

				if (lastItem.tipo === 'Depósito / Transferencia') {
					const completedRegisterDeposits = lastItem &&
						(lastItem.number === '' || lastItem.amount === null || lastItem.date === '' || lastItem.file_field_name === '')
					return completedRegisterDeposits
				}

				const completedRegister = lastItem &&
					(lastItem.number === '' || lastItem.amount === null || lastItem.date === '')
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
					<h2>Pagos</h2>
					<div>
						{isBlocked ? (
							<SecondaryButton text="Editar" type='submit' onClick={() => { onChangeStatusGroup("pagos"); handleCloseDropdown(); }} />
						) : (
							<PrimaryButton text="Confirmar" type='submit' onClick={() => { onChangeStatusGroup("pagos"); handleCloseDropdown(); }} />
						)}
					</div>
				</div>

				<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px", padding: "0.5rem" }}>

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
												// setIndexToRemove={setIndexToRemove}
												errors={formik.errors.checks}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
												expandedItems={expandedPagos}
												toggleExpanded={toggleExpandedPagos}
												allPagos={formik.values}
											/>
										)}
										{pago.tipo === "Depósito / Transferencia" && (
											<DepositoLayout
												section="deposits"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												// setIndexToRemove={setIndexToRemoveDeposits}
												errors={formik.errors.deposits}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
												expandedItems={expandedPagos}
												toggleExpanded={toggleExpandedPagos}
												allPagos={formik.values}
											/>
										)}
										{pago.tipo === "Efectivo" && (
											<EfectivoTransferenciaLayout
												section="cash"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												// setIndexToRemove={setIndexToRemoveCash}
												errors={formik.errors.cash}
												index={index}
												setFilesBlob={setFilesBlob}
												fileName={pago.file_field_name}
												expandedItems={expandedPagos}
												toggleExpanded={toggleExpandedPagos}
												allPagos={formik.values}
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