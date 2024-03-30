import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FileUpload } from "primereact/fileupload";
import style from "./UploadModal.module.css";
import { TiUpload, TiDelete } from 'react-icons/ti';


interface Props {
	index?: any;
	onChange?: any;
	setFilesBlob?: any;
	onHideModal?: any;
	section?: any;
	setFileToUpload?: any;
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

			if (fileToUpload.name) {
				const extension = fileToUpload.name.split('.').pop();
				const filenameWithoutExtension = fileToUpload.name.replace(/\.[^/.]+$/, "");
				const formattedFilename = filenameWithoutExtension.replace(/\./g, '-');
				const newFilename = `${formattedFilename}.${extension}`;

				const blobConvert = new Blob([fileToUpload], { type: fileToUpload.type });
		
				setFilesBlob((prev: any) => [...prev, { fileName: newFilename, blob: blobConvert }]);

				onChange(
					{ target: { name: 'file_field_name', value: newFilename } },
					index,
					section
				);
				onHideModal();
			}
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
					chooseOptions={{ icon: fileToUpload && fileToUpload.objectURL ? <TiDelete style={{ fontSize: '2rem',  margin: '0 1.5px' }} /> : <TiUpload style={{ fontSize: '1rem',  margin: '0 10px'  }} /> }}
			
				/>
				{fileToUpload && fileToUpload.objectURL && (
					<div style={{ maxHeight: "200px" }}>
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
