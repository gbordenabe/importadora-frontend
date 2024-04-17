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
	values?: any;
	setFileToUpload?: any;
	fileToUpload?: any
}

export const UploadModal = ({
	index,
	onChange,
	setFilesBlob,
	onHideModal,
	section,
	values,
	setFileToUpload,
	fileToUpload
}: Props) => {

	const onFileSelect = (e: any) => {
		const fileResp = e.files[0];
		const existingFile = fileToUpload[index];
		if (existingFile) {
			existingFile.file = fileResp;
			setFileToUpload([...fileToUpload]);
		} else {
			setFileToUpload((prev: any[]) => [{ file: fileResp }, ...prev]);
		}

	};

	const onSaveImg = () => {
		const uploadedFile = fileToUpload[index]?.file;
		if (!uploadedFile) return;
		if (onChange && index !== undefined) {

			if (uploadedFile.name) {
				const extension = uploadedFile.name.split('.').pop();
				const filenameWithoutExtension = uploadedFile.name.replace(/\.[^/.]+$/, "");
				const formattedFilename = filenameWithoutExtension.replace(/\./g, '-');
				const newFilename = `${formattedFilename}.${extension}`;

				const blobConvert = new Blob([uploadedFile], { type: uploadedFile.type });

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
					maxFileSize={10000000}
					onSelect={onFileSelect}
					onClear={() => setFileToUpload((prev: any[]) => prev.filter((_, idx) => idx !== index))}
					chooseLabel={fileToUpload.length === values.length && (fileToUpload[index]?.file?.type === 'image/jpeg' || fileToUpload[index]?.file?.type === 'image/jpg' || fileToUpload[index]?.file?.type === 'image/png' || fileToUpload[index]?.file?.type === 'application/pdf') ? `${fileToUpload[index]?.file?.name}` : "Selecciona desde tu dispositivo"}
					chooseOptions={{ icon: fileToUpload.length === values.length && (fileToUpload[index]?.file?.type === 'image/jpeg' || fileToUpload[index]?.file?.type === 'image/jpg' || fileToUpload[index]?.file?.type === 'image/png' || fileToUpload[index]?.file?.type === 'application/pdf') ? <TiDelete style={{ fontSize: '2rem', margin: '0 1.5px' }} /> : <TiUpload style={{ fontSize: '1rem', margin: '0 10px' }} /> }}

				/>

				{fileToUpload.length === values.length && fileToUpload[index]?.file?.objectURL && (
					<div style={{ maxHeight: "200px" }}>
						<img
							style={{ height: "100%", objectFit: "cover" }}
							alt={"img preview"}
							role="presentation"
							src={fileToUpload[index]?.file?.objectURL}
							width={100}
						/>
					</div>
				)}
				<p className={style.upload__description}>Formatos disponibles: JPG, JPEG, PNG y PDF</p>
			</div>

			<div className={style.buttons__container}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />
				<SecondaryButton text="Guardar" onClick={() => onSaveImg()} fitWidth />
			</div>
		</div>
	);
};
