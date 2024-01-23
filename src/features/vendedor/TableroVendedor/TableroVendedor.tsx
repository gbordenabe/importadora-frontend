import { useAppSelector } from "@/store/hooks";
import style from "./TableroVendedor.module.css";
import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { MenuAyuda } from "@/features/MenuAyuda/MenuAyuda";
import { useModal } from "@/hooks/useModal";
import { Perfil } from "@/features/Perfil/Perfil";

export const TableroVendedor = () => {
	const menuAyuda = useModal();
	const profileEdit = useModal();
	const { login } = useAppSelector((state) => state.auth);

	return (
		<>
			<AppStructure>
				<MainHeader />
				<div className={style.tableroVendedor__container}>
					<h2 className={style.tableroVendedor__title}>
						Bienvenido {login.name}, este es tu tablero de transacciones
					</h2>

					<div className={style.tableroVendedor__content}>
						<TableroHeader
							showMenuAyuda={menuAyuda.onVisibleModal}
							showProfileEdit={profileEdit.onVisibleModal}
						/>

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
				<MenuAyuda onHideModal={menuAyuda.onHideModal} />
			</PrimeModal>

			{/* Profile edit*/}
			<PrimeModal
				header=""
				modalStatus={profileEdit.modalStatus}
				onHideModal={profileEdit.onHideModal}
			>
				<Perfil onHideModal={profileEdit.onHideModal} />
			</PrimeModal>
		</>
	);
};
