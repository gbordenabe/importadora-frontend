  export function clasificarFacturas(facturas: any[]): any[] {
    for (const factura of facturas) {
      if (factura.hasOwnProperty('tipo')) {
        delete factura.tipo;
      }

      if (factura.hasOwnProperty('type')) {
        delete factura.type;
      }

      if (factura.hasOwnProperty('resumen')) {
        delete factura.resumen;
      }
    }
  
    return facturas;
  }
  
  