import style from "./SaldosTransaccion.module.css";

import { saldosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { CreditoLayout } from "./layouts/CreditoLayout/CreditoLayout";
import { NotaCreditoLayout } from "./layouts/NotaCreditoLayout/NotaCreditoLayout";
import { RetencionLayout } from "./layouts/RetencionLayout/RetencionLayout";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { useDocumentStateHook } from "@/hooks/useDocumentState";

interface Props {
	saldos?: any;
	setSaldos?: any;
}

export const SaldosTransaccion = ({ saldos, setSaldos }: Props) => {
	const handleAddRegister = (newData: any) => {
		setSaldos((prev: any) => [...prev, newData]);
	};

	const { handleChangeInput, handleChangeResumen } = useDocumentStateHook(saldos, setSaldos);

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Saldos</h2>
				<div>
					<PrimaryButton text="Confirmar" />
				</div>
			</div>

			{saldos.length > 0 && (
				<div className={style.box__content}>
					{saldos &&
						saldos.map((saldo: any, index: number) => (
							<div key={saldo.tipo + index}>
								{saldo.tipo === "Crédito" && (
									<CreditoLayout
										index={index}
										tipo={saldo.tipo}
										subtipo={saldo.subtipo}
										saldo={saldo}
										onChange={(e: any) => handleChangeInput(index, e)}
										handleChangeResumen={handleChangeResumen}
									/>
								)}

								{saldo.tipo === "Nota de crédito" && (
									<NotaCreditoLayout
										index={index}
										tipo={saldo.tipo}
										subtipo={saldo.subtipo}
										saldo={saldo}
										onChange={(e: any) => handleChangeInput(index, e)}
										handleChangeResumen={handleChangeResumen}
									/>
								)}

								{saldo.tipo === "Retención" && (
									<RetencionLayout
										index={index}
										tipo={saldo.tipo}
										subtipo={saldo.subtipo}
										saldo={saldo}
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
				dataStructure={saldosStructure}
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
