import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./CreditoLayout.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	saldo?: any;
	onChange?: any;
	handleChangeResumen?: any;
	eliminarSaldos?: any;
}

export const CreditoLayout = ({
	index,
	tipo,
	subtipo,
	saldo,
	onChange,
	handleChangeResumen,
	eliminarSaldos,
}: Props) => {
	return (
		<div className={style.layout__container}>
			{saldo.resumen ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>{tipo}</p>
						{subtipo && <ChipText text={subtipo} />}
						<div style={{ display: "flex", gap: "5px" }}>
							<ChipText text={`Monto: ${formatPrice(saldo.amount || 0)}`} />
						</div>
					</div>

					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => handleChangeResumen(index, !saldo.resumen)} />
						<DeleteButton onClick={() => eliminarSaldos(index)} />
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
							<DeleteButton onClick={() => eliminarSaldos(index)} />
						</div>
					</div>
					<div className={style.layout__content}>
						<div className={style.layout__content__group__one}>
							<MoneyBoxField
								name="amount"
								value={saldo.amount}
								onChange={onChange}
								placeholder="Monto"
							/>
							<CalendarInput name="date" value={saldo.date} onChange={onChange} />
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
