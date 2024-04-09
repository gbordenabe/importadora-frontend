import { useNavigate, useParams } from "react-router-dom";
import style from "./MainTitleDetail.module.css";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { url } from "@/connections/mainApi";

import { BiSolidArchiveIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";
import { useGetFetch } from "@/hooks/useGetFetch";
import { IoIosArrowDown } from "react-icons/io";
import StatusCircle from "../StatusCircle/StatusCircle";
import { formatDate } from "@/helpers/formatDate";
import { formatStatus, formatType } from "@/helpers/fromatInfo";

interface Props {
	title: string;
	createdBy?: any;
	createdAt?: any;
}

export const MainTitleDetail = ({ title, createdBy, createdAt }: Props) => {
	const { id } = useParams();
	const [dataDownloadAdjuntos, setDataDownloadAdjuntos] = useState<any>("");
	// const [dataDownloadCsv, setDataDownloadAdjuntosCsv] = useState<any>("");
	const [dropdownActive, setDropdownActive] = useState(false);
	const historyGetData = useGetFetch(`/transaction/history/${id}`);
	console.log(historyGetData.data);

	// /transaction/history/{id}

	const { role } = useAppSelector((state) => state?.auth?.login);

	const navigate = useNavigate();

	const handleNavigateLogin = () => {
		navigate("/");
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
							text="Descargar PDF"
							icon={<BiSolidArchiveIn />}
							onClick={() => handleDownload(dataDownloadCsv)}
						/>
					</div> */}
				</>
			)}

			<div style={{ position: "relative" }}>
				<div className={style.historial__box} onClick={() => setDropdownActive((prev) => !prev)}>
					<StatusCircle status={"PENDING"} size="15px" />
					<p>{formatDate(createdAt)}</p>
					<p>{`Creación de la transacción por ${createdBy?.name}`}</p>

					<IoIosArrowDown size={20} style={{ marginLeft: "10px" }} />
				</div>

				{dropdownActive && (
					<div className={style.historial__box__dropdown}>
						<div className={style.historial__box__item}>
							<StatusCircle status={"PENDING"} size="15px" />
							<p>{formatDate(createdAt)}</p>
							<p>{`Creación de la transacción ${createdBy?.name}`}</p>
						</div>

						{historyGetData?.data &&
							historyGetData?.data?.map((item: any) => (
								<div className={style.historial__box__item} key={item.id}>
									<StatusCircle status={item.statuses} size="15px" />
									<p>{formatDate(createdAt)}</p>
									<p>{`${formatStatus(item.statuses)} ${formatType(item.payment_type)} por ${
										item?.created_by?.name
									} ${item?.created_by?.role?.name == "SELLER" ? "(Vendedor)" : "(Tesorero)"}`}</p>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};
