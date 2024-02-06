import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./ChequeLayout.module.css";
import { SelectField } from "@/components/SelectField/SelectField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	pago?: any;
	onChange?: any;
	handleChangeResumen?: any;
}

export const ChequeLayout = ({
	index,
	tipo,
	subtipo,
	pago,
	onChange,
	handleChangeResumen,
}: Props) => {
	return (
		<div className={style.layout__container}>
			{pago.resumen ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>{tipo}</p>
						{subtipo && <ChipText text={subtipo} />}
						<div>icon</div>
						<p className={style.layout__header__textAdjunto}>{`(adjunto)`}</p>
					</div>
					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => handleChangeResumen(index, !pago.resumen)} />
						<DeleteButton />
					</div>
				</div>
			) : (
				<>
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{tipo}</p>
							{subtipo && <ChipText text={subtipo} />}
							<div>icon</div>
							<p className={style.layout__header__textAdjunto}>{`(adjunto)`}</p>
						</div>
						<div className={style.layout__header__group}>
							<MinimziarButton onClick={() => handleChangeResumen(index, !pago.resumen)} />
							<DeleteButton />
						</div>
					</div>
					<div className={style.layout__content}>
						<div className={style.layout__content__group__one}>
							<TextBoxField
								name="document_number"
								value={pago.document_number}
								onChange={onChange}
								placeholder="Número de operación"
							/>
							<TextBoxField
								name="amount"
								value={pago.amount}
								onChange={onChange}
								placeholder="Monto"
								type="number"
							/>
							<CalendarInput
								name="date"
								value={pago.date}
								onChange={onChange}
							/>
						</div>
						<div className={style.layout__content__group__two}>

							<TextBoxField
								name="bank_name"
								value={pago.bank_name}
								onChange={onChange}
								placeholder="Banco"
							/>

							<TextBoxField
								name="observation"
								value={pago.observation}
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
