type Saldo = {
	tipo: string; // 'tipo' será siempre ignorado
	type?: string | null; // 'type' puede estar presente y se modificará según el caso
	[key: string]: any;
};

type SaldosAgrupados = {
	credits: Omit<Saldo, "tipo" | "type">[];
	credit_notes: Omit<Saldo, "tipo" | "type">[];
	retentions: Omit<Saldo, "tipo" | "type">[];
};

export function clasificarSaldos(saldos: Saldo[]): SaldosAgrupados {
	return saldos.reduce<SaldosAgrupados>(
		(acumulador, saldoActual) => {
			// Inicialmente quita 'tipo' y opcionalmente 'type' si es null, manteniendo el resto
			let { tipo, type, file_field_name, resumen, ...restoDelSaldo } = saldoActual;

			// Comprueba si debe quitar 'file_field_name' basado en el tipo o si está vacío
			let quitarFileFieldName =
				tipo === "Crédito" || tipo === "Nota de crédito" || !file_field_name;

			// Prepara el saldo sin 'tipo', y sin 'file_field_name' si se cumple la condición
			let saldoSinTipo = quitarFileFieldName
				? restoDelSaldo
				: { ...restoDelSaldo, file_field_name };

			// Ajusta 'type' si el saldo es de tipo "Crédito" y 'type' no es null
			if (tipo === "Crédito" && type !== null) {
				switch (type) {
					case "Financiero":
						type = "FINANCIAL";
						break;
					case "Comercial":
						type = "COMMERCIAL";
						break;
					case "De Logística":
						type = "LOGISTIC";
						break;
					default:
						type = undefined;
						break;
				}
				// Reincorpora 'type' modificado si no es undefined
				if (type !== undefined) {
					saldoSinTipo.type = type;
				}
			}

			// Añade el saldo al arreglo correspondiente según su 'tipo'
			switch (tipo) {
				case "Crédito":
					acumulador.credits.push(saldoSinTipo);
					break;
				case "Nota de crédito":
					acumulador.credit_notes.push(saldoSinTipo);
					break;
				case "Retención":
					acumulador.retentions.push(saldoSinTipo);
					break;
			}
			return acumulador;
		},
		{ credits: [], credit_notes: [], retentions: [] }
	);
}
