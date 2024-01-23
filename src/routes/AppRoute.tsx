import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login/pages/Login";
import { TableroVendedor } from "../features/vendedor/TableroVendedor/TableroVendedor";
import { NuevaTransaccion } from "../features/NuevaTransaccion/NuevaTransaccion";
import { DetalleTransaccion } from "@/features/DetalleTransaccion/DetalleTransaccion";
import { RecuperarContraseña } from "@/features/RecuperarContraseña/RecuperarContraseña";
import { CambiarContraseña } from "@/features/CambiarContraseña/CambiarContraseña";
import { TableroTesorero } from "@/features/tesorero/TableroTesorero/TableroTesorero";
import { TableroUsuario } from "@/features/TableroUsuario/TableroUsuario";
import { useAppSelector } from "@/store/hooks";

export function AppRoutes() {
	const { login } = useAppSelector((state) => state.auth);

	return (
		<BrowserRouter>
			<Routes>
				{!login.id ? (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/recuperar-password" element={<RecuperarContraseña />} />
						<Route path="/cambiar-password" element={<CambiarContraseña />} />
					</>
				) : login.roles[0] == "vendedor" ? (
					<>
						<Route path="/tablero-vendedor" element={<TableroVendedor />} />
						<Route path="/nueva-transaccion" element={<NuevaTransaccion />} />
						<Route path="/detalle-transaccion" element={<DetalleTransaccion />} />
						<Route path="/*" element={<Navigate to="/tablero-vendedor" />} />
					</>
				) : (
					<>
						<Route path="/tablero-tesorero" element={<TableroTesorero />} />
						<Route path="/tablero-usuario" element={<TableroUsuario />} />
						<Route path="/detalle-transaccion" element={<DetalleTransaccion />} />
						<Route path="/*" element={<Navigate to="/tablero-tesorero" />} />
					</>
				)}

				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</BrowserRouter>
	);
}
