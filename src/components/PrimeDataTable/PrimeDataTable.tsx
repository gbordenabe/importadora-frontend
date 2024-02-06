import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fragment, useEffect, useState } from "react";
import { Button } from "primereact/button";

interface Props {
  data?: any;
  columns?: any;
  onEdit?: (rowData: any) => void;
  onRequestChange?: (rowData: any) => void;
  onApprove?: (rowData: any) => void;
}

export function PrimeDataTable({ data, columns, onEdit, onRequestChange, onApprove }: Props) {
  const [dataTable, setDataTable] = useState(data);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div style={{ display: "flex", gap: 15, width: "auto", justifyContent: "center" }}>
        <Button icon="pi pi-pencil" className="pi pi-text" onClick={() => onEdit?.(rowData)} />
        <Button icon="pi pi-exclamation-circle" style={{ padding: "5px 8px", backgroundColor: "#c3d313" }} onClick={() => onRequestChange?.(rowData)} />
        <Button icon="pi pi-check" style={{ padding: "5px 8px" }} onClick={() => onApprove?.(rowData)} />
      </div>
    );
  };

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.60)",
    color: "white",
    border: "inset 1px rgba(0, 0, 0, 0.30)",
    fontSize: "14px",
  };
  const bodyStyle = { color: "#333", fontSize: "14px", minWidth: "80px", maxWidth: "200px" };

  const renderColumnBody = (column: any, rowData: any) => {
    if (typeof column.body === "function") {
      return column.body(rowData);
    } else {
      return rowData[column.campo];
    }
  };

  return (
    <div className="card">
      <DataTable value={dataTable} tableStyle={{ minWidth: "50rem", borderRadius: "5px 5px 0 0", overflow: "hidden" }} size="small" showGridlines emptyMessage="No se han encontrado resultados.">
        {columns &&
          columns.map((column: any) => (
            <Column
              key={column.campo}
              field={column.campo}
              header={column.nombre}
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}
              body={(rowData) => renderColumnBody(column, rowData)}
              style={{ minWidth: `${column.width || "80px"}`, ...column.style }}
            />
          ))}

        <Column body={actionBodyTemplate} style={{ width: "auto" }} />
      </DataTable>
    </div>
  );
}
