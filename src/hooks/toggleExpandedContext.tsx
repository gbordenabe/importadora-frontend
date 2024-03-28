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
  // console.log('expandedItem', expandedPagos)
  const toggleExpanded = (index: number, method: string) => {
   
  
    if (method === "newBill") { //abierto
      setExpandedItems(prev => ({
        ...prev,
        [index]: false,
      }));
    } else if (method === "allMin") { //cerrado
      setExpandedItems(prev => ({
        ...prev,
        [index]: true,
      }));
    }  else {
       setExpandedItems(prev => {
            const newExpandedItems: { [key: number]: boolean } = {};
            Object.keys(prev).forEach((key) => {
              const keyElement = parseInt(key);
              newExpandedItems[keyElement] = true;
            });
            newExpandedItems[index] = true;
            newExpandedItems[0] = false;
            return newExpandedItems;
        });
  }
  };

  const toggleExpandedPagos = (index: number, method: string) => {
    if (method === "newPago") { //abierto
      setExpandedPagos(prev => ({
        ...prev,
        [index]: false,
      }));
    } else if (method === "allMin") { //cerrado
      setExpandedPagos(prev => ({
        ...prev,
        [index]: true,
      }));
    }  else {
      setExpandedPagos(prev => {
            const newExpandedItems: { [key: number]: boolean } = {};
            Object.keys(prev).forEach((key) => {
              const keyElement = parseInt(key);
              newExpandedItems[keyElement] = true;
            });
            newExpandedItems[index] = true;
            newExpandedItems[0] = false;
            return newExpandedItems;
        });
  }
  };

  const toggleExpandedSaldos = (index: number, method: string) => {
    if (method === "newSaldo") { //abierto
      setExpandedSaldos(prev => ({
        ...prev,
        [index]: false,
      }));
    } else if (method === "allMin") { //cerrado
      setExpandedSaldos(prev => ({
        ...prev,
        [index]: true,
      }));
    }  else {
      setExpandedSaldos(prev => {
            const newExpandedItems: { [key: number]: boolean } = {};
            Object.keys(prev).forEach((key) => {
              const keyElement = parseInt(key);
              newExpandedItems[keyElement] = true;
            });
            newExpandedItems[index] = true;
            newExpandedItems[0] = false;
            return newExpandedItems;
        });
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