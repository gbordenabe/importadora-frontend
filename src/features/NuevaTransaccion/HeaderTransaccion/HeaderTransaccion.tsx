import style from "./HeaderTransaccion.module.css";
import { BoxContent } from "../../../components/BoxContent/BoxContent";

export const HeaderTransaccion = () => {
	return (
		<BoxContent>
			<div style={{display: "flex", gap: "20px"}}>
				<div className={style.itemHeader}>SKU: 123011112023-_ _ _-C_ _ _ _ _</div>
				<div className={style.itemHeader}>Fecha: 11 - 11 - 2023</div>
				<div className={style.itemHeader}>Vendedor: nombre del vendedor</div>
			</div>
		</BoxContent>
	);
};
