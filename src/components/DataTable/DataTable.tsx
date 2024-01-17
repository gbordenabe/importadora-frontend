import { DataRowHeader } from "./DataRowHeader/DataRowHeader";
import { DataRowItem } from "./DataRowItem/DataRowItem";

interface Props {
	data?: any;
	columns?: any;
}

export const DataTable = ({ data, columns }: Props) => {
	console.log(data);
	console.log(columns);
	return (
		<>
			<DataRowHeader />
			<DataRowItem />
		</>
	);
};
