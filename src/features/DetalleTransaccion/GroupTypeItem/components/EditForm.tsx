import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./EditForm.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import CalendarInput from "@/components/Calendar/Calendar";

interface Column {
	campo: string;
	nombre: string;
	tipo?: string;
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
	const [formData, setFormData] = useState<EditFormData>(data);

	const handleChange = (e: ChangeEvent<HTMLInputElement>, campo: string) => {
		// Para manejar archivos o números, necesitamos verificar el tipo de input
		const value =
			e.target.type === "file"
				? e.target.files![0]
				: e.target.type === "number"
				? Number(e.target.value) // Convertir el valor a número si el input es de tipo 'number'
				: e.target.value;
		setFormData({ ...formData, [campo]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave({ ...formData, typeGroup });
	};

	useEffect(() => {
		if (data?.date) {
			const parts = data.date.split("-");
			const parsedDate = new Date(parts[0], parts[1] - 1, parts[2]);
			setFormData((prev) => ({ ...prev, date: parsedDate }));
		}
	}, [data]);

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit} className={styles.form}>
				{columns
					.filter((column) => column.nombre !== "Estado")
					.map((column, index) => {
						let typeSpanish;
						if (column.campo === "type") {
							switch (formData[column.campo]) {
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
											value={formData[column.campo]}
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
											value={formData[column.campo]}
											onChange={(e) => handleChange(e, column.campo)}
										/>
									</>
								)}

								{column.campo === "date" && (
									<>
										<CalendarInput
											label={column.nombre}
											value={formData[column.campo]}
											onChange={(e: any) => handleChange(e, column.campo)}
										/>
									</>
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
	);
};

export default EditForm;
