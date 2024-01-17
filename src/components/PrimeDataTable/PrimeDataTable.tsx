import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

interface Props {
	data?: any;
	columns?: any;
}

export function PrimeDataTable({ data, columns }: Props) {
	const [dataTable, setDataTable] = useState(data);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	// Establece los estilos que deseas para los encabezados y las celdas
	const headerStyle = {
		backgroundColor: "rgba(0, 0, 0, 0.60)",
		color: "white",
		border: "inset 1px rgba(0, 0, 0, 0.30)",
		fontSize: "14px",
	};
	const bodyStyle = { color: "#333", fontSize: "14px", minWidth: "80px", maxWidth: "200px" };

	return (
		<div className="card">
			<DataTable
				value={dataTable}
				tableStyle={{ minWidth: "50rem", borderRadius: "5px 5px 0 0", overflow: "hidden" }}
				size="small"
				showGridlines
				emptyMessage="No se han encontrado resultados."
			>
				{columns &&
					columns.map((column: any) => (
						<Column
							key={column.campo}
							field={column.campo}
							body={column.body}
							header={column.nombre}
							headerStyle={headerStyle}
							bodyStyle={bodyStyle}
							style={{ minWidth: `${column.width || "50px"}` }}
						></Column>
					))}
			</DataTable>
		</div>
	);
}
