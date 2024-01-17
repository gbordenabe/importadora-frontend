import style from "./PagosTransaccion.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewPayment } from "@/store/slices/newTransaction";
import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { ChequeLayout } from "./layouts/ChequeLayout/ChequeLayout";
import { DepositoLayout } from "./layouts/DepositoLayout/DepositoLayout";
import { EfectivoTransferenciaLayout } from "./layouts/EfectivoTransferenciaLayout/EfectivoTransferenciaLayout";

export const PagosTransaccion = () => {
	const dispatch = useAppDispatch();
	const { pagos } = useAppSelector((store) => store.newTransaction);

	const handleAddRegister = (data: any) => {
		dispatch(addNewPayment(data));
	};

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Pagos</h2>
				<button className={style.box__button__head}>Confirmar</button>
			</div>

			{pagos.length > 0 && (
				<div className={style.box__content}>
					{pagos &&
						pagos.map((pago: any, index: number) => (
							<div key={pago.tipo + index}>
								{pago.tipo === "Cheque" && (
									<ChequeLayout index={index} tipo={pago.tipo} subtipo={pago.subtipo} />
								)}
								{pago.tipo === "Depósito" && (
									<DepositoLayout index={index} tipo={pago.tipo} subtipo={pago.subtipo} />
								)}
								{pago.tipo === "Efectivo / Transferencia" && (
									<EfectivoTransferenciaLayout
										index={index}
										tipo={pago.tipo}
										subtipo={pago.subtipo}
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
