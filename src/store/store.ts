import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { toastSlice } from "./slices/toast";
import { newTransactionSlice } from "./slices/newTransaction";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		toast: toastSlice.reducer,
		newTransaction: newTransactionSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
