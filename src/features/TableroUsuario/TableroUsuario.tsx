import { useState } from "react";
import style from "./TableroUsuario.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

import { FiltradoTablero } from "./components/FiltradoTablero/FiltradoTablero";
import { UsuarioItem } from "./components/UsuarioItem/UsuarioItem";
import { useNavigate } from "react-router-dom";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { AddModal } from "./AddModal/AddModal";
import { useGetFetch } from "@/hooks/useGetFetch";

export const TableroUsuario = () => {
	const navigate = useNavigate();
	const crearModal = useModal();

	const [optionCreateSelect, setOptionCreateSelect] = useState("");

	const EmpresaFetch = useGetFetch("/empresa");

	return (
		<>
			<AppStructure>
				<div className={style.tablero__container}>
					<div className={style.tablero__content}>
						<p className={style.tablero__title}>Tablero de Usuarios</p>

						<BoxContent>
							<div className={style.buttons__container}>
								<div>
									<PrimaryButton text="Nuevo Usuario" onClick={() => crearModal.onVisibleModal()} />
								</div>
								<div>
									<SecondaryButton text="Volver" onClick={() => navigate("/tablero-tesorero")} />
								</div>
							</div>
							<FiltradoTablero />

							<div className={style.tableroUsuario__list}>
								<div className={style.tableroUsuario__list__items}>
									{EmpresaFetch?.data &&
										EmpresaFetch?.data.map((empresa: any) => <UsuarioItem {...empresa} />)}
									{/* <UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem />
									<UsuarioItem /> */}
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
					onHideModal={crearModal.onHideModal}
					optionCreateSelect={optionCreateSelect}
					setOptionCreateSelect={setOptionCreateSelect}
				/>
			</PrimeModal>
		</>
	);
};
