import { useState } from "react";
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

	const handleTodayClick = () => {
		const getTodayDate = new Date();

		setStartDate(getTodayDate);
		setEndDate(getTodayDate);
	};

	const adjustDateToEndOfDay = (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(23, 59, 59, 999);
    return adjustedDate;
  };


	const handleFilterData = () => {
		const getTodayDate = new Date();

		setOptionsFilter((prev: any) => ({
			...prev,
			created_at_start: startDate || getTodayDate,
			created_at_end: adjustDateToEndOfDay(endDate) || getTodayDate,
		}));
		onHideModal();
	};

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
					// name={"created_at_start"}
					value={startDate}
					label={"Desde"}
					onChange={(e: any) => setStartDate(e.target.value)}
				/>
				<CalendarInput
					// name={"created_at_end"}
					value={endDate}
					label={"Hasta"}
					onChange={(e: any) => setEndDate(e.target.value)}
				/>
			</div>
			<button className={style.buttonConfirm} onClick={() => handleFilterData()}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroFechas;
