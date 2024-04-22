import { useState } from "react";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { GroupTypeItemHeader } from "../GroupTypeItemHeader/GroupTypeItemHeader";
import { PrimeDataTable } from "@/components/PrimeDataTable/PrimeDataTable";
import EditForm from "./components/EditForm";
import axios from "axios";
import { url } from "@/connections/mainApi";
import RequestChangeForm from "./components/RequestChangeForm";
import { useAppSelector } from "@/store/hooks";
import { InputText } from "primereact/inputtext";
interface Props {
	columns: any;
	data: any;
	title: any;
	typeGroup: any;
	fetchData: any;
	status: any;
	dataCompleto: any;
}

export const GroupTypeItem = ({
	columns,
	data,
	title,
	typeGroup,
	fetchData,
	status,
	dataCompleto,
}: Props) => {
	const [showData, setShowData] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentEditData, setCurrentEditData] = useState({});
	const token = localStorage.getItem("rt__importadora");
	const [isRequestingChange, setIsRequestingChange] = useState(false);
	const [currentRequestData, setCurrentRequestData] = useState({});
	const onShowData = () => {
		setShowData(!showData);
	};
	const { login } = useAppSelector((state) => state.auth);

	const handleSave = async (formData: any) => {
		let endpoint = "";
		let payload = {};

		const isSeller = login?.role?.name === "SELLER";

		switch (typeGroup) {
			case "checks":
				endpoint = isSeller ? `${url}/check/mine/${formData.id}` : `${url}/check/${formData.id}`;

				payload = {
					document_number: formData.document_number,
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
					type: formData.type,
					bank_name: formData.bank_name,
					file_field_name: formData.file_field_name,
					file: formData.file,
				};
				break;
			case "bills":
				endpoint = isSeller ? `${url}/bill/mine/${formData.id}` : `${url}/bill/${formData.id}`;
				payload = {
					number: formData.number,
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
				};
				break;
			case "deposits":
				endpoint = isSeller
					? `${url}/deposit/mine/${formData.id}`
					: `${url}/deposit/${formData.id}`;

				payload = {
					document_number: formData.document_number,
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
					bank_name: formData.bank_name,
				};
				break;

			case "cash":
				endpoint = isSeller ? `${url}/cash/mine/${formData.id}` : `${url}/cash/${formData.id}`;

				payload = {
					document_number: formData.document_number,
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
				};
				break;
			case "credits":
				endpoint = isSeller ? `${url}/credit/mine/${formData.id}` : `${url}/credit/${formData.id}`;

				payload = {
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
					type: formData.type,
				};
				break;
			case "credit_notes":
				endpoint = isSeller
					? `${url}/creditNote/mine/${formData.id}`
					: `${url}/creditNote/${formData.id}`;

				payload = {
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
					porcentage: formData.porcentage,
				};
				break;
			case "retentions":
				endpoint = isSeller
					? `${url}/retention/mine/${formData.id}`
					: `${url}/retention/${formData.id}`;

				payload = {
					amount: formData.amount,
					date: formData.date,
					observation: formData.observation,
				};
				break;
			default:
				console.error("Tipo no reconocido:", typeGroup);
				return;
		}

		// console.log(payload);
		const newFormData = new FormData();

		for (const [key, value] of Object.entries(formData)) {
			if (Array.isArray(value)) {
				newFormData.append(key, JSON.stringify(value));
			} else {
				newFormData.append(key, value as string);
			}
		}
		// console.log(newFormData); //consoleo la data antes de transformar a form data
		// for (let [key, value] of newFormData.entries()) {
		// 	console.log(key, value);
		// }

		// Actualizando al endpoint
		try {
			const response = await fetch(endpoint, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// body: JSON.stringify(payload),
				body: JSON.stringify(newFormData),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Success:", data);
			fetchData();
			setIsEditing(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleEditBTN = (rowData: any) => {
		if (rowData?.status === "OK") return;
		const itemToEdit = data.find((item: any) => item.id === rowData.id);
		if (itemToEdit) {
			setCurrentEditData(itemToEdit);
			setIsEditing(true);
		}
	};

	const handleRequestChangeBTN = (rowData: any) => {
		if (rowData?.status === "OK") return;
		console.log("Solicitar Cambio", rowData.id);
		setCurrentRequestData(rowData);
		setIsRequestingChange(true);
	};

	const handleApprove = async (rowData: any) => {
		if (rowData?.status === "OK") return;
		let endpoint = "";

		switch (typeGroup) {
			case "checks":
				endpoint = `${url}/check/set-status-as-ok/${rowData.id}`;
				break;
			case "bills":
				endpoint = `${url}/bill/set-status-as-ok/${rowData.id}`;
				break;
			case "deposits":
				endpoint = `${url}/deposit/set-status-as-ok/${rowData.id}`;
				break;
			case "credits":
				endpoint = `${url}/credit/set-status-as-ok/${rowData.id}`;
				break;
			case "credit_notes":
				endpoint = `${url}/creditNote/set-status-as-ok/${rowData.id}`;
				break;
			case "retentions":
				endpoint = `${url}/retention/set-status-as-ok/${rowData.id}`;
				break;
			case "cash":
				endpoint = `${url}/cash/set-status-as-ok/${rowData.id}`;
				break;
			default:
				console.error("Tipo no reconocido:", typeGroup);
				return;
		}

		try {
			const response = await axios.head(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				console.log("El recurso existe y fue aprobado.");
				fetchData();
			}
		} catch (error) {
			console.error("Error al aprobar el recurso:", error);
		}
	};

	const onRequestChange = async (formData: any) => {
		console.log("Datos de la solicitud de cambio:", formData);

		let endpoint = "";
		switch (typeGroup) {
			case "checks":
				endpoint = `${url}/check/set-status-as-to-change/${formData.id}`;
				break;
			case "bills":
				endpoint = `${url}/bill/set-status-as-to-change/${formData.id}`;
				break;
			case "deposits":
				endpoint = `${url}/deposit/set-status-as-to-change/${formData.id}`;
				break;
			case "credits":
				endpoint = `${url}/credit/set-status-as-to-change/${formData.id}`;
				break;
			case "credit_notes":
				endpoint = `${url}/creditNote/set-status-as-to-change/${formData.id}`;
				break;
			case "retentions":
				endpoint = `${url}/retention/set-status-as-to-change/${formData.id}`;
				break;
			case "cash":
				endpoint = `${url}/cash/set-status-as-to-change/${formData.id}`;
				break;
			default:
				console.error("Tipo no reconocido:", typeGroup);
				return;
		}

		try {
			const response = await axios.post(
				endpoint,
				{
					request_change_comment: formData.request_change_comment,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 201) {
				console.log("Solicitud de cambio enviada con éxito.");
				setIsRequestingChange(false);
				fetchData();
			} else {
				throw new Error(`Error al enviar la solicitud de cambio: ${response.status}`);
			}
		} catch (error) {
			console.error("Error al enviar la solicitud de cambio:", error);
		}
	};

	return (
		<BoxContent>
			<GroupTypeItemHeader
				onShowData={onShowData}
				title={title}
				showData={showData}
				data={data}
				typeGroup={typeGroup}
				status={status}
				isEditing={isEditing}
			/>

			{isEditing ? (
				<EditForm
					columns={columns}
					data={currentEditData}
					onSave={handleSave}
					typeGroup={typeGroup}
					handleBack={() => setIsEditing(false)}
				/>
			) : isRequestingChange ? (
				<RequestChangeForm
					data={currentRequestData}
					onRequestChange={onRequestChange}
					handleBack={() => setIsRequestingChange(false)}
				/>
			) : showData ? (
				<>
					{typeGroup === "bills" && (
						<div
							className="dropdowns-container"
							style={{ marginBottom: "1rem", display: "flex", gap: "2rem" }}
						>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<label htmlFor="" style={{ marginBottom: 5 }}>
									Cliente
								</label>
								<InputText value={dataCompleto?.client?.name} disabled />
							</div>

							<div style={{ display: "flex", flexDirection: "column" }}>
								<label htmlFor="" style={{ marginBottom: 5 }}>
									Empresa
								</label>
								<InputText value={dataCompleto?.company?.name} disabled />
							</div>
						</div>
					)}
					<PrimeDataTable
						columns={columns}
						data={data}
						onEdit={handleEditBTN}
						onRequestChange={handleRequestChangeBTN}
						onApprove={handleApprove}
					/>
				</>
			) : null}
		</BoxContent>
	);
};
