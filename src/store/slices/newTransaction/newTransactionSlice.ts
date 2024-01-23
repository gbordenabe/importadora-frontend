import { createSlice } from "@reduxjs/toolkit";

export interface NewTransaction {
	isLoading: boolean;
	facturas: any;
	pagos: any;
	saldos: any;
}

const initialState: NewTransaction = {
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
		setResumenPagos: (state, action) => {
			const { indice, resumen } = action.payload;
			state.pagos[indice].resumen = resumen;
		},
	},
});

export const { isLoading, addNewPayment, addNewBalances, addNewBills, setResumenPagos } =
	newTransactionSlice.actions;
