import style from "./ImageModalFullScreen.module.css";
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

interface Props {
	fileData?: any;
	onHideModal?: any;
}

export const ImageModalFullScreen = ({ fileData, onHideModal }: Props) => {
	const urlAWS = "https://importadora-prod.s3.sa-east-1.amazonaws.com";

	const handleDownload = async () => {
		if (!fileData?.file_name) return;

		const imageUrl = `${urlAWS}/${fileData.file_name}`;
		const link = document.createElement("a");
		link.href = imageUrl;
		link.setAttribute("download", fileData.file_name);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<div className={style.imageModal__container}>
			<div className={style.imageModal__overlay} onClick={() => onHideModal()}></div>

			<div className={style.imageModal__content}>
				<div className={style.imageModal__header}>
					<div className={style.imageModal__header__buttons}>
						<div className={style.imageModal__header__button} onClick={() => onHideModal()}>
							<IoClose />
						</div>
						<div className={style.imageModal__header__button} onClick={() => handleDownload()}>
							<FiDownload />
						</div>
					</div>

					<p style={{ fontSize: "14px" }}>{fileData?.file_name}</p>
				</div>
				<div className={style.imageModal__img}>
					{fileData?.type == "application/pdf" ? (
						<div className={style.container__msg__pdf}>
							<p className={style.msg__pdf}>
								Para poder visualizar el PDF, es necesario descargar el archivo
							</p>
						</div>
					) : (
						<img className={style.img} src={`${urlAWS}/${fileData?.file_name}`} alt="img" />
					)}
				</div>
			</div>
		</div>
	);
};
