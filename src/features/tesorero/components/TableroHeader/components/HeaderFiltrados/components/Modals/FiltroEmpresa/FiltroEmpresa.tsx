import { useState } from "react";
import { useGetFetch } from "@/hooks/useGetFetch";
import style from "./FiltroEmpresa.module.css";
import { convertirANumero } from "@/helpers/ConvertirANumero";

interface Props {
	optionsFilter?: any;
	setOptionsFilter?: any;
	onHideModal?: any;
	currentEnterprise?: any;
	setCurrentEnterprise?: any;
}

interface CompanyData {
	id: string;
	name: string;
}

const FiltroEmpresa: React.FC<Props> = ({
	setOptionsFilter,
	onHideModal,
	currentEnterprise,
	setCurrentEnterprise,
}) => {
	const [selected, setSelected] = useState<{ id: string; name: string } | null>(currentEnterprise);

	const UserFetch = useGetFetch("/company?order_by=name&order=ASC");

	const handleUpdateData = () => {
		setOptionsFilter((prev: any) => ({
			...prev,
			companies: selected?.id ? convertirANumero([selected.id]) : [],
		}));
		setCurrentEnterprise(selected ? selected : {});
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, company: CompanyData) => {
		const { checked } = e.target;
		const { id, name } = company;

		if (checked) {
			setSelected({ id, name });
		} else {
			if (selected?.id === id) {
				setSelected(null);
			}
		}
	};

	const submit = () => {
		handleUpdateData();
		onHideModal();
	};

	return (
		<div className={style.container}>
			<div className={style.headerFilterTag}>
				<p>Filtrar por empresa:</p>
			</div>
			<div className={style.line}></div>

			{UserFetch?.data?.data?.map((data: CompanyData) => (
				<div className={style.checkboxContainer} key={data.id}>
					<input
						type="checkbox"
						value={data.id}
						checked={selected?.id === data.id}
						onChange={(e) => handleCheckboxChange(e, data)}
					/>
					<label className={style.btn__filter}>{data.name}</label>
				</div>
			))}

			<button className={style.buttonConfirm} onClick={submit}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroEmpresa;
