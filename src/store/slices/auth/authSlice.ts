import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	isLoading: boolean;
	login: boolean | null;
}

const initialState: AuthState = {
	isLoading: true,
	login: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},

		setLogin: (state, action) => {
			state.login = action.payload;
			state.isLoading = false;
		},
	},
});

export const { isLoading, setLogin } = authSlice.actions;
