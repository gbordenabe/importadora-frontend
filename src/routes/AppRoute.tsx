import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login/pages/Login";
import { TableroVendedor } from "../features/vendedor/TableroVendedor/TableroVendedor";
import { NuevaTransaccion } from "../features/NuevaTransaccion/NuevaTransaccion";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/tablero-vendedor" element={<TableroVendedor />} />
				<Route path="/nueva-transaccion" element={<NuevaTransaccion />} />
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</BrowserRouter>
	);
}
