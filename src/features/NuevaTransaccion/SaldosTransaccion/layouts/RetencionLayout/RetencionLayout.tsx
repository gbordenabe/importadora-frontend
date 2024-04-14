import style from "./RetencionLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";
import { FaFileMedical } from "react-icons/fa";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { UploadModal } from "@/features/NuevaTransaccion/components/UploadModal/UploadModal";
import { formatPrice } from "@/helpers/formatPrice";
import { useUploadFileContext } from "@/hooks/uploadFileContext";
import { useEffect, useRef, useState } from "react";

interface Props {
	section: string,
	values: any,
	handleChange: any,
	errors?: any,
	index?: any,
	handleRemove?: any,
	fileName?: any,
	setFilesBlob?: any,
	expandedItems?: any;
	toggleExpanded?: any;
	allSaldos?: any;
}

export const RetencionLayout = ({
	index,
	setFilesBlob,
	fileName,
	section,
	values,
	handleChange,
	handleRemove,
	errors,
	expandedItems,
	toggleExpanded,
	allSaldos
}: Props) => {
	const uploadFileModal = useModal();
	const { fileToUploadRetention, setFileToUploadRetention } = useUploadFileContext();
	const [indexToRemove, setIndexToRemove] = useState<any>(null)

	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		if (allSaldos[section] && allSaldos[section].length > fileToUploadRetention.length) {
			const elementsToAdd = allSaldos[section].length - fileToUploadRetention.length;
			const additionalFiles = Array.from({ length: elementsToAdd }, () => ({ file: null }));
			setFileToUploadRetention((prevFileToUpload: any) => [...additionalFiles, ...prevFileToUpload]);
		}
	}, [allSaldos[section]?.length, fileToUploadRetention?.length]);

	useEffect(() => {
		if (fileToUploadRetention.length !== 0 && allSaldos[section].length < fileToUploadRetention.length) {
			const updatedFileToUpload = [...fileToUploadRetention]
			updatedFileToUpload.splice(indexToRemove, 1);
			setFileToUploadRetention(updatedFileToUpload);
		}
	}, [allSaldos[section]]);

	return (
		<>
			<div className={style.layout__container}>
				{expandedItems  && typeof section !== 'undefined' && typeof index !== 'undefined' && expandedItems[section] && expandedItems[section][index] ? (
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{values.tipo}</p>
							{values.type && <ChipText text={values.type} />}
							<div style={{ display: "flex", gap: "5px" }}>
								<ChipText text={`Monto: ${formatPrice(values.amount || 0)}`} />
								<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
							</div>
						</div>
						<div className={style.layout__header__group}>
							<MaximizarButton onClick={() => toggleExpanded(index, "MaxOrMinSaldos", section)} />
							<DeleteButton onClick={() => {
								handleRemove(index, 'retentions')
								setIndexToRemove(index)
							}
							} />
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
									<div className={style.container_textAdjunto}>
										<p className={style.layout__header__textAdjunto}>{`${fileName ? `(${fileName})` : "(adjunto obligatorio)"
											}`}</p>
										{errors && errors[index] && (
											<div className={style.error}>{errors[index].file_field_name}</div>
										)}

									</div>
								</div>
							</div>
							<div className={style.layout__header__group}>
								<MinimziarButton onClick={() => toggleExpanded(index, "MaxOrMinSaldos", section)} />
								<DeleteButton onClick={() => {
									handleRemove(index, 'retentions')
									setIndexToRemove(index)
								}
								} />
							</div>
						</div>
						<div className={style.layout__content}>
							<>
								<div className={style.layout__content__group__one}>
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
								values={allSaldos[section]}
								setFileToUpload={setFileToUploadRetention}
								fileToUpload={fileToUploadRetention}
							/>
						</PrimeModal>
					</>
				)}
			</div>
		</>
	);
};