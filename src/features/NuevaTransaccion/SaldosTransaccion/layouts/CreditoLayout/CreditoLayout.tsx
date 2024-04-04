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
	section: string,
	values: any,
	handleChange: any,
	errors?: any,
	index?: any,
	handleRemove?: any,
	expandedItems?: any;
	toggleExpanded?: any
}

export const CreditoLayout = ({
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
			{expandedItems  && typeof section !== 'undefined' && typeof index !== 'undefined' && expandedItems[section]  && expandedItems[section][index] ? (
				<div className={style.layout__header}>
					<div className={style.layout__header__group}>
						<p className={style.layout__header__title}>{values.tipo}</p>
						{values.type && <ChipText text={values.type} />}
						<div style={{ display: "flex", gap: "5px" }}>
							<ChipText text={`Monto: ${formatPrice(values.amount || 0)}`} />
						</div>
					</div>

					<div className={style.layout__header__group}>
						<MaximizarButton onClick={() => toggleExpanded(index, "MaxOrMinSaldos", section)} />
						<DeleteButton onClick={() => handleRemove(index, 'credits')} />
					</div>
				</div>
			) : (
				<>
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{values.tipo}</p>
							{values.type && <ChipText text={values.type} />}
						</div>
						<div className={style.layout__header__group}>
							<MinimziarButton onClick={() => toggleExpanded(index, "MaxOrMinSaldos", section)} />
							<DeleteButton onClick={() => handleRemove(index, 'credits')} />
						</div>
					</div>
					<div className={style.layout__content}>
						<>
							<div className={style.layout__content__group__one}>
								<div className={`${style.input_with_error}`}>
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
									name={'observation'}
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