import { useState } from "react";
import style from "./NuevaTransaccion.module.css";
import { AppStructure } from "../../components/AppStructure/AppStructure";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { ContentStructure } from "../../components/ContentStructure/ContentStructure";

import { MainTitle } from "@/components/MainTitle/MainTitle";
import { BoxContent } from "../../components/BoxContent/BoxContent";
import { HeaderTransaccion } from "../../components/HeaderTransaccion/HeaderTransaccion";
import { UsuariosTransaccion } from "./UsuariosTransaccion/UsuariosTransaccion";
import { PagosTransaccion } from "./PagosTransaccion/PagosTransaccion";
import { FacturaTransaccion } from "./FacturaTransaccion/FacturaTransaccion";
import { SaldosTransaccion } from "./SaldosTransaccion/SaldosTransaccion";
import { MainButton } from "@/components/MainButton/MainButton";
import { clasificarPagos } from "@/helpers/convertirPagos";
import { clasificarSaldos } from "@/helpers/convertirSaldos";
import { usePostFetch } from "@/hooks/usePostFetch";
import axios from "axios";
import { url } from "@/connections/mainApi";

export const NuevaTransaccion = () => {


	const [sku, setSku] = useState("00000");
	const [usuarios, setUsuarios] = useState({ empresa: "", cliente: "" });
	const [facturas, setFacturas] = useState([]);
	const [pagos, setPagos] = useState([]);
	const [saldos, setSaldos] = useState([]);


	const createTransaction = async( data:any ) => {
		console.log(data)
		try {
			const token = localStorage.getItem("rt__importadora");
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.post(`${url}/transaction`, data, {
				headers
			});
			console.log(response)
		} catch (error) {
			console.log(error)
			
		}
	}

	const handleCreateTransaction = () => {
		const pagosClasificados = clasificarPagos(pagos);
    const saldosClasificados = clasificarSaldos(saldos);

		console.log(pagos)

		let newTransaction = {
			sku,
			companyId: usuarios.empresa?.id,
			clientId: usuarios.cliente?.id,
			bills: [...facturas],
			...pagosClasificados,
			...saldosClasificados
		};

		createTransaction(newTransaction);

	}
	

	return (
		<AppStructure>
			<MainHeader />
			<ContentStructure>
				<MainTitle title="Nueva Transacción" />

				<BoxContent>
					<HeaderTransaccion />

					<div className={style.tipo__documentos__container}>
						<div className={style.tipo__documentos__group}>
							<UsuariosTransaccion usuarios={usuarios} setUsuarios={setUsuarios} sku={setSku} />
							<FacturaTransaccion facturas={facturas} setFacturas={setFacturas} />
						</div>
						<div className={style.tipo__documentos__group}>
							<PagosTransaccion pagos={pagos} setPagos={setPagos} />
							<SaldosTransaccion saldos={saldos} setSaldos={setSaldos} />
						</div>
					</div>
				</BoxContent>
				<div className={style.container__1}>
					<p style={{ color: "#fff", cursor: "pointer", padding: "0 10px" }}>Volver atrás</p>
					<MainButton text="Confirmar transacción" onClick={handleCreateTransaction} />
				</div>
			</ContentStructure>
		</AppStructure>
	);
};
