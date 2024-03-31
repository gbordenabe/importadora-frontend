import { useNavigate, useParams } from "react-router-dom";
import style from "./MainTitle.module.css";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { url } from "@/connections/mainApi";

import { BiSolidArchiveIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
	title: string;
	onShowModal?: any;
	isShowModal?: boolean;
}

export const MainTitle = ({ title, onShowModal, isShowModal }: Props) => {
	const { id } = useParams();
	const [dataDownload, setDataDownload] = useState<any>("");

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
				.then((res) => setDataDownload(res.data))
				.catch((err) => console.log(err));
		}
	}, [id]);

	const handleDownload = async () => {
		if (!dataDownload) {
			alert("No se han encontrado adjuntos o ha habido un problema con el servidor");
			return;
		}

		const link = document.createElement("a");
		link.href = dataDownload;
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

			<div>
				<PrimaryButton
					text="Descargar Adjuntos"
					icon={<BiSolidArchiveIn />}
					onClick={handleDownload}
				/>
			</div>
		</div>
	);
};
