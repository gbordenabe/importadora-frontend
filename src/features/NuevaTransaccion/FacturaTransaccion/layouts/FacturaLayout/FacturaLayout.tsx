import style from "./FacturaLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
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
	onChange?: any;
	factura?: any;
	handleChangeResumen?: any;
	eliminarFactura?: any;
}

export const FacturaLayout = ({
	index,
	subtipo,
	onChange,
	factura,
	handleChangeResumen,
	eliminarFactura,
}: Props) => {
	return (
		<div className={style.layout__container} key={index}>
			{factura.resumen ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>Factura</p>
						<ChipText text={`N°: ${factura.number || "-"}`} />
						<ChipText text={`Monto: ${formatPrice(factura.amount || 0)}`} />
					</div>
					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => handleChangeResumen(index, !factura.resumen)} />
						<DeleteButton onClick={() => eliminarFactura(index)} />
					</div>
				</div>
			) : (
				<>
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>Factura</p>
							{subtipo && <ChipText text={subtipo} />}
						</div>
						<div className={style.layout__header__group}>
							<MinimziarButton onClick={() => handleChangeResumen(index, !factura.resumen)} />
							<DeleteButton onClick={() => eliminarFactura(index)} />
						</div>
					</div>

					<div className={style.layout__content}>
						<div className={style.layout__content__group__one}>
							<TextBoxField
								name="number"
								value={factura.number}
								onChange={onChange}
								placeholder="N° completo"
							/>

							<MoneyBoxField
								name="amount"
								value={factura.amount}
								onChange={onChange}
								placeholder="Monto"
							/>

							<CalendarInput name="date" value={factura.date} onChange={onChange} />
						</div>
						<div>
							<TextBoxField
								name="observation"
								value={factura.observation}
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
