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
}

export const TableroHeader = ({
	showMenuAyuda,
	showProfileEdit,
	optionsFilter,
	setOptionsFilter,
	fetchFilterData,
	handleResetFilters,
}: Props) => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderConfiguracion showMenuAyuda={showMenuAyuda} showProfileEdit={showProfileEdit} />

			<HeaderFiltrados
				optionsFilter={optionsFilter}
				setOptionsFilter={setOptionsFilter}
				fetchFilterData={fetchFilterData}
				handleResetFilters={handleResetFilters}
			/>
		</div>
	);
};
