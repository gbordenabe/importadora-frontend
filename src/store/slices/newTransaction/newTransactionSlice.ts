import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	isLoading: boolean;
	facturas: any;
	pagos: any;
	saldos: any;
}

const initialState: AuthState = {
	isLoading: true,
	facturas: [],
	pagos: [],
	saldos: [],
};

export const newTransactionSlice = createSlice({
	name: "newTransaction",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		addNewPayment: (state, action) => {
			state.pagos = [...state.pagos, action.payload];
		},
		addNewBalances: (state, action) => {
			state.saldos = [...state.saldos, action.payload];
		},
		addNewBills: (state, action) => {
			state.facturas = [...state.facturas, action.payload];
		},
	},
});

export const { isLoading, addNewPayment, addNewBalances, addNewBills } =
	newTransactionSlice.actions;
