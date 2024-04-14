import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FileUpload } from "primereact/fileupload";
import style from "./UploadModal.module.css";
import { TiUpload, TiDelete } from 'react-icons/ti';


interface Props {
	index?: any;
	indexPago?: any;
	onChange?: any;
	setFilesBlob?: any;
	onHideModal?: any;
	section?: any;
	allPagos?: any;
	setFileToUpload?: any;
	fileToUpload?: any
}

export const UploadModal = ({
	index,
	indexPago,
	onChange,
	setFilesBlob,
	onHideModal,
	section,
	allPagos,
	setFileToUpload,
	fileToUpload
}: Props) => {
	
	// console.log('index', index)
	// console.log('indexPago', indexPago)
	// console.log('fileToUpload', fileToUpload)

	const onFileSelect = (e: any) => {
		const fileResp = e.files[0];
		const existingFile = fileToUpload[indexPago];
		if(fileToUpload.length === allPagos.length) {
			 existingFile.file = fileResp;
			 setFileToUpload([...fileToUpload]);
		} else {
			// console.log('else')
		setFileToUpload((prev: any[]) => [ { file: fileResp },  ...prev]);
		}
		
	};

	const onSaveImg = () => {
		const uploadedFile = fileToUpload[indexPago]?.file;
		if (!uploadedFile) return;
		if (onChange && indexPago !== undefined) {

			if (uploadedFile.name) {
				const extension = uploadedFile.name.split('.').pop();
				const filenameWithoutExtension = uploadedFile.name.replace(/\.[^/.]+$/, "");
				const formattedFilename = filenameWithoutExtension.replace(/\./g, '-');
				const newFilename = `${formattedFilename}.${extension}`;

				const blobConvert = new Blob([uploadedFile], { type: uploadedFile.type });
		
				setFilesBlob((prev: any) => [...prev, { fileName: newFilename, blob: blobConvert }]);

				onChange(
					{ target: { name: 'file_field_name', value: newFilename } },
					indexPago,
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
                    chooseLabel={ fileToUpload.length === allPagos.length && fileToUpload[indexPago]?.file?.objectURL ? `${fileToUpload[indexPago]?.file?.name}` : "Selecciona desde tu dispositivo"}
                    chooseOptions={{ icon: fileToUpload.length === allPagos.length && fileToUpload[indexPago]?.file?.objectURL ? <TiDelete style={{ fontSize: '2rem', margin: '0 1.5px' }} /> : <TiUpload style={{ fontSize: '1rem', margin: '0 10px' }} /> }}
			
				/>

				{fileToUpload.length === allPagos.length && fileToUpload[indexPago]?.file?.objectURL && (
					<div style={{ maxHeight: "200px" }}>
						<img
							style={{ height: "100%", objectFit: "cover" }}
							alt={"img preview"}
							role="presentation"
							src={fileToUpload[indexPago]?.file?.objectURL}
							width={100}
						/>
					</div>
				)}
				<p className={style.upload__description}>Formatos disponibles: JPG, PNG y PDF</p>
			</div>

			<div className={style.buttons__container}>
				<SecondaryButton text="Volver" onClick={onHideModal} fitWidth />
				<SecondaryButton text="Guardar" onClick={() => onSaveImg()} fitWidth />
			</div>
		</div>
	);
};
