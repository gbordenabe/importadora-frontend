import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FileUpload } from "primereact/fileupload";
import style from "./UploadEditModal.module.css";
import { TiUpload, TiDelete } from "react-icons/ti";

interface Props {
	onChange?: any;
	setFilesBlob?: any;
	onHideModal?: any;
	setFileToUpload?: any;
	fileToUpload?: any;
}

export const UploadEditModal = ({
	onChange,
	setFilesBlob,
	onHideModal,
	setFileToUpload,
	fileToUpload,
}: Props) => {
	const onFileSelect = (e: any) => {
		const fileResp = e.files[0];
		setFileToUpload(fileResp);
	};

	const onSaveImg = (fileToUpload: any) => {
		if (!fileToUpload) return;
		if (onChange !== undefined) {
			if (fileToUpload.name) {
				const extension = fileToUpload.name.split(".").pop();
				const filenameWithoutExtension = fileToUpload.name.replace(/\.[^/.]+$/, "");
				const formattedFilename = filenameWithoutExtension.replace(/\./g, "-");
				const newFilename = `${formattedFilename}.${extension}`;

				const blobConvert = new Blob([fileToUpload], { type: fileToUpload.type });

				setFilesBlob([{ fileName: newFilename, blob: blobConvert }]);
				onChange({ target: { name: "file_field_name", value: newFilename } }, "file_field_name");

				// onChange({ target: { name: "file_field_name", value: newFilename } }, index, section);
				onHideModal();
			}
		}
	};

	return (
		<div className={style.modalUpload__container}>
			<div className={style.buttonUpload__container}>
				<label className={style.label__input}>Subir un nuevo archivo:</label>
				<FileUpload
					mode={"basic"}
					name="file_field_name"
					accept=".jpg,.jpeg,.png,.pdf"
					maxFileSize={1000000}
					// customUpload={true}
					onSelect={onFileSelect}
					onClear={() => setFileToUpload("")}
					chooseLabel={
						fileToUpload && fileToUpload.objectURL
							? `${fileToUpload.name}`
							: "Selecciona desde tu dispositivo"
					}
					chooseOptions={{
						icon:
							fileToUpload && fileToUpload.objectURL ? (
								<TiDelete style={{ fontSize: "2rem", margin: "0 1.5px" }} />
							) : (
								<TiUpload style={{ fontSize: "1rem", margin: "0 10px" }} />
							),
					}}
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
