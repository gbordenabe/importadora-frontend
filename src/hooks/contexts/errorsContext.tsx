import React, { createContext, useState, useContext } from "react";

interface TransactionContextType {
  facturas: any; 
  setFacturas: React.Dispatch<React.SetStateAction<any>>; 
}

export const TransactionContext = createContext<TransactionContextType | null>(null);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext debe usarse dentro de un TransactionProvider");
  }
  return context;
}

// Definir el proveedor del contexto
export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [facturas, setFacturas] = useState<any>([]);

  const contextValue: TransactionContextType
 = {
    facturas,
    setFacturas,
};

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};