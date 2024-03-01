import { Calendar } from "primereact/calendar";
import style from "./Calendar.module.css";

interface Props {
	name?: any;
	placeholder?: any;
	onChange?: any;
	value?: any;
	label?: any;
	onClick?: any;
	direction?: "row" | "column";
}

export default function CalendarInput({
	name,
	onChange,
	value,
	label,
	onClick,
	direction = "column",
}: Props) {
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
			onClick={onClick}
		>
			{label ? <label className={style.label}> {label} </label> : <></>}

			<Calendar
				name={name}
				value={value}
				onChange={onChange}
				dateFormat="dd/mm/yy" // Aquí estableces el formato de fecha
				placeholder={"Fecha"}
				className="p-inputtext-sm"
			/>
		</div>
	);
}
