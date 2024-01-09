import { SelectField } from "@/components/SelectField/SelectField";
import style from "./PagosTransaccion.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

export const PagosTransaccion = () => {
	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Pagos</h2>
				<button className={style.box__button__head}>Confirmar</button>
			</div>

			<div className={style.box__content}>
				<div className={style.box__content__item}>
					<SelectField textLabel="Empresa" value="" name="" options={[]} onChange={() => {}} />
				</div>
				<div className={style.box__content__item}>
					<TextBoxField textLabel="Cliente" value="" name="" onChange={() => {}} placeholder="Nombre del cliente"/>
				</div>
			</div>
		</div>
	);
};
