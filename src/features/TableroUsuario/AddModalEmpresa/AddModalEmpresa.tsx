import style from "./AddModalEmpresa.module.css";
import { FormularioEmpresa } from "../components/FormularioEmpresa/FormularioEmpresa";

interface Props {
	onHideModal?: any;
}

export const AddModalEmpresa = ({ onHideModal }: Props) => {
	return (
		<div className={style.column__container}>
			<FormularioEmpresa onHideModal={onHideModal} />
		</div>
	);
};
