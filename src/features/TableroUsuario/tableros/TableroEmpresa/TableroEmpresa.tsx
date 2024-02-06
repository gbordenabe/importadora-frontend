import style from "./TableroEmpresa.module.css";
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
import { AddModalEmpresa } from "../../AddModalEmpresa/AddModalEmpresa";

export const TableroEmpresa = () => {
	const navigate = useNavigate();
	const crearModal = useModal();

	const EmpresaFetch = useGetFetch("/company");

	const handleReloadFetch = () => {
		crearModal.onHideModal();
		EmpresaFetch.reloadFetchData();
	};

	return (
		<>
			<AppStructure>
				<div className={style.tablero__container}>
					<div className={style.tablero__content}>
						<p className={style.tablero__title}>Tablero de empresa</p>

						<BoxContent>
							<div className={style.buttons__container}>
								<div>
									<PrimaryButton text="Nueva Empresa" onClick={() => crearModal.onVisibleModal()} />
								</div>
								<div>
									<SecondaryButton text="Volver" onClick={() => navigate("/tablero-usuario")} />
								</div>
							</div>
							<FiltradoTablero />

							<div className={style.tableroUsuario__list}>
								<div className={style.tableroUsuario__list__items}>
									{EmpresaFetch?.data?.data &&
										EmpresaFetch?.data?.data.map((empresa: any) => (
											<UsuarioItem key={empresa.id} type={"Empresa"} {...empresa} />
										))}
								</div>
							</div>
						</BoxContent>
					</div>
				</div>
			</AppStructure>

			{/* Creación de usuarios*/}
			<PrimeModal
				header={`Crear Empresa`}
				modalStatus={crearModal.modalStatus}
				onHideModal={crearModal.onHideModal}
				width={450}
			>
				<AddModalEmpresa onHideModal={handleReloadFetch} />
			</PrimeModal>
		</>
	);
};
