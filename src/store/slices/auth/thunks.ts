import { AppThunk } from "../../store";
import { authApi } from "@/connections";
import { setLogin } from "./authSlice";

export const getUser = (payload: string): AppThunk => {
	return async (dispatch) => {
		try {
			const { data } = await authApi.post("/login", payload);
			localStorage.setItem("rt__importadora", data.token);
			dispatch(setLogin(data));
		} catch (error) {
			console.log(error);
		}
	};
};

// export const refreshToken = (payload: string): AppThunk => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await authApi.post(`/refresh-token`, { token: payload });
// 			// -- Devolver todo el login cuando se haga refresh token.
// 			localStorage.setItem("rt__importadora", data.token);
// 			dispatch(setLogin(data));
// 		} catch (error) {
// 			console.log(error);
// 			localStorage.removeItem("rt__importadora");
// 			dispatch(isLoading());
// 		}
// 	};
// };

export const logoutUser = (): AppThunk => {
	return (dispatch) => {
		localStorage.removeItem("rt__importadora");
		dispatch(setLogin({}));
	};
};
