export function clasificarSaldos(saldos: any): any {
  for (const section in saldos) {
    if (Object.prototype.hasOwnProperty.call(saldos, section)) {
      for (let i = 0; i < saldos[section].length; i++) {
        const saldo = saldos[section][i];

        delete saldo.tipo;
        delete saldo.resumen

        if (typeof saldo.file_field_name === 'string' && !saldo.file_field_name.trim()) {
          delete saldo.file_field_name;
        }

        if (saldo.type) {
          saldo.type = saldo.type === 'Financiero' ? 'FINANCIAL' :
            saldo.type === 'Comercial' ? 'COMMERCIAL' : saldo.type;
        } else {
          delete saldo.type
        }

        if (section === 'credit_notes') {
          saldo.porcentage = 0;
        }
      }
    }
  }

  return saldos;
}
