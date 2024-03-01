import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useAppSelector } from "@/store/hooks";

interface Props {
	data?: any;
	columns?: any;
	onEdit?: (rowData: any) => void;
	onRequestChange?: (rowData: any) => void;
	onApprove?: (rowData: any) => void;
}

export function PrimeDataTable({ data, columns, onEdit, onRequestChange, onApprove }: Props) {
	const [dataTable, setDataTable] = useState(data);
	const { login } = useAppSelector((state) => state.auth);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	const actionBodyTemplate = (rowData: any) => {
		if (login?.role?.name === "SELLER") {
			return (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button
						icon="pi pi-pencil"
						className="pi pi-text"
						rounded
						onClick={() => onEdit?.(rowData)}
						style={{
							padding: "8px 8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#ffe600",
							color: "black",
						}}
					/>
				</div>
			);
		} else {
			return (
				<div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
					<Button
						icon="pi pi-check"
						rounded
						style={{
							padding: "8px 8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#89dc7f",
							color: "black",
						}}
						onClick={() => onApprove?.(rowData)}
					/>
					<Button
						icon="pi pi-pencil"
						className="pi pi-text"
						rounded
						onClick={() => onEdit?.(rowData)}
						style={{
							padding: "8px 8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#ffe600",
							color: "black",
						}}
					/>
					<Button
						icon="pi pi-exclamation-circle"
						rounded
						style={{
							padding: "8px 8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#d72f2f",
							color: "black",
						}}
						onClick={() => onRequestChange?.(rowData)}
					/>
				</div>
			);
		}
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
			<DataTable
				value={dataTable}
				tableStyle={{ minWidth: "50rem", borderRadius: "5px 5px 0 0", overflow: "hidden" }}
				size="small"
				showGridlines
				emptyMessage="No se han encontrado resultados."
				style={{ maxHeight: "230px", overflow: "auto" }}
			>
				{columns &&
					columns.map((column: any, index: any) => (
						<Column
							key={column.campo + index}
							field={column.campo}
							header={column.nombre}
							headerStyle={headerStyle}
							bodyStyle={bodyStyle}
							body={(rowData) => renderColumnBody(column, rowData)}
							style={{ minWidth: `${column.width || "80px"}`, ...column.style }}
						/>
					))}

				<Column
					body={actionBodyTemplate}
					style={{ width: "auto" }}
					headerStyle={headerStyle}
					bodyStyle={bodyStyle}
				/>
			</DataTable>
		</div>
	);
}
