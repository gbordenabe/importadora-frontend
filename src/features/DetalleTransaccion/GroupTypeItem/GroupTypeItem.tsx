import { useState } from "react";
import { BoxContent } from "@/components/BoxContent/BoxContent";

import { GroupTypeItemHeader } from "../GroupTypeItemHeader/GroupTypeItemHeader";
import { PrimeDataTable } from "@/components/PrimeDataTable/PrimeDataTable";

interface Props {
	columns: any;
	data: any;
	title: string;
}

export const GroupTypeItem = ({ columns, data, title }: Props) => {
	const [showData, setShowData] = useState(false);
	const onShowData = () => {
		setShowData((prev) => !prev);
	};
	return (
		<BoxContent>
			<GroupTypeItemHeader onShowData={onShowData} title={title} />
			{showData && (
				<>
					<PrimeDataTable columns={columns} data={data} />
				</>
			)}
		</BoxContent>
	);
};
