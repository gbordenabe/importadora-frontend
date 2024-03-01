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
import { TableroTesoreroVendedor } from "@/features/TableroUsuario/tableros/TableroTesoreroVendedor/TableroTesoreroVendedor";
import { TableroCliente } from "@/features/TableroUsuario/tableros/TableroCliente/TableroCliente";
import { TableroEmpresa } from "@/features/TableroUsuario/tableros/TableroEmpresa/TableroEmpresa";

export function AppRoutes() {
	const { login, loading } = useAppSelector((state) => state.auth);

	if (loading) {
		return <></>;
	}

	return (
		<BrowserRouter>
			<Routes>
				{!login?.id ? (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/recuperar-password" element={<RecuperarContraseña />} />
						<Route path="/cambiar-password" element={<CambiarContraseña />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</>
				) : login?.role.name == "SELLER" ? (
					<>
						<Route path="/tablero-vendedor" element={<TableroVendedor />} />
						<Route path="/nueva-transaccion" element={<NuevaTransaccion />} />
						<Route path="/detalle-transaccion/:id" element={<DetalleTransaccion />} />
						<Route path="/*" element={<Navigate to="/tablero-vendedor" />} />
					</>
				) : (
					<>
						<Route path="/tablero-tesorero" element={<TableroTesorero />} />
						<Route path="/tablero-usuario" element={<TableroUsuario />} />
						<Route
							path="/tablero-usuario/vendendor-tesorero"
							element={<TableroTesoreroVendedor />}
						/>
						<Route path="/tablero-usuario/cliente" element={<TableroCliente />} />
						<Route path="/tablero-usuario/empresa" element={<TableroEmpresa />} />
						<Route path="/detalle-transaccion/:id" element={<DetalleTransaccion />} />
						<Route path="/*" element={<Navigate to="/tablero-tesorero" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}
