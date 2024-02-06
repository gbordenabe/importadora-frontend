import { useState } from "react";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { GroupTypeItemHeader } from "../GroupTypeItemHeader/GroupTypeItemHeader";
import { PrimeDataTable } from "@/components/PrimeDataTable/PrimeDataTable";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import EditForm from "./components/EditForm";
import axios from "axios";
import style from "./GroupTypeItem.module.css";
import { url } from "@/connections/mainApi";
interface Props {
  columns: any;
  data: any;
  title: string;
  typeGroup: any;
  fetchData: any;
}

export const GroupTypeItem = ({ columns, data, title, typeGroup, fetchData }: Props) => {
  const [showData, setShowData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditData, setCurrentEditData] = useState({});
  const token = localStorage.getItem("rt__importadora");

  const onShowData = () => {
    setShowData(!showData);
  };

  const handleEdit = (itemData: any) => {
    setCurrentEditData(itemData);
    setIsEditing(true);
  };

  const handleSave = async (formData) => {
    let endpoint = "";
    let payload = {};

    switch (typeGroup) {
      case "checks":
        endpoint = `${url}/check/${formData.id}`;

        payload = {
          document_number: formData.document_number,
          amount: formData.amount,
          date: formData.date,
          observation: formData.observation,
          type: formData.type,
          bank_name: formData.bank_name,
        };

        console.log(formData, "dasdas");

        break;
      case "bills":
        endpoint = `${url}/bill/${formData.id}`;

        payload = {
          number: formData.number,
          amount: formData.amount,
          date: formData.date,
          observation: formData.observation,
        };
        break;
        case "deposits":
          endpoint = `${url}/deposit/${formData.id}`;
  
          payload = {
            document_number: formData.document_number,
            amount: formData.amount,
            date: formData.date,
            observation: formData.observation,
            bank_name: formData.bank_name
          };
          break;

      default:
        console.error("Tipo no reconocido:", typeGroup);
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  let displayData = data || [];

  console.log(data, typeGroup);

  const handleEditBTN = (rowData: any) => {
    console.log("Editar", rowData.id);
    const itemToEdit = data.find((item: any) => item.id === rowData.id);
    if (itemToEdit) {
      setCurrentEditData(itemToEdit);
      setIsEditing(true);
    }
  };

  const handleRequestChange = (rowData: any) => {
    console.log("Solicitar Cambio", rowData.id);
  };



  const handleApprove = async (rowData) => {
    const endpoint = `${url}/check/set-status-as-ok/${rowData.id}`;

    try {
      const response = await axios.head(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("El recurso existe y fue aprobado.");
        fetchData();
      }
    } catch (error) {
      console.error("Error al aprobar el recurso:", error);
    }
  };

  return (
    <BoxContent>
      <GroupTypeItemHeader onShowData={onShowData} title={title} showData={showData} />
      {isEditing ? (
        <EditForm columns={columns} data={currentEditData} onSave={handleSave} typeGroup={typeGroup} handleBack={handleBack} />
      ) : (
        showData && (
          <>
            <PrimeDataTable columns={columns} data={displayData} onEdit={handleEditBTN} onRequestChange={handleRequestChange} onApprove={handleApprove} />
          </>
        )
      )}
    </BoxContent>
  );
};
