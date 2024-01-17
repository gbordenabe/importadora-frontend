import style from "./HeaderTransaccion.module.css";
import { BoxContent } from "../BoxContent/BoxContent";
import { ChipText } from "@/components/ChipText/ChipText";

interface Props {
	isDetails?: boolean;
}

export const HeaderTransaccion = ({ isDetails = false }: Props) => {
	return (
		<BoxContent>
			<div className={style.headerTransaccion__container}>
				<ChipText text="SKU: 123011112023-IMP-C000001" />
				<ChipText text="Fecha: 11 - 11 - 2023" />
				<ChipText text="Vendedor: nombre del vendedor" />

				{isDetails && (
					<>
						<ChipText text="Empresa: nombre de la empresa" />
						<ChipText text="Cliente: nombre del cliente" />
					</>
				)}
			</div>
		</BoxContent>
	);
};
