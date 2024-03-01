import style from "./FacturaTransaccion.module.css";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { FacturaLayout } from "./layouts/FacturaLayout/FacturaLayout";
import { facturasStructure } from "../data/data";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { useDocumentStateHook } from "@/hooks/useDocumentState";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	facturas?: any;
	setFacturas?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
	setTotalAmount?: any;
	eliminarFactura?: any;
}

export const FacturaTransaccion = ({
	facturas,
	setFacturas,
	isBlocked,
	onChangeStatusGroup,
	setTotalAmount,
	eliminarFactura,
}: Props) => {
	const handleAddRegister = () => {
		if (facturas.length >= 1) {
			let lastIndex = facturas.length - 1;
			if (!facturas[lastIndex].amount || !facturas[lastIndex].number || !facturas[lastIndex].date) {
				console.log("Faltan agregar campos");
				return;
			}
		}
		setFacturas((prev: any) => [...prev, facturasStructure]);
	};

	const { handleChangeInput, handleChangeResumen } = useDocumentStateHook(facturas, setFacturas);

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2> Factura o nota de débito </h2>
				<div>
					{isBlocked ? (
						<SecondaryButton text="Editar" onClick={() => onChangeStatusGroup("facturas")} />
					) : (
						<PrimaryButton text="Confirmar" onClick={() => onChangeStatusGroup("facturas")} />
					)}
				</div>
			</div>

			<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
				<div style={{ display: "grid", gap: "10px" }}>
					{facturas.length > 0 && (
						<div className={style.box__content}>
							{facturas &&
								facturas.map((factura: any, index: number) => (
									<div key={factura.date + index}>
										<FacturaLayout
											index={index}
											tipo={factura.tipo}
											subtipo={factura.subtipo}
											factura={factura}
											onChange={(e: any) => handleChangeInput(index, e)}
											handleChangeResumen={handleChangeResumen}
											eliminarFactura={eliminarFactura}
										/>
									</div>
								))}
						</div>
					)}

					<NuevoRegistro
						addNewRegister={handleAddRegister}
						dataStructure={facturasStructure}
						addButtonText="+ Nueva Factura o Débito"
						listOptions={[]}
						listTitle="Factura"
						data={facturas}
						setTotalAmount={setTotalAmount}
					/>
				</div>
			</BlockUI>
		</div>
	);
};
