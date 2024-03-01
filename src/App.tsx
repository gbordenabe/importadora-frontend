import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoute";
import { useAppDispatch } from "./store/hooks";
import { refreshToken, setLoadingFalse } from "./store/slices/auth";
import { addLocale, locale } from "primereact/api";

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
