
export function clasificarPagos(pagos: any): any {
  for (const section in pagos) {
    if (Object.prototype.hasOwnProperty.call(pagos, section)) {
      for (let i = 0; i < pagos[section].length; i++) {
        const pago = pagos[section][i];

        delete pago.tipo
        delete pago.bank_name

        if (pago.type) {
          pago.type = pago.type === 'Propio' ? 'OWN' :
            pago.type === 'De terceros' ? 'THIRD_PARTY' :
              pago.type === 'Electrónico' ? 'ELECTRONIC' : pago.type;
        } else {
          delete pago.type
        }

        if (typeof pago.file_field_name === 'string' && !pago.file_field_name.trim()) {
          delete pago.file_field_name;
        }
      }
    }
  }

  return pagos;
}
