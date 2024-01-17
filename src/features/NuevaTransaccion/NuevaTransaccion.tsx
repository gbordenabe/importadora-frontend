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

export const NuevaTransaccion = () => {
	return (
		<AppStructure>
			<MainHeader />
			<ContentStructure>
				<MainTitle title="Nueva Transacción" />

				<BoxContent>
					<HeaderTransaccion />

					<div className={style.tipo__documentos__container}>
						<UsuariosTransaccion />
						<PagosTransaccion />
						<FacturaTransaccion />
						<SaldosTransaccion />
					</div>
				</BoxContent>
				<div>
					<p>Volver atrás</p>
					<button>Confirmar Transacción</button>
				</div>
			</ContentStructure>
		</AppStructure>
	);
};
