import style from "./PagosTransaccion.module.css";

import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { ChequeLayout } from "./layouts/ChequeLayout/ChequeLayout";
import { DepositoLayout } from "./layouts/DepositoLayout/DepositoLayout";
import { EfectivoTransferenciaLayout } from "./layouts/EfectivoTransferenciaLayout/EfectivoTransferenciaLayout";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { useDocumentStateHook } from "@/hooks/useDocumentState";

interface Props {
	pagos?: any;
	setPagos?: any;
}

export const PagosTransaccion = ({ pagos, setPagos }: Props) => {
	const handleAddRegister = (newData: any) => {
		setPagos((prev: any) => [...prev, newData]);
	};

	const { handleChangeInput, handleChangeResumen } = useDocumentStateHook(pagos, setPagos);

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Pagos</h2>
				<div>
					<PrimaryButton text="Confirmar" />
				</div>
			</div>

			{pagos.length > 0 && (
				<div className={style.box__content}>
					{pagos &&
						pagos.map((pago: any, index: number) => (
							<div key={pago.tipo + index}>
								{pago.tipo === "Cheque" && (
									<ChequeLayout
										index={index}
										tipo={pago.tipo}
										subtipo={pago.subtipo}
										pago={pago}
										onChange={(e: any) => handleChangeInput(index, e)}
										handleChangeResumen={handleChangeResumen}
									/>
								)}
								{pago.tipo === "Depósito" && (
									<DepositoLayout
										index={index}
										tipo={pago.tipo}
										subtipo={pago.subtipo}
										pago={pago}
										onChange={(e: any) => handleChangeInput(index, e)}
										handleChangeResumen={handleChangeResumen}
									/>
								)}
								{pago.tipo === "Efectivo / Transferencia" && (
									<EfectivoTransferenciaLayout
										index={index}
										tipo={pago.tipo}
										subtipo={pago.subtipo}
										pago={pago}
										onChange={(e: any) => handleChangeInput(index, e)}
										handleChangeResumen={handleChangeResumen}
									/>
								)}
							</div>
						))}
				</div>
			)}

			<NuevoRegistro
				addNewRegister={handleAddRegister}
				dataStructure={pagosStructure}
				addButtonText="+ Nuevo Pago"
				listOptions={listOptions}
				listTitle="Tipo de pago"
			/>
		</div>
	);
};

const listOptions = [
	{
		name: "Cheque",
		hasSubType: true,
		subTypeList: [
			{ id: 1, name: "Propio" },
			{ id: 2, name: "De terceros" },
			{ id: 3, name: "Electrónico" },
		],
	},
	{ name: "Efectivo / Transferencia", hasSubType: false, subTypeList: [] },
	{ name: "Depósito", hasSubType: false, subTypeList: [] },
];
