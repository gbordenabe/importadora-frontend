export const convertirANumero = (stringsArray: string[]): number[] => {
  return stringsArray.map((str) => parseFloat(str));
};