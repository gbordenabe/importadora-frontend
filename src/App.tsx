import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoute";
import { useAppDispatch } from "./store/hooks";
import { refreshToken, setLoadingFalse } from "./store/slices/auth";
import { addLocale, locale } from "primereact/api";
import { pdfjs } from "react-pdf";

export const App = () => {
	addLocale("es", {
		firstDayOfWeek: 1,
		dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
		monthNames: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		monthNamesShort: [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		],
		today: "Hoy",
		clear: "Limpiar",
	});

	locale("es");

	pdfjs.GlobalWorkerOptions.workerSrc =
		"//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js";

	const dispatch = useAppDispatch();
	// refresh token
	useEffect(() => {
		const tokenStorage = localStorage.getItem("rt__importadora");

		if (tokenStorage) {
			dispatch(refreshToken(tokenStorage));
		} else {
			dispatch(setLoadingFalse());
		}
	}, []);

	return <AppRoutes />;
};
