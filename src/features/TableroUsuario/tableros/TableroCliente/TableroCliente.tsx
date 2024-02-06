import { useState } from "react";
import style from "./TableroCliente.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

import { FiltradoTablero } from "../../components/FiltradoTablero/FiltradoTablero";
import { UsuarioItem } from "../../components/UsuarioItem/UsuarioItem";
import { useNavigate } from "react-router-dom";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { AddModalCliente } from "../../AddModalCliente/AddModalCliente";

export const TableroCliente = () => {
	const navigate = useNavigate();
	const crearModal = useModal();

	const ClienteFetch = useGetFetch("/client");

	const handleReloadFetch = () => {
		crearModal.onHideModal();
		ClienteFetch.reloadFetchData();
	};

	return (
		<>
			<AppStructure>
				<div className={style.tablero__container}>
					<div className={style.tablero__content}>
						<p className={style.tablero__title}>Tablero de cliente</p>

						<BoxContent>
							<div className={style.buttons__container}>
								<div>
									<PrimaryButton text="Nuevo Cliente" onClick={() => crearModal.onVisibleModal()} />
								</div>
								<div>
									<SecondaryButton text="Volver" onClick={() => navigate("/tablero-usuario")} />
								</div>
							</div>
							<FiltradoTablero />

							<div className={style.tableroUsuario__list}>
								<div className={style.tableroUsuario__list__items}>
									{ClienteFetch?.data?.data &&
										ClienteFetch?.data?.data.map((cliente: any) => (
											<UsuarioItem key={cliente.id} type={"Cliente"} {...cliente} />
										))}
								</div>
							</div>
						</BoxContent>
					</div>
				</div>
			</AppStructure>

			{/* Creación de usuarios*/}
			<PrimeModal
				header={`Crear Cliente`}
				modalStatus={crearModal.modalStatus}
				onHideModal={crearModal.onHideModal}
				width={450}
			>
				<AddModalCliente onHideModal={handleReloadFetch} />
			</PrimeModal>
		</>
	);
};
