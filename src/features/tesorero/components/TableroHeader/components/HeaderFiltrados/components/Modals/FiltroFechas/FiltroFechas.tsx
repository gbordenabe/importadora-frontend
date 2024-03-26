import { useEffect, useState } from "react";
import CalendarInput from "@/components/Calendar/Calendar"; // Asegúrate de que la ruta sea correcta
import style from "./FiltroFechas.module.css";

interface Props {
	optionsFilter?: any;
	setOptionsFilter?: any;
	handleChange?: any;
	onHideModal?: any;
}

const FiltroFechas = ({ setOptionsFilter, onHideModal }: Props) => {
	const [selected] = useState(false);

	const [startDate, setStartDate] = useState<any>("");
	const [endDate, setEndDate] = useState<any>("");
	const [errorText, setErrorText] = useState("");

	const handleTodayClick = () => {
		const getTodayDate = new Date();
		getTodayDate.setHours(0, 0, 0, 0);

		const getTodayDateEnd = new Date();
		getTodayDateEnd.setHours(23, 59, 59, 999);

		setStartDate(getTodayDate);
		setEndDate(getTodayDateEnd);
	};

	const adjustDateToEndOfDay = (date: Date) => {
		const adjustedDate = new Date(date);
		adjustedDate.setHours(23, 59, 59, 999);
		return adjustedDate;
	};

	const handleFilterData = () => {
		if (!endDate || !startDate) {
			setErrorText("Es necesario ingresar ambas fechas");
			return;
		}

		const getTodayDate = new Date();

		setOptionsFilter((prev: any) => ({
			...prev,
			created_at_start: startDate || getTodayDate,
			created_at_end: adjustDateToEndOfDay(endDate) || getTodayDate,
		}));
		onHideModal();
	};

	useEffect(() => {
		if (errorText) {
			setTimeout(() => {
				setErrorText("");
			}, 7000);
		}
	}, [errorText]);

	return (
		<div className={style.container}>
			<div className={style.headerFilterTag}>
				<p>Filtrar por fecha:</p>
			</div>
			<div className={style.line}></div>
			<div className={!selected ? style.btn__filter : style.btn__active} onClick={handleTodayClick}>
				Hoy
			</div>
			<div className={style.container__1}>
				<CalendarInput
					value={startDate}
					label={"Desde"}
					onChange={(e: any) => setStartDate(e.target.value)}
				/>
				<CalendarInput
					value={endDate}
					label={"Hasta"}
					onChange={(e: any) => setEndDate(e.target.value)}
				/>
			</div>

			{errorText && <p className="msg__form__error">{errorText}</p>}

			<button className={style.buttonConfirm} onClick={() => handleFilterData()}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroFechas;
