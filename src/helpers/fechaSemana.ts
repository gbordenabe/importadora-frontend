export function fechaSemana(): string {
  // Crear un nuevo objeto de fecha para la fecha y hora actuales
  let now: Date = new Date();
  // Restar 7 días a la fecha actual
  now.setDate(now.getDate() - 7);

  // Convertir a formato ISO y ajustar para incluir milisegundos
  let isoString: string = now.toISOString(); // Esto ya retorna un string en formato "2024-02-22T06:39:23.322Z"

  return isoString;
}