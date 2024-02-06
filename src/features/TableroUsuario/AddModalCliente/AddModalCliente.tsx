import style from "./AddModalCliente.module.css";
import { FormularioCliente } from "../components/FormularioCliente/FormularioCliente";

interface Props {
	onHideModal?: any;
}

export const AddModalCliente = ({ onHideModal }: Props) => {
	return (
		<div className={style.column__container}>
			<FormularioCliente onHideModal={onHideModal} />
		</div>
	);
};
