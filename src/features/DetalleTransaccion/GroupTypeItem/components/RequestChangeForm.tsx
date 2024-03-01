import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./EditForm.module.css"; // Reutilizando los estilos del EditForm

interface RequestChangeFormData {
    request_change_comment: string;
}

interface RequestChangeFormProps {
    data:any;
    onRequestChange: (data: RequestChangeFormData & { id: string; typeGroup: string }) => void;
    handleBack: () => void;
  }
  
  

  const RequestChangeForm: React.FC<RequestChangeFormProps> = ({ data, onRequestChange, handleBack }) => {
    const initialFormData = { request_change_comment: '' };
    const [formData, setFormData] = useState<RequestChangeFormData>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, request_change_comment: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRequestChange({ ...formData, id: data.id, typeGroup: data.typeGroup });
        // setFormData(initialFormData); // Limpia el formulario al enviar
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Observación</label>
                    <input
                        type="text"
                        className={`${styles.input}`}
                        value={formData.request_change_comment}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Enviar Solicitud</button>
                    <button type="button" onClick={handleBack} className={`${styles.button} ${styles.backButton}`}>Volver</button>
                </div>
            </form>
        </div>
    );
};

export default RequestChangeForm;
