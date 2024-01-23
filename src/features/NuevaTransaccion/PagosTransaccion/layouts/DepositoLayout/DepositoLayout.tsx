import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import style from "./DepositoLayout.module.css";
import { SelectField } from "@/components/SelectField/SelectField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	pago?: any;
	onChange?: any;
	handleChangeResumen?: any;
}

export const DepositoLayout = ({
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
						<p className={style.layout__header__textAdjunto}>{`(adjunto obligatorio)`}</p>
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
								name="number"
								value={pago.number}
								onChange={onChange}
								placeholder="Número de operación"
							/>
							<TextBoxField
								name="amount"
								value={pago.amount}
								onChange={onChange}
								placeholder="Monto"
							/>
							<TextBoxField
								name="fecha"
								value={pago.fecha}
								onChange={onChange}
								placeholder="Fecha"
							/>
						</div>
						<div className={style.layout__content__group__two}>
							<SelectField
								name="banco"
								value={pago.banco}
								onChange={onChange}
								placeholder="Banco"
								options={[]}
							/>
							<TextBoxField
								name="obs"
								value={pago.obs}
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
