import { useState } from "react";
import style from "./TableroTesorero.module.css";
import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { AddModal } from "@/features/TableroUsuario/AddModal/AddModal";

export const TableroTesorero = () => {
	const menuAyuda = useModal();
	const [user] = useState({
		name: "Janeth",
	});

	return (
		<>
			<AppStructure>
				<MainHeader />
				<div className={style.tableroVendedor__container}>
					<h2 className={style.tableroVendedor__title}>
						Bienvenido {user.name}, este es tu tablero de transacciones
					</h2>

					<div className={style.tableroVendedor__content}>
						<TableroHeader showMenuAyuda={menuAyuda.onVisibleModal} />

						<div className={style.tableroVendedor__list}>
							<div className={style.tableroVendedor__list__items}>
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
				</div>
			</AppStructure>

			{/* Modal ayuda*/}
			<PrimeModal
				header="Estados de las transacciones"
				modalStatus={menuAyuda.modalStatus}
				onHideModal={menuAyuda.onHideModal}
			>
				<AddModal onHideModal={menuAyuda.onHideModal} />
			</PrimeModal>
		</>
	);
};
