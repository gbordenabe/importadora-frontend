type Saldo = {
	tipo: string; // 'tipo' será siempre ignorado
	type?: string | null; // 'type' puede estar presente y se modificará según el caso
	[key: string]: any;
};

export function clasificarSaldos(saldos: any): any {
  // Itera sobre las secciones (credits, credit_notes, retentions)
  for (const section in saldos) {
    if (Object.prototype.hasOwnProperty.call(saldos, section)) {
      // Itera sobre los saldos de cada sección
      for (let i = 0; i < saldos[section].length; i++) {
        const saldo = saldos[section][i];

		 // Elimina la propiedad tipo
		 delete saldo.tipo;
        
        // Elimina la propiedad file_field_name si está vacía
        if (typeof saldo.file_field_name === 'string' && !saldo.file_field_name.trim()) {
          delete saldo.file_field_name;
        }

		if (saldo.type) {
			saldo.type = saldo.type === 'Financiero' ? 'FINANCIAL' :
						saldo.type === 'Comercial' ? 'COMMERCIAL' : saldo.type;
		  } else {
			delete saldo.type
		  }

      }
    }
  }

  return saldos;
}
