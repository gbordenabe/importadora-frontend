import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./EditForm.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import CalendarInput from "@/components/Calendar/Calendar";
import { useModal } from "@/hooks/useModal";
import { FaFileMedical } from "react-icons/fa";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { UploadEditModal } from "./UploadEditModal/UploadEditModal";
// import { MainButton } from "@/components/MainButton/MainButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";

interface Column {
	campo: string;
	nombre: string;
	tipo?: string;
	adjunto?: any;
}

interface EditFormData {
	[key: string]: any;
}

interface EditFormProps {
	columns: Column[];
	data: EditFormData;
	onSave: (data: EditFormData) => void;
	typeGroup: string;
	handleBack: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ columns, data, onSave, typeGroup, handleBack }) => {
	const [newData, setNewData] = useState<EditFormData>(data);

	// Archivo adjunto
	const uploadFileModal = useModal();
	const [fileToUpload, setFileToUpload] = useState<any>("");
	const [filesBlob, setFilesBlob] = useState([]);
	console.log(filesBlob);
	// --end archivo adjunto edit--

	const handleChange = (e: ChangeEvent<HTMLInputElement>, campo: string) => {
		// Para manejar archivos o números, necesitamos verificar el tipo de input
		const value =
			e.target.type === "file"
				? e.target.files![0]
				: e.target.type === "number"
				? Number(e.target.value) // Convertir el valor a número si el input es de tipo 'number'
				: e.target.value;

		setNewData({ ...newData, [campo]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let newDataUpdate = { ...newData, file: fileToUpload };
		console.log(newDataUpdate);

		// const formDataStructure = new FormData();

		// filesBlob.forEach((file: any) => {
		// 	formData.append(file.fileName, file.blob, file.fileName);
		// });

		// for (const [key, value] of Object.entries(newTransaction)) {
		// 	if (Array.isArray(value)) {
		// 		formData.append(key, JSON.stringify(value));
		// 	} else {
		// 		formData.append(key, value as string);
		// 	}
		// }

		onSave({ ...newDataUpdate, typeGroup });
		// onSave({ ...formData, typeGroup });
	};

	useEffect(() => {
		if (data?.date) {
			const parts = data.date.split("-");
			const parsedDate = new Date(parts[0], parts[1] - 1, parts[2]);
			setNewData((prev) => ({ ...prev, date: parsedDate }));
		}
	}, [data]);

	return (
		<>
			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit} className={styles.form}>
					{columns
						.filter((column) => column.nombre !== "Estado")
						.map((column, index) => {
							let typeSpanish;
							if (column.campo === "type") {
								switch (newData[column.campo]) {
									case "THIRD_PARTY":
										typeSpanish = "De terceros";
										break; // No olvides los break para evitar que se ejecute el siguiente caso
									case "OWN":
										typeSpanish = "Propio";
										break;
									case "ELECTRONIC":
										typeSpanish = "Electrónico";
										break;
									case "FINANCIAL":
										typeSpanish = "Financiero";
										break;
									case "COMMERCIAL":
										typeSpanish = "Comercial";
										break;
									case "LOGISTIC":
										typeSpanish = "De Logística";
										break;
									default:
										break;
								}
							}

							return (
								<div key={column.campo + index} className={styles.formGroup}>
									{column.campo === "type" && (
										<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
											<label style={{ fontSize: "15px" }}>Tipo:</label>
											<p className={styles.type__text}>{typeSpanish}</p>
										</div>
									)}

									{(column.campo === "document_number" ||
										column.campo === "number" ||
										column.campo === "amount") && (
										<>
											<TextBoxField
												textLabel={column.nombre}
												value={newData[column.campo]}
												onChange={(e) => handleChange(e, column.campo)}
												type="number"
												disabled={column.campo === "amount" ? true : false}
											/>
										</>
									)}

									{(column.campo === "observation" || column.campo === "bank_name") && (
										<>
											<TextBoxField
												textLabel={column.nombre}
												value={newData[column.campo]}
												onChange={(e) => handleChange(e, column.campo)}
											/>
										</>
									)}

									{column.campo === "date" && (
										<>
											<CalendarInput
												label={column.nombre}
												value={newData[column.campo]}
												onChange={(e: any) => handleChange(e, column.campo)}
											/>
										</>
									)}

									{column?.nombre === "Adjunto" && (
										<div style={{ width: "200px" }}>
											<PrimaryButton
												onClick={() => uploadFileModal.onVisibleModal()}
												text="Editar adjunto"
												icon={<FaFileMedical style={{ color: "#fff", cursor: "pointer" }} />}
												type="button"
											/>
										</div>
									)}
								</div>
							);
						})}
					<div className={styles.buttonContainer}>
						<button type="submit" className={`${styles.button} ${styles.saveButton}`}>
							Guardar
						</button>
						<button
							type="button"
							onClick={handleBack}
							className={`${styles.button} ${styles.backButton}`}
						>
							Volver
						</button>
					</div>
				</form>
			</div>
			{/* Upload modal */}

			<PrimeModal
				header="Actualiza un nuevo adjunto"
				modalStatus={uploadFileModal.modalStatus}
				onHideModal={uploadFileModal.onHideModal}
				width={400}
			>
				<UploadEditModal
					onChange={handleChange}
					setFilesBlob={setFilesBlob}
					onHideModal={uploadFileModal.onHideModal}
					setFileToUpload={setFileToUpload}
					fileToUpload={fileToUpload}
				/>
			</PrimeModal>
		</>
	);
};

export default EditForm;
