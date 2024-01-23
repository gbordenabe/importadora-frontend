import style from "./TableroHeader.module.css";
import { HeaderConfiguracion } from "./components/HeaderConfiguracion/HeaderConfiguracion";
import { HeaderFiltrados } from "./components/HeaderFiltrados/HeaderFiltrados";

interface Props {
	showMenuAyuda?: () => void;
	showProfileEdit?: () => void;
}

export const TableroHeader = ({ showMenuAyuda, showProfileEdit }: Props) => {
	return (
		<div className={style.tableroVendedor__content__header}>
			<HeaderConfiguracion showMenuAyuda={showMenuAyuda} showProfileEdit={showProfileEdit} />

			<HeaderFiltrados />
		</div>
	);
};
