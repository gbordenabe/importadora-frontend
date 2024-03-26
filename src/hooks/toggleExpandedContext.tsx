import React, { createContext, useState, useContext } from "react";

interface ToggleExpandedContextType {
  expandedItems: any,
  toggleExpanded: any,
  expandedSaldos: any,
  toggleExpandedSaldos: any,
  expandedPagos: any,
  toggleExpandedPagos: any
}

export const ToggleExpandedContext = createContext<ToggleExpandedContextType | null>(null);

export const useToggleExpandedContext = () => {
  const context = useContext(ToggleExpandedContext);
  if (!context) {
    throw new Error("useToggleExpandedContext debe usarse dentro de un ToggleExpandedProvider");
  }
  return context;
}

// Definir el proveedor del contexto
export const ToggleExpandedProvider = ({ children }: { children: React.ReactNode }) => {

  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [expandedSaldos, setExpandedSaldos] = useState<{ [key: number]: boolean }>({});
  const [expandedPagos, setExpandedPagos] = useState<{ [key: number]: boolean }>({});

  const toggleExpanded = (index: number, method: string) => {
    if (method === "MaxOrMin") { //maximizar y minimizar
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else if (method === "newBill") { //abierto
      setExpandedItems(prev => ({
        ...prev,
        [index]: false,
      }));
    } else { //cerrado
      setExpandedItems(prev => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const toggleExpandedSaldos = (index: number, method: string) => {
    if (method === "MaxOrMin") { //maximizar y minimizar
      setExpandedSaldos(prev => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else if (method === "newSaldo") { //abierto
      setExpandedSaldos(prev => ({
        ...prev,
        [index]: false,
      }));
    } else { //cerrado
      setExpandedSaldos(prev => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const toggleExpandedPagos = (index: number, method: string) => {
    if (method === "MaxOrMin") { //maximizar y minimizar
      setExpandedPagos(prev => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else if (method === "newPago") { //abierto
      setExpandedPagos(prev => ({
        ...prev,
        [index]: false,
      }));
    } else { //cerrado
      setExpandedPagos(prev => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const contextValue: ToggleExpandedContextType
    = {
    expandedItems,
    toggleExpanded,
    expandedSaldos,
    toggleExpandedSaldos,
    expandedPagos,
    toggleExpandedPagos
  };

  return (
    <ToggleExpandedContext.Provider value={contextValue}>
      {children}
    </ToggleExpandedContext.Provider>
  );
};