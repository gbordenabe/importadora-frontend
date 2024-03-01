import style from "./PagosTransaccion.module.css";

import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { ChequeLayout } from "./layouts/ChequeLayout/ChequeLayout";
import { DepositoLayout } from "./layouts/DepositoLayout/DepositoLayout";
import { EfectivoTransferenciaLayout } from "./layouts/EfectivoTransferenciaLayout/EfectivoTransferenciaLayout";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { useDocumentStateHook } from "@/hooks/useDocumentState";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	pagos?: any;
	setPagos?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
	setTotalAmount?: any;
	setFilesBlob?: any;
	eliminarPagos?: any;
}

export const PagosTransaccion = ({
	pagos,
	setPagos,
	isBlocked,
	onChangeStatusGroup,
	setTotalAmount,
	setFilesBlob,
	eliminarPagos,
}: Props) => {
	const handleAddRegister = (newData: any) => {
		setPagos((prev: any) => [...prev, newData]);
	};

	const { handleChangeInput, handleChangeResumen } = useDocumentStateHook(pagos, setPagos);

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Pagos</h2>
				<div>
					{isBlocked ? (
						<SecondaryButton text="Editar" onClick={() => onChangeStatusGroup("pagos")} />
					) : (
						<PrimaryButton text="Confirmar" onClick={() => onChangeStatusGroup("pagos")} />
					)}
				</div>
			</div>

			<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
				<div style={{ display: "grid", gap: "10px" }}>
					{pagos.length > 0 && (
						<div className={style.box__content}>
							{pagos &&
								pagos.map((pago: any, index: number) => (
									<div key={pago.tipo + index}>
										{pago.tipo === "Cheque" && (
											<ChequeLayout
												index={index}
												tipo={pago.tipo}
												subtipo={pago.type}
												pago={pago}
												onChange={(e: any) => handleChangeInput(index, e)}
												handleChangeResumen={handleChangeResumen}
												setPagos={setPagos}
												setFilesBlob={setFilesBlob}
												eliminarPagos={eliminarPagos}
												fileName={pago.file_field_name}
											/>
										)}
										{pago.tipo === "Depósito" && (
											<DepositoLayout
												index={index}
												tipo={pago.tipo}
												subtipo={pago.type}
												pago={pago}
												onChange={(e: any) => handleChangeInput(index, e)}
												handleChangeResumen={handleChangeResumen}
												setPagos={setPagos}
												setFilesBlob={setFilesBlob}
												eliminarPagos={eliminarPagos}
												fileName={pago.file_field_name}
											/>
										)}
										{pago.tipo === "Efectivo / Transferencia" && (
											<EfectivoTransferenciaLayout
												index={index}
												tipo={pago.tipo}
												subtipo={pago.type}
												pago={pago}
												onChange={(e: any) => handleChangeInput(index, e)}
												handleChangeResumen={handleChangeResumen}
												setPagos={setPagos}
												setFilesBlob={setFilesBlob}
												eliminarPagos={eliminarPagos}
												fileName={pago.file_field_name}
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
						data={pagos}
						setTotalAmount={setTotalAmount}
					/>
				</div>
			</BlockUI>
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
