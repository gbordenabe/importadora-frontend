import style from "./FacturaLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	onChange?: any;
	factura?: any;
	handleChangeResumen?: any;
}

export const FacturaLayout = ({
	index,
	tipo,
	subtipo,
	onChange,
	factura,
	handleChangeResumen,
}: Props) => {
	return (
		<div className={style.layout__container}>
			{factura.resumen ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>{tipo}</p>
						{subtipo && <ChipText text={subtipo} />}
					</div>
					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => handleChangeResumen(index, !factura.resumen)} />
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
							<MinimziarButton onClick={() => handleChangeResumen(index, !factura.resumen)} />
							<DeleteButton />
						</div>
					</div>

					<div className={style.layout__content}>
						<div className={style.layout__content__group__one}>
							<TextBoxField
								name="number"
								value={factura.number}
								onChange={onChange}
								placeholder="Número de operación"
							/>
							<TextBoxField
								name="amount"
								value={factura.amount}
								onChange={onChange}
								placeholder="Monto"
							/>
							<TextBoxField
								name="fecha"
								value={factura.fecha}
								onChange={onChange}
								placeholder="Fecha"
							/>
						</div>
						<div className={style.layout__content__group__two}>
							<TextBoxField
								name="obs"
								value={factura.obs}
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
