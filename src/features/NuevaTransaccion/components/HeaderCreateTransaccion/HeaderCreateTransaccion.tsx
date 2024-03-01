import style from "./HeaderCreateTransaccion.module.css";

import { ChipText } from "@/components/ChipText/ChipText";
import { useAppSelector } from "@/store/hooks";
import { generarFechaCorta } from "@/helpers/generateDate";
import { BoxContent } from "@/components/BoxContent/BoxContent";

interface Props {
	sku?: any;
}

export const HeaderCreateTransaccion = ({ sku }: Props) => {
	const { name, last_name } = useAppSelector((state) => state.auth.login);

	return (
		<BoxContent>
			<div className={style.headerTransaccion__container}>
				<ChipText text={`SKU: ${sku || ""}`} />
				<ChipText text={`Fecha: ${generarFechaCorta()}`} />
				<ChipText text={`Vendedor: ${name} ${last_name}`} />
			</div>
		</BoxContent>
	);
};
