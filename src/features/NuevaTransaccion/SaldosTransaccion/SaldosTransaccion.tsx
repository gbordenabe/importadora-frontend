import style from "./SaldosTransaccion.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewBalances } from "@/store/slices/newTransaction";
import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { CreditoLayout } from "./layouts/CreditoLayout/CreditoLayout";
import { NotaCreditoLayout } from "./layouts/NotaCreditoLayout/NotaCreditoLayout";
import { RetencionLayout } from "./layouts/RetencionLayout/RetencionLayout";

export const SaldosTransaccion = () => {
	const dispatch = useAppDispatch();
	const { saldos } = useAppSelector((store) => store.newTransaction);

	const handleAddRegister = (data: any) => {
		dispatch(addNewBalances(data));
	};

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Saldos</h2>
				<button className={style.box__button__head}>Confirmar</button>
			</div>

			{saldos.length > 0 && (
				<div className={style.box__content}>
					{saldos &&
						saldos.map((saldo: any, index: number) => (
							<div key={saldo.tipo + index}>
								{saldo.tipo === "Crédito" && (
									<CreditoLayout index={index} tipo={saldo.tipo} subtipo={saldo.subtipo} />
								)}

								{saldo.tipo === "Nota de crédito" && (
									<NotaCreditoLayout index={index} tipo={saldo.tipo} subtipo={saldo.subtipo} />
								)}

								{saldo.tipo === "Retención" && (
									<RetencionLayout index={index} tipo={saldo.tipo} subtipo={saldo.subtipo} />
								)}
							</div>
						))}
				</div>
			)}

			<NuevoRegistro
				addNewRegister={handleAddRegister}
				dataStructure={pagosStructure}
				addButtonText="+ Nuevo Saldo"
				listOptions={listOptions}
				listTitle="Tipo de saldo"
			/>
		</div>
	);
};

const listOptions = [
	{
		name: "Crédito",
		hasSubType: true,
		subTypeList: [
			{ id: 1, name: "Financiero" },
			{ id: 2, name: "Comercial" },
			{ id: 3, name: "De Logística" },
		],
	},
	{ name: "Nota de crédito", hasSubType: false, subTypeList: [] },
	{ name: "Retención", hasSubType: false, subTypeList: [] },
];
