import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./EditForm.module.css";

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

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit} className={styles.form}>
				{columns
					.filter((column) => column.nombre !== "Estado")
					.map((column, index) => {
						const isMonto = column.nombre === "Monto";
						const inputType = column.nombre === "Adjunto" ? "file" : isMonto ? "number" : "text";
						const inputClass = isMonto ? styles.noSpinners : styles.input;
						console.log(column)

						return (
							<div key={column.campo + index} className={styles.formGroup}>
								<label className={styles.label}>{column.nombre}</label>
								<input
									type={column.campo == "number" ? "number" : inputType}
									className={`${styles.input} ${inputClass}`}
									value={formData[column.campo] || ""}
									onChange={(e) => handleChange(e, column.campo)}
									disabled={column.campo === "type" || column.campo === "amount"}
								/>
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
