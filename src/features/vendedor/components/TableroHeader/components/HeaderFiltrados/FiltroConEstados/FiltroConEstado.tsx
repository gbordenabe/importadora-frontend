import { useState, useEffect } from "react";
import style from "./FiltroConEstado.module.css";

const FiltroConEstado = () => {
	const [status, setStatus] = useState("ALL");
	const [typeDocument, setTypeDocument] = useState<any>({
		bill_status: "ALL",
		cash_status: "ALL",
		check_status: "ALL",
		credit_note_status: "ALL",
		credit_status: "ALL",
		deposit_status: "ALL",
		retention_status: "ALL",
	});
	const [allDocumentsChecked, setAllDocumentsChecked] = useState(true);

	// Set all document types when the component mounts or when status is set to 'ALL'
	useEffect(() => {
		if (status === "ALL") {
			setTypeDocument({
				bill_status: "ALL",
				cash_status: "ALL",
				check_status: "ALL",
				credit_note_status: "ALL",
				credit_status: "ALL",
				deposit_status: "ALL",
				retention_status: "ALL",
			});
		}
	}, [status]);

	const handleStatusChange = (selectedStatus: any) => {
		setStatus(selectedStatus);
		if (selectedStatus === "ALL") {
			setAllDocumentsChecked(true);
		} else {
			setAllDocumentsChecked(false);
		}
	};

	const handleAllDocumentsChange = () => {
		const newCheckedState = !allDocumentsChecked;
		setAllDocumentsChecked(newCheckedState);
		const newTypeDocumentState = newCheckedState ? "ALL" : "";
		setTypeDocument({
			bill_status: newTypeDocumentState,
			cash_status: newTypeDocumentState,
			check_status: newTypeDocumentState,
			credit_note_status: newTypeDocumentState,
			credit_status: newTypeDocumentState,
			deposit_status: newTypeDocumentState,
			retention_status: newTypeDocumentState,
		});
	};

	const handleTypeDocumentChange = (docType: any) => {
		setTypeDocument((prev: any) => ({
			...prev,
			[docType]: prev[docType] === "ALL" ? "" : "ALL",
		}));
		setAllDocumentsChecked(false);
	};

	const renderStatusCheckbox = (stat: any, label: any, colorClass: any) => (
		<div key={stat} className={style.itemStateColor}>
			<input type="checkbox" checked={status === stat} onChange={() => handleStatusChange(stat)} />
			{stat !== "ALL" && (
				<div className={`${style[colorClass]} ${style.header__filtrados__select__color}`}></div>
			)}
			<span className={style.titleState}>{label}</span>
		</div>
	);

	const renderTypeDocumentCheckbox = (key: any, label: any) => (
		<div key={key} className={style.itemStateColor}>
			<input
				type="checkbox"
				checked={typeDocument[key] === "ALL"}
				onChange={() => handleTypeDocumentChange(key)}
			/>
			<span className={style.titleState}>{label}</span>
		</div>
	);

	const confirm = () => {
		console.log(typeDocument);
		console.log(status);
	};

	return (
		<div className={style.filtroConEstado}>
			<div className={style.containerChecks}>
				<div className={style.containerMedium}>
					{renderStatusCheckbox("ALL", "Todos", null)}
					{renderStatusCheckbox("PENDING", "En revisión", "header__filtrados__blue")}
					{renderStatusCheckbox("TO_CHANGE", "Solicitud", "header__filtrados__red")}
					{renderStatusCheckbox("EDITED", "Edición", "header__filtrados__yellow")}
					{renderStatusCheckbox("OK", "Aprobado", "header__filtrados__green")}
				</div>
				<div className={style.containerMedium}>
					<div className={style.itemStateColor}>
						<input
							type="checkbox"
							checked={allDocumentsChecked}
							onChange={handleAllDocumentsChange}
						/>
						<span className={style.titleState}>Todos</span>
					</div>
					{renderTypeDocumentCheckbox("bill_status", "Factura o débito")}
					{renderTypeDocumentCheckbox("cash_status", "Efectivo / Transferencia")}
					{renderTypeDocumentCheckbox("check_status", "Cheques")}
					{renderTypeDocumentCheckbox("deposit_status", "Deposito")}
					{renderTypeDocumentCheckbox("credit_status", "Crédito")}
					{renderTypeDocumentCheckbox("credit_note_status", "Nota de crédito")}
					{renderTypeDocumentCheckbox("retention_status", "Retención")}
				</div>
			</div>
			<button className={style.buttonConfirm} onClick={confirm}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroConEstado;
