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
	error?: any
}

export default function CalendarInput({
	name,
	onChange,
	value,
	label,
	onClick,
	direction = "column",
	error
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
				inputStyle={{ minWidth: "150px", width: "100%" }}
				value={value}
				onChange={onChange}
				dateFormat="dd/mm/yy" // Aquí estableces el formato de fecha
				placeholder={"Fecha"}
				className="p-inputtext-sm"
			/>
			{error}
		</div>
	);
}
