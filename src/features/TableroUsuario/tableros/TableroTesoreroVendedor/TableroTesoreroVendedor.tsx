import { useState } from "react";
import style from "./TableroTesoreroVendedor.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

import { FiltradoTablero } from "../../components/FiltradoTablero/FiltradoTablero";
import { UsuarioItem } from "../../components/UsuarioItem/UsuarioItem";
import { useNavigate } from "react-router-dom";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { AddModal } from "../../AddModal/AddModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { UpdateModalVendedor } from "../../UpdateModalVendedor/UpdateModalVendedor";
import { UpdateModalTesorero } from "../../UpdateModalTesorero/UpdateModalTesorero";

export const TableroTesoreroVendedor = () => {
	const navigate = useNavigate();
	const crearModal = useModal();
	const updateVendedorModal = useModal();
	const updateTesoreroModal = useModal();

	const [optionCreateSelect, setOptionCreateSelect] = useState("");
	const [currentUpdateData, setCurrentUpdateData] = useState(null);

	const UserFetch = useGetFetch("/user?relations=true");

	const handleReloadFetch = () => {
		crearModal.onHideModal();
		UserFetch.reloadFetchData();
	};

	const { deleteFetchData } = useDeleteFetch("/user", "Usuario", UserFetch.reloadFetchData);
	const { updateFetchData } = useUpdateFetch("/user", "Usuario", UserFetch.reloadFetchData);

	const handleDelete = async (id: any) => {
		deleteFetchData(id);
	};

	const handleUpdate = (rowData: any) => {
		console.log(rowData);
		setCurrentUpdateData(rowData);
		if (rowData?.role.name === "SELLER") {
			updateVendedorModal.onVisibleModal();
		}
		if (rowData?.role.name === "TREASURER") {
			updateTesoreroModal.onVisibleModal();
		}
	};

	return (
		<>
			<AppStructure>
				<div className={style.tablero__container}>
					<div className={style.tablero__content}>
						<p className={style.tablero__title}>Tablero de vendedor y tesorero</p>

						<BoxContent>
							<div className={style.buttons__container}>
								<div>
									<PrimaryButton text="Nuevo Usuario" onClick={() => crearModal.onVisibleModal()} />
								</div>
								<div>
									<SecondaryButton text="Volver" onClick={() => navigate("/tablero-usuario")} />
								</div>
							</div>
							<FiltradoTablero />

							<div className={style.tableroUsuario__list}>
								<div className={style.tableroUsuario__list__items}>
									{UserFetch?.data?.data &&
										UserFetch?.data?.data.map((user: any) => {
											if (user?.user_name === "adminImportadora") return;
											return (
												<UsuarioItem
													key={user.id}
													type={user?.role?.name}
													{...user}
													handleDelete={handleDelete}
													handleUpdate={() => handleUpdate(user)}
												/>
											);
										})}
								</div>
							</div>
						</BoxContent>
					</div>
				</div>
			</AppStructure>

			{/* Creación de usuarios*/}
			<PrimeModal
				header={`Crear Usuario ${optionCreateSelect}`}
				modalStatus={crearModal.modalStatus}
				onHideModal={crearModal.onHideModal}
				width={450}
			>
				<AddModal
					onHideModal={handleReloadFetch}
					optionCreateSelect={optionCreateSelect}
					setOptionCreateSelect={setOptionCreateSelect}
				/>
			</PrimeModal>

			{/* Edit Venedor Modal */}
			<PrimeModal
				header="Editar vendedor"
				modalStatus={updateVendedorModal.modalStatus}
				onHideModal={updateVendedorModal.onHideModal}
			>
				<UpdateModalVendedor
					onHideModal={updateVendedorModal.onHideModal}
					currentUpdateData={currentUpdateData}
					updateFetchData={updateFetchData}
				/>
			</PrimeModal>

			{/* Edit Tesorero Modal */}
			<PrimeModal
				header="Editar tesorero"
				modalStatus={updateTesoreroModal.modalStatus}
				onHideModal={updateTesoreroModal.onHideModal}
			>
				<UpdateModalTesorero
					onHideModal={updateTesoreroModal.onHideModal}
					currentUpdateData={currentUpdateData}
					updateFetchData={updateFetchData}
				/>
			</PrimeModal>
		</>
	);
};
