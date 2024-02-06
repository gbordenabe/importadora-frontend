type Saldo = {
  tipo: string; // 'tipo' será siempre ignorado
  type?: string | null; // 'type' puede estar presente y se modificará según el caso
  [key: string]: any;
};

type SaldosAgrupados = {
  credits: Omit<Saldo, 'tipo' | 'type'>[];
  credit_notes: Omit<Saldo, 'tipo' | 'type'>[];
  retentions: Omit<Saldo, 'tipo' | 'type'>[];
};

export function clasificarSaldos(saldos: Saldo[]): SaldosAgrupados {
  return saldos.reduce<SaldosAgrupados>((acumulador, saldoActual) => {
    // Ignora siempre 'tipo'. Si 'type' es null, también lo ignora.
    let { tipo, type, ...saldoSinTipo } = saldoActual;

    // Si el saldo es de tipo "Crédito" y 'type' no es null, cambia el valor de 'type' según el caso
    if (tipo === 'Crédito' && type !== null) {
      switch (type) {
        case 'Financiero':
          type = 'FINANCIAL';
          break;
        case 'Comercial':
          type = 'COMMERCIAL';
          break;
        case 'De Logística':
          type = 'LOGISTIC';
          break;
        // Si 'type' es null, no incluir 'type' en el objeto final
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
      case 'Crédito':
        acumulador.credits.push(saldoSinTipo);
        break;
      case 'Nota de crédito':
        acumulador.credit_notes.push(saldoSinTipo);
        break;
      case 'Retención':
        acumulador.retentions.push(saldoSinTipo);
        break;
    }
    return acumulador;
  }, { credits: [], credit_notes: [], retentions: [] });
}
