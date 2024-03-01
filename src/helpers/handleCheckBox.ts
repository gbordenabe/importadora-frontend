import React from 'react';

export const handleChangeCheckBox = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<T[]>>,
  singleSelect: boolean = false // Nuevo parámetro con un valor predeterminado de false
  ) => {
    const { value, checked } = e.target;

  if (singleSelect && checked) {
    // Si singleSelect es true y el checkbox está marcado, reemplaza el valor actual con el nuevo valor
    setValue([value as unknown as T]);
  } else {
    // Comportamiento normal para múltiple selección
    setValue((prev) =>
      checked
        ? [...prev, value as unknown as T] // Asumiendo que T puede ser compatible con el tipo de `value`
        : prev.filter((id) => id !== value)
    );
  }
};
