import { AppStructure } from "@/components/AppStructure/AppStructure";
// import style from "./DetalleTransaccion.module.css";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { MainTitle } from "@/components/MainTitle/MainTitle";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { HeaderTransaccion } from "../../components/HeaderTransaccion/HeaderTransaccion";
import { GroupTypeItem } from "./GroupTypeItem/GroupTypeItem";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi";
import StatusCircle from "@/components/StatusCircle/StatusCircle";

export const DetalleTransaccion = () => {
  const { id } = useParams();
  const [data, setData] = useState([])
  const token = localStorage.getItem("rt__importadora");



  const fetchData = () => {
    axios.get(`${url}/transaction/${id}`, {headers:{
      Authorization: `Bearer ${token}`
    }})
    .then(res => setData(res.data) )
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])
  



  return (
    <AppStructure>
      <MainHeader />
      <ContentStructure>
        <MainTitle title="Revisión de transacción" />

        <BoxContent>
          <HeaderTransaccion isDetails={true} data={data} />

          <GroupTypeItem columns={columnsFactura} data={data?.bills} title={`Factura o nota de debito (${data?.bills?.length})`} typeGroup="bills" fetchData={fetchData} />
          <GroupTypeItem columns={columnsCheques} data={data?.checks} title={`Cheques (${data?.checks?.length})`} typeGroup="checks" fetchData={fetchData}/>
          <GroupTypeItem columns={columnsDepositoTransferencia} data={data?.deposits} title={`Deposito (1) / Transferencia (1)`} typeGroup="deposits" fetchData={fetchData}/>
          <GroupTypeItem columns={columnsCredits} data={data?.credits} title={`Credito (${data?.credits?.length})`} typeGroup="credits" fetchData={fetchData}/>
          <GroupTypeItem columns={columnsNotaCredito} data={data?.credit_notes} title={`Notas de Credito (${data?.credit_notes?.length})`} typeGroup="credit_notes" fetchData={fetchData}/>

          <GroupTypeItem columns={columnsRetencion} data={data?.retentions} title={`Retención (${data?.retentions?.length})`} typeGroup="retentions" fetchData={fetchData}/>
        </BoxContent>
      </ContentStructure>
    </AppStructure>
  );
};

const columnsFactura = [
  {
    nombre: "N° Factura",
    campo: "number",
  },
  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },

  {
    nombre: "Observaciones",
    campo: "observation",
    width: "200px",
  },
];

        
        const renderEstadoBody = (rowData:any) => <StatusCircle status={rowData.status} size="25px" />;

const columnsCheques = [
  {
    nombre: "Estado",
  
    body: renderEstadoBody,
  },
  
  {
    nombre: "Tipo",
    campo: "type",
  },
  {
    nombre: "N° de cheque",
    campo: "document_number",
  },
  {
    nombre: "Banco",
    campo: "bank_name",
  },

  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },
  {
    nombre: "Observaciones",
    campo: "observation",
  },
  {
    nombre: "Adjunto",
    campo: "obs",
    body: "A",
  },
];

const columnsDepositoTransferencia = [
  {
    nombre: "Tipo",
    campo: "factura",
  },
  {
    nombre: "N°",
    campo: "document_number",
  },
  {
    nombre: "Banco",
    campo: "bank_name",
  },

  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },
  {
    nombre: "Observaciones",
    campo: "observation",
    width: "200px",
  },
  {
    nombre: "Adjunto",
    campo: "obs",
    body: "A",
  },
];

const columnsCredits = [
  {
    nombre: "Tipo",
    campo: "type",
  },
  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },

  {
    nombre: "Observaciones",
    campo: "observation",
    width: "200px",
  },
];

const columnsNotaCredito = [
  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },
  {
    nombre: "Porcentaje %",
    campo: "porcentage",
  },

  {
    nombre: "Observaciones",
    campo: "observation",
    width: "200px",
  },
];

const columnsRetencion = [
  {
    nombre: "Monto",
    campo: "amount",
  },
  {
    nombre: "Fecha",
    campo: "date",
  },

  {
    nombre: "Observaciones",
    campo: "observation",
    width: "200px",
  },
  {
    nombre: "Adjunto",
    campo: "obs",
    body: "A",
  },
];
