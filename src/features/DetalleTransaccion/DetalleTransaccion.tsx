import { AppStructure } from "@/components/AppStructure/AppStructure";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { FaRegFile } from "react-icons/fa";
import { formatPrice } from "@/helpers/formatPrice";
import { GroupTypeItem } from "./GroupTypeItem/GroupTypeItem";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { Tooltip } from "primereact/tooltip";
import { url } from "@/connections/mainApi";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StatusCircle from "@/components/StatusCircle/StatusCircle";
import { useModal } from "@/hooks/useModal";
import { HeaderDetailTransaction } from "@/components/HeaderDetailTransaction/HeaderDetailTransaction";
import { MainTitleDetail } from "@/components/MainTitleDetail/MainTitleDetail";
import { ImageModalFullScreen } from "./ImageModalFullScreen/ImageModalFullScreen";

export const DetalleTransaccion = () => {
	const { id } = useParams();
	const [data, setData] = useState<any>([]);
	const token = localStorage.getItem("rt__importadora");
	const { login } = useAppSelector((state) => state.auth);
	const imgModal = useModal();
	const [fileData, setFileData] = useState<any>("");

	const fetchData = () => {
		const roleName = login?.role?.name;
		const endpoint = roleName === "SELLER" ? `/transaction/mine/${id}` : `/transaction/${id}`;
		axios
			.get(`${url}${endpoint}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	// console.log(data);

	const onImgModal = (file: any) => {
		setFileData(file);
		imgModal.onVisibleModal();
	};

	const columnsFactura = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "N° Factura",
			campo: "number",
		},
		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},

		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
	];

	const columnsCheques = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},

		{
			nombre: "Tipo",
			campo: "type",
			body: (rowData: any) => {
				let typeSpanish;
				if (rowData.type === "OWN") {
					typeSpanish = "Propio";
				}
				if (rowData.type === "ELECTRONIC") {
					typeSpanish = "Electrónico";
				}
				if (rowData.type === "THIRD_PARTY") {
					typeSpanish = "De terceros";
				}
				return <p>{typeSpanish || ""}</p>;
			},
		},
		{
			nombre: "N° de cheque",
			campo: "document_number",
		},
		{
			nombre: "Banco",
			campo: "bank_name",
		},

		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},
		{
			nombre: "Observaciones",
			campo: "observation",
		},
		{
			nombre: "Adjunto",
			body: (rowData: any) => {
				if (!rowData?.file) {
					return <></>;
				}

				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => onImgModal(rowData.file)}
					>
						<FaRegFile size={22} />
					</div>
				);
			},
		},
	];

	const columnsEfectivoTransferencia = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "N°",
			campo: "document_number",
		},

		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},
		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
		{
			nombre: "Adjunto",
			body: (rowData: any) => {
				if (!rowData?.file) {
					return <></>;
				}
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => onImgModal(rowData.file)}
					>
						<FaRegFile size={22} />
					</div>
				);
			},
		},
	];

	const columnsDeposito = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "N°",
			campo: "document_number",
		},
		{
			nombre: "Banco",
			campo: "bank_name",
		},

		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},
		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
		{
			nombre: "Adjunto",
			body: (rowData: any) => {
				if (!rowData?.file) {
					return <></>;
				}
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => onImgModal(rowData.file)}
					>
						<FaRegFile size={22} />
					</div>
				);
			},
		},
	];

	const columnsCredits = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "Tipo",
			campo: "type",
			body: (rowData: any) => {
				let typeSpanish;
				if (rowData.type === "FINANCIAL") {
					typeSpanish = "Financiero";
				}
				if (rowData.type === "COMMERCIAL") {
					typeSpanish = "Comercial";
				}
				if (rowData.type === "LOGISTIC") {
					typeSpanish = "De Logística";
				}
				return <p>{typeSpanish || ""}</p>;
			},
		},
		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},

		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
	];

	const columnsNotaCredito = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},
		{
			nombre: "Porcentaje %",
			campo: "porcentage",
		},

		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
	];

	const columnsRetencion = [
		{
			nombre: "Estado",
			campo: "status",
			body: renderEstadoBody,
		},
		{
			nombre: "Monto",
			campo: "amount",
			body: (rowData: any) => {
				return <p>{formatPrice(+rowData.amount) || ""}</p>;
			},
		},
		{
			nombre: "Fecha",
			campo: "date",
			body: (rowData: any) => {
				const parts = rowData?.date.split("-");
				const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
				return <p>{formattedDate || ""}</p>;
			},
		},

		{
			nombre: "Observaciones",
			campo: "observation",
			width: "200px",
		},
		{
			nombre: "Adjunto",
			body: (rowData: any) => {
				if (!rowData?.file) {
					return <></>;
				}
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => onImgModal(rowData.file)}
					>
						<FaRegFile size={22} />
					</div>
				);
			},
		},
	];

	return (
		<>
			<AppStructure>
				<MainHeader />
				<ContentStructure>
					<MainTitleDetail
						title="Revisión de transacción"
						createdBy={data?.created_by}
						createdAt={data?.created_at}
						sku={data?.sku}
					/>

					<BoxContent>
						<HeaderDetailTransaction data={data} />

						{data?.bills?.length > 0 && (
							<GroupTypeItem
								columns={columnsFactura}
								data={data?.bills}
								title={`Factura o nota de debito (${data?.bills?.length})`}
								typeGroup="bills"
								fetchData={fetchData}
								status={data?.bill_status}
								dataCompleto={data}
							/>
						)}

						{data?.checks?.length > 0 && (
							<GroupTypeItem
								columns={columnsCheques}
								data={data?.checks}
								title={`Cheques (${data?.checks?.length})`}
								typeGroup="checks"
								fetchData={fetchData}
								status={data?.check_status}
								dataCompleto={data}
							/>
						)}

						{data?.cash?.length > 0 && (
							<GroupTypeItem
								columns={columnsEfectivoTransferencia}
								data={data?.cash}
								title={`Efectivo (${data?.cash?.length})`}
								typeGroup="cash"
								fetchData={fetchData}
								status={data?.cash_status}
								dataCompleto={data}
							/>
						)}

						{data?.deposits?.length > 0 && (
							<GroupTypeItem
								columns={columnsDeposito}
								data={data?.deposits}
								title={`Deposito / Transferencia (${data?.deposits?.length})`}
								typeGroup="deposits"
								fetchData={fetchData}
								status={data?.deposit_status}
								dataCompleto={data}
							/>
						)}

						{data?.credits?.length > 0 && (
							<GroupTypeItem
								columns={columnsCredits}
								data={data?.credits}
								title={`Solicitud de crédito (${data?.credits?.length})`}
								typeGroup="credits"
								fetchData={fetchData}
								status={data?.credit_status}
								dataCompleto={data}
							/>
						)}

						{data?.credit_notes?.length > 0 && (
							<GroupTypeItem
								columns={columnsNotaCredito}
								data={data?.credit_notes}
								title={`NC o saldo recibido (${data?.credit_notes?.length})`}
								typeGroup="credit_notes"
								fetchData={fetchData}
								status={data?.credit_note_status}
								dataCompleto={data}
							/>
						)}

						{data?.retentions?.length > 0 && (
							<GroupTypeItem
								columns={columnsRetencion}
								data={data?.retentions}
								title={`Retención impositiva (${data?.retentions?.length})`}
								typeGroup="retentions"
								fetchData={fetchData}
								status={data?.retention_status}
								dataCompleto={data}
							/>
						)}
					</BoxContent>
				</ContentStructure>
			</AppStructure>

			{/* Add Modal */}
			{imgModal.modalStatus && (
				<ImageModalFullScreen onHideModal={imgModal.onHideModal} fileData={fileData} />
			)}
		</>
	);
};

const renderEstadoBody = (rowData: any) => {
	if (rowData.status === "TO_CHANGE") {
		return (
			<>
				<Tooltip target=".custom-tooltip" />
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
				>
					<span
						className="custom-tooltip"
						data-pr-tooltip={rowData.request_change_comment}
						data-pr-position="top"
						style={{ cursor: "pointer" }}
					>
						<StatusCircle status={rowData.status} size="25px" icon={true} />
					</span>
				</div>
			</>
		);
	} else {
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
				<StatusCircle status={rowData.status} size="25px" />
			</div>
		);
	}
};
