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

export const NuevaTransaccion = () => {
	const [usuarios, setUsuarios] = useState({ empresa: "", cliente: "" });
	const [facturas, setFacturas] = useState([]);
	const [pagos, setPagos] = useState([]);
	const [saldos, setSaldos] = useState([]);

	const handleCreateTransaction = () => {
		let newTransaction = {
			usuarios: { ...usuarios },
			facturas: [...facturas],
			pagos: [...pagos],
			saldos: [...saldos],
		};
		console.log(newTransaction);
	};

	return (
		<AppStructure>
			<MainHeader />
			<ContentStructure>
				<MainTitle title="Nueva Transacción" />

				<BoxContent>
					<HeaderTransaccion />

					<div className={style.tipo__documentos__container}>
						<div className={style.tipo__documentos__group}>
							<UsuariosTransaccion usuarios={usuarios} setUsuarios={setUsuarios} />
							<FacturaTransaccion facturas={facturas} setFacturas={setFacturas} />
						</div>
						<div className={style.tipo__documentos__group}>
							<PagosTransaccion pagos={pagos} setPagos={setPagos} />
							<SaldosTransaccion saldos={saldos} setSaldos={setSaldos} />
						</div>
					</div>
				</BoxContent>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignContent: "center",
						padding: "20px 0 10px 0",
					}}
				>
					<p style={{ color: "#fff", cursor: "pointer", padding: "0 10px" }}>Volver atrás</p>
					<MainButton text="Confirmar transacción" onClick={handleCreateTransaction} />
				</div>
			</ContentStructure>
		</AppStructure>
	);
};
