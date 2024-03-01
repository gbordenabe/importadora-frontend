type Pago = {
  tipo: string;
  type?: string | null;
  [key: string]: any;
};

type PagosAgrupados = {
  checks: Omit<Pago, 'tipo'>[];
  cash: Omit<Pago, 'tipo'>[];
  deposits: Omit<Pago, 'tipo'>[];
};

export function clasificarPagos(pagos: Pago[]): PagosAgrupados {
  return pagos.reduce<PagosAgrupados>((acumulador, pagoActual) => {
    const { tipo, type, resumen, ...pagoSinTipo } = pagoActual;
    let pagoModificado = { ...pagoSinTipo };

    if (type) {
      pagoModificado.type = type === 'Propio' ? 'OWN' :
                            type === 'De terceros' ? 'THIRD_PARTY' :
                            type === 'Electrónico' ? 'ELECTRONIC' : type;
    }

    // Verificar y eliminar la propiedad file_field_name si está vacía
    if ('file_field_name' in pagoModificado && !pagoModificado.file_field_name) {
      delete pagoModificado.file_field_name;
    }

    switch (tipo) {
      case 'Cheque':
        acumulador.checks.push(pagoModificado);
        break;
      case 'Efectivo / Transferencia':
        acumulador.cash.push(pagoModificado);
        break;
      case 'Depósito':
        acumulador.deposits.push(pagoModificado);
        break;
    }

    return acumulador;
  }, {
    checks: [],
    cash: [],
    deposits: [],
  });
}