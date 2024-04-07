import { useNavigate, useParams } from "react-router-dom";
import style from "./MainTitleDetail.module.css";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { url } from "@/connections/mainApi";

import { BiSolidArchiveIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

interface Props {
	title: string;
	onShowModal?: any;
	isShowModal?: boolean;
}

export const MainTitleDetail = ({ title, onShowModal, isShowModal }: Props) => {
	const { id } = useParams();
	const [dataDownloadAdjuntos, setDataDownloadAdjuntos] = useState<any>("");
	// const [dataDownloadCsv, setDataDownloadAdjuntosCsv] = useState<any>("");

	const { role } = useAppSelector((state) => state?.auth?.login);

	const navigate = useNavigate();

	const handleNavigateLogin = () => {
		if (isShowModal) {
			onShowModal();
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		if (id) {
			const token = localStorage.getItem("rt__importadora");
			axios
				.post(
					`${url}/transaction/download/${id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => setDataDownloadAdjuntos(res.data))
				.catch((err) => console.log(err));

			// axios
			// 	.post(
			// 		`${url}/transaction/csv/${id}`,
			// 		{},
			// 		{
			// 			headers: {
			// 				Authorization: `Bearer ${token}`,
			// 			},
			// 		}
			// 	)
			// 	.then((res) => setDataDownloadAdjuntosCsv(res.data))
			// 	.catch((err) => console.log(err));
		}
	}, [id]);

	const handleDownload = async (download: any) => {
		if (!download) {
			alert("No se han podido cargar los archivos o ha habido un problema con el servidor");
			return;
		}

		const link = document.createElement("a");
		link.href = download;
		link.setAttribute("download", "adjuntos");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<h2 className={style.mainTitle}>{title}</h2>

			<button
				style={{ padding: "5px 1rem", borderRadius: 50, fontWeight: "bold", cursor: "pointer" }}
				onClick={handleNavigateLogin}
			>
				Volver
			</button>

			{role?.name == "TREASURER" && (
				<>
					<div>
						<PrimaryButton
							text="Descargar Adjuntos"
							icon={<BiSolidArchiveIn />}
							onClick={() => handleDownload(dataDownloadAdjuntos)}
						/>
					</div>
					{/* <div>
						<PrimaryButton
							text="Descargar CSV"
							icon={<BiSolidArchiveIn />}
							onClick={() => handleDownload(dataDownloadCsv)}
						/>
					</div> */}
				</>
			)}
		</div>
	);
};
