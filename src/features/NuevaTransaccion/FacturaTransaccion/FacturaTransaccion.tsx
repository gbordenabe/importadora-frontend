import style from "./FacturaTransaccion.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewBills } from "@/store/slices/newTransaction";
import { pagosStructure } from "../data/data";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { FacturaLayout } from "./layouts/FacturaLayout/FacturaLayout";

export const FacturaTransaccion = () => {
	const dispatch = useAppDispatch();
	const { facturas } = useAppSelector((store) => store.newTransaction);

	const handleAddRegister = (data: any) => {
		dispatch(addNewBills(data));
	};

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Factura o nota de débito</h2>
				<button className={style.box__button__head}>Confirmar</button>
			</div>

			{facturas.length > 0 && (
				<div className={style.box__content}>
					{facturas &&
						facturas.map((factura: any, index: number) => (
							<div key={factura.tipo + index}>
								{factura.tipo === "Factura o nota de débito" && (
									<FacturaLayout index={index} tipo={factura.tipo} subtipo={factura.subtipo} />
								)}
							</div>
						))}
				</div>
			)}

			<NuevoRegistro
				addNewRegister={handleAddRegister}
				dataStructure={pagosStructure}
				addButtonText="+ Nueva Factura o Débito"
				listOptions={[]}
				listTitle="Factura"
			/>
		</div>
	);
};
