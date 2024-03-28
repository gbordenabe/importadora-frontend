import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FileUpload } from "primereact/fileupload";
import style from "./UploadModal.module.css";


interface Props {
	index?: any;
	onChange?: any;
	setFilesBlob?: any;
	onHideModal?: any;
	section?: any;
	setFileToUpload?:any;
	fileToUpload?: any
}

export const UploadModal = ({
	index,
	onChange,
	setFilesBlob,
	onHideModal,
	section,
	setFileToUpload,
	fileToUpload
}: Props) => {
	const onFileSelect = (e: any) => {
		const fileResp = e.files[0];
		setFileToUpload(fileResp);
	};

	const onSaveImg = (fileToUpload: any) => {
		if (!fileToUpload) return;
		if (onChange && index !== undefined) {
			// Convirtiendo los blob para la subida adicional
			const blobConvert = new Blob([fileToUpload], { type: fileToUpload.type });
			setFilesBlob((prev: any) => [...prev, { fileName: fileToUpload.name, blob: blobConvert }]);
			onChange(
				{ target: { name: 'file_field_name', value: fileToUpload.name } },
				index,
				section
			  );
			onHideModal();
		}
	};

	return (
		<div className={style.modalUpload__container}>
			<div className={style.buttonUpload__container}>
				<label className={style.label__input}>Subir tu archivo:</label>
				<FileUpload
					mode={"basic"}
					name="file_field_name"
					accept=".jpg,.jpeg,.png,.pdf"
					maxFileSize={1000000}
					// customUpload={true}
					onSelect={onFileSelect}
					onClear={() => setFileToUpload("")}
					chooseLabel={fileToUpload && fileToUpload.objectURL ? `${fileToUpload.name}` : "Selecciona desde tu dispositivo"}
					// className={style.file__button}
				/>
				{fileToUpload && fileToUpload.objectURL && (
					<div style={{ maxHeight: "200px"}}>
						<img
							style={{ height: "100%", objectFit: "cover" }}
							alt={"img preview"}
							role="presentation"
							src={fileToUpload.objectURL}
							width={100}
						/>
					</div>
				)}
				<p className={style.upload__description}>Formatos disponibles: JPG, PNG y PDF</p>
			</div>

			<div className={style.buttons__container}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />
				<SecondaryButton text="Guardar" onClick={() => onSaveImg(fileToUpload)} fitWidth />
			</div>
		</div>
	);
};
