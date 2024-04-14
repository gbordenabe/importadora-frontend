import React, { createContext, useState, useContext } from "react";

interface ToggleExpandedContextType {
  expandedItems: any,
  toggleExpanded: any,
  expandedSaldos: any,
  toggleExpandedSaldos: any,
  expandedPagos: any,
  toggleExpandedPagos: any,
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
    if (method === 'MaxOrMinBill') {
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    } else if (method === "newBill") { //abierto
      setExpandedItems(prev => ({
        ...prev,
        [index]: false,
      }));
    } else if (method === "allMin") { //cerrado
      setExpandedItems(prev => ({
        ...prev,
        [index]: true,
      }));
    } else {
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

  const toggleExpandedPagos = (index: number, method: string, section: string) => {
    if (method === 'MaxOrMinPagos') {
      setExpandedPagos((prev: any) => {
        const updatedSection = {
          ...prev[section],
          [index]: !prev[section][index]
        };
        return {
          ...prev,
          [section]: updatedSection
        };
      });
    } else if (method === "newPago") {
      setExpandedPagos((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [index]: false
        }
      }));
    } else if (method === "allMin") {
      setExpandedPagos((prev: any) => {
        const newExpandedPagos: any = {};
        Object.keys(prev).forEach((sec: string) => {
          newExpandedPagos[sec] = {};
          Object.keys(prev[sec]).forEach((idx: string) => {
            newExpandedPagos[sec][idx] = true;
          });
        });
        return newExpandedPagos;
      });
    } else if (method === 'addRegister') {
      setExpandedPagos((prev: any) => {
        const newExpandedItems: { [key: number]: boolean } = {};
          Object.keys(prev[section]).forEach((key) => {
            const keyElement = parseInt(key);
            newExpandedItems[keyElement] = true;
          });
          newExpandedItems[index] = true;
          newExpandedItems[0] = false;


        return {
          ...prev,
          [section]: newExpandedItems
        };
      });
    } else {
      setExpandedPagos((prev: any) => {
        const newExpandedItems: { [key: number]: boolean } = {};
        if (prev[section]) {
          Object.keys(prev[section]).forEach((key) => {
            const keyElement = parseInt(key);
            newExpandedItems[keyElement] = true;
          });
        }
        return {
          ...prev,
          [section]: newExpandedItems
        };
      });
    }
  };

  const toggleExpandedSaldos = (index: number, method: string, section: string) => {
    if (method === 'MaxOrMinSaldos') {
      setExpandedSaldos((prev: any) => {
        const updatedSection = {
          ...prev[section],
          [index]: !prev[section][index]
        };
        return {
          ...prev,
          [section]: updatedSection
        };
      });
    } else if (method === "newSaldo") { //abierto
      setExpandedSaldos((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [index]: false
        }
      }));
    } else if (method === "allMin") { //cerrado
      setExpandedSaldos((prev: any) => {
        const newExpandedPagos: any = {};
        Object.keys(prev).forEach((sec: string) => {
          newExpandedPagos[sec] = {};
          Object.keys(prev[sec]).forEach((idx: string) => {
            newExpandedPagos[sec][idx] = true;
          });
        });
        return newExpandedPagos;
      });
    } else if (method === 'addRegister') {
      setExpandedSaldos((prev: any) => {
        const newExpandedItems: { [key: number]: boolean } = {};
          Object.keys(prev[section]).forEach((key) => {
            const keyElement = parseInt(key);
            newExpandedItems[keyElement] = true;
          });
          newExpandedItems[index] = true;
          newExpandedItems[0] = false;

        return {
          ...prev,
          [section]: newExpandedItems
        };
      });
    } else {
      setExpandedSaldos((prev: any) => {
        const newExpandedItems: { [key: number]: boolean } = {};
        if (prev[section]) {
          Object.keys(prev[section]).forEach((key) => {
            const keyElement = parseInt(key);
            newExpandedItems[keyElement] = true;
          });
        }
        return {
          ...prev,
          [section]: newExpandedItems
        };
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
    toggleExpandedPagos,
  };

  return (
    <ToggleExpandedContext.Provider value={contextValue}>
      {children}
    </ToggleExpandedContext.Provider>
  );
};