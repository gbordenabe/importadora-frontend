import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	loading: boolean;
	login: any;
}

const initialState: AuthState = {
	loading: true,
	login: {},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.loading = !state.loading;
		},
		setLoadingFalse: (state) => {
			state.loading = false;
		},
		setLogin: (state, action) => {
			state.login = action.payload;
			state.loading = false;
		},
	},
});

export const { isLoading, setLogin, setLoadingFalse } = authSlice.actions;
