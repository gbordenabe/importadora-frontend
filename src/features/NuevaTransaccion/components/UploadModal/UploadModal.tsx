import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { FileUpload } from "primereact/fileupload";
import style from "./UploadModal.module.css";
import { TiUpload, TiDelete } from 'react-icons/ti';
import { useUploadFileContext } from "@/hooks/uploadFileContext";
import { useState } from "react";

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
	const [errorDuplicatedFile, setErrorDuplicatedFile] = useState<any>('')
	const { fileToUploadChecks, fileToUploadDeposits, fileToUploadCash, fileToUploadRetention } = useUploadFileContext();

	const onFileSelect = (e: any) => {
		const fileResp = e.files[0]

		const sonObjetosIguales = (objeto1: { [x: string]: any; }, objeto2: { [x: string]: any; }) => {
			let name1 = objeto1.name;
			let name2 = objeto2.name;

			if (objeto2 instanceof File) {
				name2 = objeto2.name;
			}
			return name1 === name2;
		};

		const duplicatedFilesCountInCheck = fileToUploadChecks.filter((objeto: any) => sonObjetosIguales(objeto.file, fileResp)).length;
		const duplicatedFilesCountInDeposits = fileToUploadDeposits.filter((objeto: any) => sonObjetosIguales(objeto.file, fileResp)).length;
		const duplicatedFilesCountInCash = fileToUploadCash.filter((objeto: any) => sonObjetosIguales(objeto.file, fileResp)).length;
		const duplicatedFilesCountInRetention = fileToUploadRetention.filter((objeto: any) => sonObjetosIguales(objeto.file, fileResp)).length;

		if (duplicatedFilesCountInCheck > 0 || duplicatedFilesCountInDeposits > 0 || duplicatedFilesCountInCash > 0 || duplicatedFilesCountInRetention > 0) {
			setErrorDuplicatedFile('El archivo seleccionado ha sido cargado previamente.')
		} else {
			setErrorDuplicatedFile('')
			const existingFile = fileToUpload[index];
			if (existingFile) {
				existingFile.file = fileResp;
				setFileToUpload([...fileToUpload]);
			} else {
				setFileToUpload((prev: any[]) => [{ file: fileResp }, ...prev]);
			}
		}
	};

	const onSaveImg = () => {
		const uploadedFile = fileToUpload[index]?.file;
		if (!uploadedFile) return;
		if (onChange && index !== undefined) {

			if (uploadedFile.name !== '') {
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
			} else {
				onChange(
					{ target: { name: 'file_field_name', value: '' } },
					index,
					section
				);
				onHideModal();
			}
		}
	};

	const onClearFile = (indexToRemove: number) => {
		setFileToUpload((prevFiles: any[]) => {
			setErrorDuplicatedFile('')
			const updatedFiles = [...prevFiles];
			updatedFiles[indexToRemove] = { file: { name: '' } };
			return updatedFiles;
		});
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
					onClear={() => onClearFile(index)}
					chooseLabel={errorDuplicatedFile === '' && fileToUpload.length === values.length && (fileToUpload[index]?.file?.type === 'image/jpeg' || fileToUpload[index]?.file?.type === 'image/jpg' || fileToUpload[index]?.file?.type === 'image/png' || fileToUpload[index]?.file?.type === 'application/pdf') ? `${fileToUpload[index]?.file?.name}` : "Selecciona desde tu dispositivo"}
					chooseOptions={{ icon: errorDuplicatedFile === '' && fileToUpload.length === values.length && (fileToUpload[index]?.file?.type === 'image/jpeg' || fileToUpload[index]?.file?.type === 'image/jpg' || fileToUpload[index]?.file?.type === 'image/png' || fileToUpload[index]?.file?.type === 'application/pdf') ? <TiDelete style={{ fontSize: '2rem', margin: '0 1.5px' }} /> : <TiUpload style={{ fontSize: '1rem', margin: '0 10px' }} /> }}

				/>
				<p className={style.message_error}>{errorDuplicatedFile}</p>

				{errorDuplicatedFile === '' && fileToUpload.length === values.length && fileToUpload[index]?.file?.objectURL && (
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
				<SecondaryButton text="Guardar" onClick={() => onSaveImg()} fitWidth disabled={errorDuplicatedFile !== ''} />
			</div>
		</div>
	);
};
