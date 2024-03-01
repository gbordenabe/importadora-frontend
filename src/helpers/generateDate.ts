export function generarFecha(): string {
  const ahora: Date = new Date();
  const horas: string = ahora.getHours().toString().padStart(2, '0');
  const minutos: string = ahora.getMinutes().toString().padStart(2, '0');
  const dia: string = ahora.getDate().toString().padStart(2, '0');
  const mes: string = (ahora.getMonth() + 1).toString().padStart(2, '0'); // +1 porque getMonth() devuelve 0-11
  const año: string = ahora.getFullYear().toString();
  return horas + minutos + dia + mes + año;
}

export function generarFechaCorta(): string {
  const ahora: Date = new Date();
  const dia: string = ahora.getDate().toString().padStart(2, '0');
  const mes: string = (ahora.getMonth() + 1).toString().padStart(2, '0'); // +1 porque getMonth() devuelve 0-11
  const año: number = ahora.getFullYear();
  return `${dia} - ${mes} - ${año}`;
}