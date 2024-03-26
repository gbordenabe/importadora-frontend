import React, { createContext, useState, useContext } from "react";

interface ToggleExpandedContextType {
  expandedItems: any,
  toggleExpanded: any,
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

  // const removeExpandedItem = (index: number) => {
  //   setExpandedItems(prev => {
  //     const { [index]: removedItem, ...rest } = prev;
  //     return rest;
  //   });
  // };

  const contextValue: ToggleExpandedContextType
    = {
    expandedItems,
    toggleExpanded,
  };

  return (
    <ToggleExpandedContext.Provider value={contextValue}>
      {children}
    </ToggleExpandedContext.Provider>
  );
};