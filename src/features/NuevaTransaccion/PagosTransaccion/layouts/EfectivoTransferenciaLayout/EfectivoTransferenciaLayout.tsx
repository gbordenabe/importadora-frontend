import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./EfectivoTransferenciaLayout.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";
import { FaFileMedical } from "react-icons/fa";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { UploadModal } from "@/features/NuevaTransaccion/components/UploadModal/UploadModal";
import { useModal } from "@/hooks/useModal";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useState } from "react";
import { useUploadFileContext } from "@/hooks/uploadFileContext";

interface Props {
	section: string;
	values?: any;
	handleChange?: any
	handleRemove?: any;
	errors?: any;
	index?: any;
	setFilesBlob?: any;
	fileName?: any,
	expandedItems?: any;
	toggleExpanded?: any;
	allPagos?: any;
}

export const EfectivoTransferenciaLayout = ({
	index,
	setFilesBlob,
	section,
	values,
	handleChange,
	handleRemove,
	errors,
	fileName,
	expandedItems,
	toggleExpanded,
	allPagos,
}: Props) => {
	const uploadFileModal = useModal();
	const { fileToUploadCash, setFileToUploadCash } = useUploadFileContext();
	const [initialized, setInitialized] = useState(false);
	
	useEffect(() => {
		if (!initialized) {
			setInitialized(true);
			if (allPagos[section]?.length && allPagos[section].length > fileToUploadCash.length) {
				const elementsToAdd = allPagos[section].length - fileToUploadCash.length;
				const additionalFiles = Array.from({ length: elementsToAdd }, () => ({ file: {name: '' } }));
				setFileToUploadCash((prevFileToUpload: any) => [...additionalFiles, ...prevFileToUpload]);
			}
		}
	}, [allPagos[section]?.length, fileToUploadCash.length, initialized]);

	const handleDelete = async () => {
		await handleRemove(index, 'cash');
		setFileToUploadCash((prevFileToUpload: any) => {
		  const updatedFileToUpload = [...prevFileToUpload];
		  updatedFileToUpload.splice(index, 1);
		  return updatedFileToUpload;
		});
	  };

	return (
		<>
			<div className={style.layout__container}>
				{expandedItems && typeof section !== 'undefined' && typeof index !== 'undefined' && expandedItems[section] && expandedItems[section][index] ? (
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{values.tipo}</p>
							{values.type && <ChipText text={values.type} />}
							<div style={{ display: "flex", gap: "5px" }}>
								<ChipText text={`N°: ${values.document_number || "-"}`} />
								<ChipText text={`Monto: ${formatPrice(values.amount || 0)}`} />
							</div>
							<div>
								<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
							</div>
						</div>
						<div className={style.layout__header__group}>
							<MaximizarButton onClick={() => toggleExpanded(index, "MaxOrMinPagos", section)} />
							<DeleteButton onClick={handleDelete} />
						</div>
					</div>
				) : (
					<>
						<div className={style.layout__header}>
							<div className={style.layout__header__group}>
								<p className={style.layout__header__title}>{values.tipo}</p>
								{values.type && <ChipText text={values.type} />}
								<div
									style={{ display: "flex", gap: "5px", cursor: "pointer" }}
									onClick={() => uploadFileModal.onVisibleModal()}
								>
									<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
									<p className={style.layout__header__textAdjunto}>{`${fileName ? `(${fileName})` : "(adjunto)"
										}`}</p>
								</div>
							</div>
							<div className={style.layout__header__group}>
								<MinimziarButton onClick={() => toggleExpanded(index, "MaxOrMinPagos", section)} />
								<DeleteButton onClick={handleDelete} />
							</div>
						</div>
						<div className={style.layout__content}>
							<>
								<div key={index} className={style.layout__content__group__one}>
									<div className={`${style.input_with_error} ${errors && errors[index] && errors[index].document_number ? style.error_active : ''}`}>
										<TextBoxField
											name={'document_number'}
											value={values.document_number}
											onChange={(e) => handleChange(e, index, section)}
											placeholder="N°"
										/>
										{errors && errors[index] && (
											<div className={style.error}>{errors[index].document_number}</div>
										)}
									</div>
									<div className={style.input_with_error}>
										<MoneyBoxField
											name={'amount'}
											value={values.amount}
											onChange={(e: any) => handleChange(e, index, section)}
											placeholder="Monto"
										/>
										{errors && errors[index] && (
											<div className={style.error}>{errors[index].amount}</div>
										)}
									</div>
									<div className={style.input_with_error}>
										<CalendarInput
											name={'date'}
											value={values.date}
											onChange={(e: any) => handleChange(e, index, section)}
										/>
										{errors && errors[index] && (
											<div className={style.error}>{errors[index].date}</div>
										)}
									</div>
								</div>
								<div className={style.layout__content__group__two}>
									<TextBoxField
										name={'observation'}
										value={values.observation}
										onChange={(e: any) => handleChange(e, index, section)}
										placeholder="Observaciones"
									/>
								</div>
							</>
						</div>
					</>


				)}
			</div>
			{/* Upload modal */}

			<PrimeModal
				header="Carga tu archivo"
				modalStatus={uploadFileModal.modalStatus}
				onHideModal={uploadFileModal.onHideModal}
				width={400}
			>
				<UploadModal
					section={section}
					index={index}
					onChange={handleChange}
					setFilesBlob={setFilesBlob}
					onHideModal={uploadFileModal.onHideModal}
					setFileToUpload={setFileToUploadCash}
					fileToUpload={fileToUploadCash}
					values={allPagos[section]}
				/>
			</PrimeModal>
		</>
	)
};
