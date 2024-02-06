import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./NotaCreditoLayout.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	saldo?: any;
	onChange?: any;
	handleChangeResumen?: any;
}

export const NotaCreditoLayout = ({
	index,
	tipo,
	subtipo,
	saldo,
	onChange,
	handleChangeResumen,
}: Props) => {
	return (
		<div className={style.layout__container}>
			{saldo.resumen ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>{tipo}</p>
						{subtipo && <ChipText text={subtipo} />}
					</div>
					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => handleChangeResumen(index, !saldo.resumen)} />
						<DeleteButton />
					</div>
				</div>
			) : (
				<>
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{tipo}</p>
							{subtipo && <ChipText text={subtipo} />}
						</div>
						<div className={style.layout__header__group}>
							<MinimziarButton onClick={() => handleChangeResumen(index, !saldo.resumen)} />
							<DeleteButton />
						</div>
					</div>
					<div className={style.layout__content}>
						<div className={style.layout__content__group__one}>
							<TextBoxField
								name="amount"
								value={saldo.amount}
								onChange={onChange}
								placeholder="Monto"
								type="number"
							/>

							<TextBoxField
								name="porcentage"
								value={saldo.porcentage}
								onChange={onChange}
								placeholder="Porcentaje"
								type="number"
							/>

							<CalendarInput
								name="date"
								value={saldo.date}
								onChange={onChange}
							/>

						</div>
						<div className={style.layout__content__group__two}>
							<TextBoxField
								name="observation"
								value={saldo.observation}
								onChange={onChange}
								placeholder="Observaciones"
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
