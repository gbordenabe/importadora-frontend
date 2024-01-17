import style from "./TableroHeader.module.css";
import { HeaderConfiguracion } from "./components/HeaderConfiguracion/HeaderConfiguracion";
import { HeaderFiltrados } from "./components/HeaderFiltrados/HeaderFiltrados";

interface Props {
	showMenuAyuda?: () => void;
}

export const TableroHeader = ({ showMenuAyuda }: Props) => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderFiltrados />
			<HeaderConfiguracion showMenuAyuda={showMenuAyuda} />
		</div>
	);
};
