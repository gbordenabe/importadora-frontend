export const formatStatus = (statuses: string) => {
	return statuses == "EDITED"
		? "Edición en"
		: statuses == "TO_CHANGE"
		? "Solicitud en"
		: "Aprobación en";
};

export const formatType = (type: string) => {
	let result = "Sin tipo";
	if (type === "bill") {
		result = "Factura";
	}

	if (type === "check OWN") {
		result = "Cheque propio";
	}
	if (type === "check THIRD_PARTY") {
		result = "Cheque de terceros";
	}
	if (type === "check ELECTRONIC") {
		result = "Cheque electrónico";
	}

	if (type === "cash") {
		result = "Efectivo";
	}

	if (type === "deposit") {
		result = "Deposito / Transferencia";
	}

	if (type === "credit") {
    // En credito faltan agregar ambos tipos
		result = "Crédito";
	}

	if (type === "retention") {
		result = "Retención";
	}

	if (type === "credit_note") {
		result = "NC o Saldo recibido";
	}

	return result;
};
