import { AppThunk } from "../../store";
import { authApi } from "../../../connections";
import { isLoading, setLogin } from "./authSlice";

export const getUser = (payload: string): AppThunk => {
	return async (dispatch) => {
		try {
			const { data } = await authApi.post("/login-backoffice", payload);
			localStorage.setItem("rt__grifosBackoffice", data.jwt);

			dispatch(setLogin(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const refreshToken = (payload: string): AppThunk => {
	return async (dispatch) => {
		try {
			const { data } = await authApi.post(`/refresh-token`, { jwt: payload });
			// -- Devolver todo el login cuando se haga refresh token.
			localStorage.setItem("rt__grifosBackoffice", data.jwt);
			dispatch(setLogin(data));
		} catch (error) {
			console.log(error);
			localStorage.removeItem("rt__grifosBackoffice");
			dispatch(isLoading());
		}
	};
};

export const logoutUser = (): AppThunk => {
	return (dispatch) => {
		localStorage.removeItem("rt__grifosBackoffice");
		dispatch(setLogin(null));
	};
};
