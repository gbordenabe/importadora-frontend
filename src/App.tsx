import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoute";
import { useAppDispatch } from "./store/hooks";
import { refreshToken, setLoadingFalse } from "./store/slices/auth";

export const App = () => {
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
