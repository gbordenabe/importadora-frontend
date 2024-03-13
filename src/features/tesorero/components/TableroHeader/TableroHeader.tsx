import style from "./TableroHeader.module.css";
import { HeaderConfiguracion } from "./components/HeaderConfiguracion/HeaderConfiguracion";
import { HeaderFiltrados } from "./components/HeaderFiltrados/HeaderFiltrados";

interface Props {
	showMenuAyuda?: () => void;
	showProfileEdit?: () => void;
	optionsFilter?: any;
	setOptionsFilter?: (filter: any) => void;
	fetchFilterData?: any;
	handleResetFilters?: any;
	dataTransaction?: any;
}

export const TableroHeader = ({
	showMenuAyuda,
	showProfileEdit,
	optionsFilter,
	setOptionsFilter,
	fetchFilterData,
	handleResetFilters,
	dataTransaction,
}: Props) => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderFiltrados
				optionsFilter={optionsFilter}
				setOptionsFilter={setOptionsFilter}
				fetchFilterData={fetchFilterData}
				handleResetFilters={handleResetFilters}
				dataTransaction={dataTransaction}
			/>
			<HeaderConfiguracion showMenuAyuda={showMenuAyuda} showProfileEdit={showProfileEdit} />
		</div>
	);
};
