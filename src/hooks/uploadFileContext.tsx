import React, { createContext, useState, useContext } from "react";

interface UploadFileContextType {
  fileToUploadChecks: any,
  setFileToUploadChecks: any,
  fileToUploadDeposits: any,
  setFileToUploadDeposits: any,
  fileToUploadCash: any,
  setFileToUploadCash: any,
  fileToUploadRetention: any,
  setFileToUploadRetention: any
}

export const UploadFileContext = createContext<UploadFileContextType | null>(null);

export const useUploadFileContext = () => {
  const context = useContext(UploadFileContext);
  if (!context) {
    throw new Error("useUploadFileContext debe usarse dentro de un ToggleExpandedProvider");
  }
  return context;
}

export const UploadFileProvider = ({ children }: { children: React.ReactNode }) => {

  const [fileToUploadChecks, setFileToUploadChecks] = useState<any[]>([]);
  const [fileToUploadDeposits, setFileToUploadDeposits] = useState<any>([]);
  const [fileToUploadCash, setFileToUploadCash] = useState<any>([]);
  const [fileToUploadRetention, setFileToUploadRetention] = useState<any>([])

  const contextValue: UploadFileContextType
    = {
    fileToUploadChecks,
    setFileToUploadChecks,
    fileToUploadDeposits,
    setFileToUploadDeposits,
    fileToUploadCash,
    setFileToUploadCash,
    fileToUploadRetention,
    setFileToUploadRetention 
  };

  return (
    <UploadFileContext.Provider value={contextValue}>
      {children}
    </UploadFileContext.Provider>
  );
};