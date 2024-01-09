import style from "./TableroHeader.module.css";
import { HeaderConfiguracion } from "./components/HeaderConfiguracion/HeaderConfiguracion";
import { HeaderFiltrados } from "./components/HeaderFiltrados/HeaderFiltrados";

export const TableroHeader = () => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderConfiguracion />

			<HeaderFiltrados />
		</div>
	);
};
