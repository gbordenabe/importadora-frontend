import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import { ActionBodyTemplate } from "./ActionBodyTemplate";

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

	// data.status

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
					body={(rowData) => (
						<ActionBodyTemplate
							rowData={rowData}
							onEdit={onEdit}
							onRequestChange={onRequestChange}
							onApprove={onApprove}
							login={login}
						/>
					)}
					style={{ width: "auto" }}
					headerStyle={headerStyle}
					bodyStyle={bodyStyle}
				/>
			</DataTable>
		</div>
	);
}
