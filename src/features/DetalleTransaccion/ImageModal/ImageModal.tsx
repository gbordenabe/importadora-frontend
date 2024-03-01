import style from "./ImageModal.module.css";

import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	fileData: any;
}

export const ImageModal = ({ fileData }: Props) => {
	const urlAWS = "https://test-bucket-importer-app.s3.sa-east-1.amazonaws.com";

	const handleDownload = async () => {
		if (!fileData?.file_name) return;

		const imageUrl = `${urlAWS}/${fileData.file_name}`;
		const link = document.createElement("a");
		link.href = imageUrl;
		link.setAttribute("download", fileData.file_name); // Opcional: Puedes asignar un nombre de archivo específico aquí
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<div className={style.img__container}>
			{fileData?.file_name ? (
				<>
					<SecondaryButton text="Descargar imagen" fitWidth onClick={handleDownload} />
					<br />

					<img className={style.img} src={`${urlAWS}/${fileData?.file_name}`} alt="" />
				</>
			) : (
				<p>No hay adjunto</p>
			)}
		</div>
	);
};
