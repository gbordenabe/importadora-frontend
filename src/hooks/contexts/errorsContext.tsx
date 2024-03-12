import React, { createContext, useState, useContext } from "react";

// Definir el contexto


interface ErrorContextType {
  errors: any; // Cambia any[] al tipo correcto para el estado de error
  setErrors: React.Dispatch<React.SetStateAction<any>>; // Cambia any[] al tipo correcto para el estado de error
}

export const ErrorsContext = createContext<ErrorContextType | null>(null);

export const useErrorContext = () => useContext(ErrorsContext);

// Definir el proveedor del contexto
export const DocumentErrorsProvider = ({ children }: { children: React.ReactNode }) => {
  const [errors, setErrors] = useState<any>({
    checks: {
      document_number_check: null,
      amount_check: null,
      date_check: null,
      bank_name_check: null,
      observation_check: null,
    }
  });

  console.log('error Contex', errors)

  const contextValue: any = {
    errors,
    setErrors,
};

  return (
    <ErrorsContext.Provider value={contextValue}>
      {children}
    </ErrorsContext.Provider>
  );
};