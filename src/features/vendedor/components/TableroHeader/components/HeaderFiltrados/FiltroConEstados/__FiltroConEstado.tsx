import { useEffect, useState } from "react";
import style from "./__FiltroConEstado.module.css";

const __FiltroConEstado = ({
	onSetFilterDocument,
	onHideModal,
	currentValue,
	currentStatus,
	onSetStatusFilter,
}: any) => {
	const documentTypes = {
		bill_status: "Factura o débito",
		cash_status: "Efectivo",
		check_status: "Cheques",
		deposit_status: "Deposito o transferencia",
		credit_status: "Solicitud de crédito",
		credit_note_status: "NC o saldo recibido",
		retention_status: "Retención impositiva",
	};

	const statusTypes = {
		ALL: "Todos los estados",
		PENDING: "En revisión",
		TO_CHANGE: "Solicitud",
		EDITED: "Edición",
		OK: "Aprobado",
	};

	const [status, setStatus] = useState(currentStatus);
	const [typeDocument, setTypeDocument] = useState<any>(currentValue);

	const handleStatusChange = (selectedStatus: any) => {
		setStatus(selectedStatus);

		if (selectedStatus === "ALL") {
			setTypeDocument(
				Object.fromEntries(
					Object.entries(typeDocument).map(([key]) => {
						return [key, selectedStatus];
					})
				)
			);
		} else {
			setTypeDocument(
				Object.fromEntries(
					Object.entries(typeDocument).map(([key, value]) => {
						const newValue = value ? selectedStatus : value;
						return [key, newValue];
					})
				)
			);
		}
	};

	const handleTypeDocumentChange = (docType: string) => {
		if (status === "ALL") {
			return;
		}
		setTypeDocument((prevState: any) => ({
			...prevState,
			[docType]: prevState[docType] === status ? "" : status,
		}));
	};

	const confirmFilter = () => {
		let isAll = verificarPropiedadesConValor(typeDocument);
		let typeDocumentToSend = { ...typeDocument };
		if (validarAlMenosUnAll(typeDocumentToSend)) {
			convertirSiTodosSonAll(typeDocumentToSend);
		}
		onSetFilterDocument(status, isAll);

		// Envio de data fetch
		onSetStatusFilter(typeDocumentToSend);

		onHideModal();
	};

	useEffect(() => {
		if (currentValue) {
			let newCurrentValue = convertirATodosAllSiEstanVacios({ ...currentValue });
			setTypeDocument(newCurrentValue);
		}
	}, [currentValue]);

	return (
		<div className={style.filtroConEstado}>
			<div className={style.containerChecks}>
				<div className={style.containerMedium}>
					{Object.entries(statusTypes).map(([key, value]) => (
						<div key={key} className={style.itemStateColor}>
							<input
								type="checkbox"
								checked={status === key}
								onChange={() => handleStatusChange(key)}
							/>
							{key != "ALL" && (
								<div
									className={`${style.header__filtrados__select__color} ${
										key == "PENDING" && style.header__filtrados__blue
									}  ${key == "TO_CHANGE" && style.header__filtrados__red} ${
										key == "EDITED" && style.header__filtrados__yellow
									} ${key == "OK" && style.header__filtrados__green} `}
								></div>
							)}
							<span className={style.titleState}>{value}</span>
						</div>
					))}
				</div>

				<div className={style.containerMedium}>
					{Object.entries(documentTypes).map(([key, value]) => (
						<div key={key} className={style.itemStateColor}>
							<input
								type="checkbox"
								checked={typeDocument[key] === status}
								onChange={() => handleTypeDocumentChange(key)}
							/>
							<span className={style.titleState}>{value}</span>
						</div>
					))}
				</div>
			</div>
			<button className={style.buttonConfirm} onClick={confirmFilter}>
				Confirmar
			</button>
		</div>
	);
};

export default __FiltroConEstado;

const verificarPropiedadesConValor = (obj: any) => {
	for (let propiedad in obj) {
		if (!obj[propiedad]) {
			return false;
		}
	}
	return true;
};

const validarAlMenosUnAll = (obj: any) => {
	return Object.values(obj).some((valor) => valor === "ALL");
};

const convertirSiTodosSonAll = (obj: any) => {
	const todosSonAll = Object.values(obj).every((valor) => valor === "ALL");

	if (todosSonAll) {
		Object.keys(obj).forEach((key) => (obj[key] = ""));
	}
};

const convertirATodosAllSiEstanVacios = (obj: any) => {
	const todosEstanVacios = Object.values(obj).every((valor) => valor === "");

	if (todosEstanVacios) {
		Object.keys(obj).forEach((key) => (obj[key] = "ALL"));
	}

	return obj;
};

// ---- Antiguo handleStatusChange
// const handleStatusChange = (selectedStatus: any) => {
// 	setStatus(selectedStatus);

// 	setTypeDocument(
// 		Object.fromEntries(
// 			Object.entries(typeDocument).map(([key]) => {
// 				return [key, selectedStatus];
// 			})
// 		)
// 	);
// };
