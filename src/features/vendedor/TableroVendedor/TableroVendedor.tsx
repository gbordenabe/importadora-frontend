import { useState } from "react";
import style from "./TableroVendedor.module.css";
import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";

export const TableroVendedor = () => {
	const [user] = useState({
		name: "Janeth",
	});
	return (
		<AppStructure>
			<MainHeader />
			<div className={style.tableroVendedor__container}>
				<h2 className={style.tableroVendedor__title}>
					Bienvenido {user.name}, este es tu tablero de transacciones
				</h2>

				<div className={style.tableroVendedor__content}>
					<TableroHeader />

					<div className={style.tableroVendedor__list}>
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
						<ListItemRow />
					</div>
				</div>
			</div>
		</AppStructure>
	);
};
