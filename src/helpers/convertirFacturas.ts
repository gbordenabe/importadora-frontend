export function clasificarFacturas(facturas: any): any {
  console.log('facturas', facturas)
  for (const section in facturas) {
    if (Object.prototype.hasOwnProperty.call(facturas, section)) {
      for (let i = 0; i < facturas[section].length; i++) {
        const factura = facturas[section][i];

        if (factura.tipo) {
          delete factura.tipo;
        }

        delete factura.type;
        
        if (factura.resumen) {
          delete factura.resumen;
        }
      }
    }
  }

  return facturas;
}
