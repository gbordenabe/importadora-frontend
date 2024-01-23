import style from "./FacturaTransaccion.module.css";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { FacturaLayout } from "./layouts/FacturaLayout/FacturaLayout";
import { facturasStructure } from "../data/data";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { useDocumentStateHook } from "@/hooks/useDocumentState";

interface Props {
	facturas?: any;
	setFacturas?: any;
}

export const FacturaTransaccion = ({ facturas, setFacturas }: Props) => {
	const handleAddRegister = () => {
		setFacturas((prev: any) => [...prev, facturasStructure]);
	};

	const { handleChangeInput, handleChangeResumen } = useDocumentStateHook(facturas, setFacturas);

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Factura o nota de débito</h2>
				<div>
					<PrimaryButton text="Confirmar" />
				</div>
			</div>

			{facturas.length > 0 && (
				<div className={style.box__content}>
					{facturas &&
						facturas.map((factura: any, index: number) => (
							<div key={factura.tipo + index}>
								<FacturaLayout
									index={index}
									tipo={factura.tipo}
									subtipo={factura.subtipo}
									factura={factura}
									onChange={(e: any) => handleChangeInput(index, e)}
									handleChangeResumen={handleChangeResumen}
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
			/>
		</div>
	);
};
