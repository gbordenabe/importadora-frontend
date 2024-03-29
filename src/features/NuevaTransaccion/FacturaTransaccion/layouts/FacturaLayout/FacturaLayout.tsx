import style from "./FacturaLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { formatPrice } from "@/helpers/formatPrice";
import CalendarInput from "@/components/Calendar/Calendar";

interface Props {
	index: number;
	section?: any;
	values?: any;
	handleChange?: any;
	handleRemove?: any;
	errors?: any;
	expandedItems?: any;
	toggleExpanded?: any
}

export const FacturaLayout = ({
	index,
	section,
	values,
	handleChange,
	handleRemove,
	errors,
	expandedItems,
	toggleExpanded
}: Props) => {

	return (
		<div className={style.layout__container}>
			{expandedItems[index] ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>Factura</p>
						<ChipText text={`N°: ${values.number || "-"}`} />
						<ChipText text={`Monto: ${formatPrice(values.amount || 0)}`} />
					</div>
					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => toggleExpanded(index, "MaxOrMinBill")} />
						<DeleteButton onClick={() => handleRemove(index, 'bills')} />
					</div>
				</div>
			) : (
				<>
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>Factura</p>
							{values.type && <ChipText text={values.type} />}
						</div>
						<div className={style.layout__header__group}>
							<MinimziarButton onClick={() => toggleExpanded(index, "MaxOrMinBill")} />
							<DeleteButton onClick={() => handleRemove(index, 'bills')} />
						</div>
					</div>
					<div className={style.layout__content}>
						<>
							<div key={index} className={style.layout__content__group__one}>
								<div className={`${style.input_with_error}`}>
									<TextBoxField
										name={'number'}
										value={values.number}
										onChange={(e) => handleChange(e, index, section)}
										placeholder="N° de factura"
									/>
									{errors && errors[index] && (
										<div className={style.error}>{errors[index].number}</div>
									)}
								</div>
								<div className={style.input_with_error}>
									<MoneyBoxField
										name={'amount'}
										value={values.amount}
										onChange={(e: any) => handleChange(e, index, section)}
										placeholder="Monto"
									/>
									{errors && errors[index] && (
										<div className={style.error}>{errors[index].amount}</div>
									)}
								</div>
								<div className={style.input_with_error}>
									<CalendarInput
										name={'date'}
										value={values.date}
										onChange={(e: any) => handleChange(e, index, section)}
									/>
									{errors && errors[index] && (
										<div className={style.error}>{errors[index].date}</div>
									)}
								</div>
							</div>
							<div className={style.layout__content__group__two}>
								<TextBoxField
									name="observation"
									value={values.observation}
									onChange={(e: any) => handleChange(e, index, section)}
									placeholder="Observaciones"
								/>
							</div>

						</>
					</div>
				</>
			)}
		</div>
	);
};
