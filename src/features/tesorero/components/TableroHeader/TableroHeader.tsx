import style from "./TableroHeader.module.css";
import { HeaderConfiguracion } from "./components/HeaderConfiguracion/HeaderConfiguracion";
import { HeaderFiltrados } from "./components/HeaderFiltrados/HeaderFiltrados";

interface Props {
	showMenuAyuda?: () => void;
	optionsFilter?: any;
	setOptionsFilter?: (filter: any) => void;
	fetchFilterData?: any;
	dataTransaction?: any;
}

export const TableroHeader = ({
	showMenuAyuda,
	optionsFilter,
	setOptionsFilter,
	fetchFilterData,
	dataTransaction,
}: Props) => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderFiltrados
				optionsFilter={optionsFilter}
				setOptionsFilter={setOptionsFilter}
				fetchFilterData={fetchFilterData}
				dataTransaction={dataTransaction}
			/>
			<HeaderConfiguracion showMenuAyuda={showMenuAyuda} />
		</div>
	);
};
