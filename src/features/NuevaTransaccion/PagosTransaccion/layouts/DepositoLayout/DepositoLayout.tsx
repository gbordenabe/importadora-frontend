import style from "./DepositoLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { ChipText } from "@/components/ChipText/ChipText";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
}

export const DepositoLayout = ({ index, tipo, subtipo }: Props) => {
	return (
		<div className={style.layout__container}>
			<div className={style.layout__header}>
				<div className={style.layout__header__group}>
					<p className={style.layout__header__title}>{tipo}</p>
					{subtipo && <ChipText text={subtipo} />}
					<div>icon</div>
					<p className={style.layout__header__textAdjunto}>{`(adjunto obligatorio)`}</p>
				</div>
				<div className={style.layout__header__group}>
					<div>-</div>
					<div>x</div>
				</div>
			</div>
			<div className={style.layout__content}>
				<div className={style.layout__content__group__one}>
					<TextBoxField name="" value="" onChange={() => {}} placeholder="Número de operación" />
					<TextBoxField name="" value="" onChange={() => {}} placeholder="Monto" />
					<TextBoxField name="" value="" onChange={() => {}} placeholder="Fecha" />
				</div>
				<div className={style.layout__content__group__two}>
					<SelectField name="" value="" onChange={() => {}} placeholder="Banco" options={[]} />
					<TextBoxField name="" value="" onChange={() => {}} placeholder="Observaciones" />
				</div>
			</div>
		</div>
	);
};
