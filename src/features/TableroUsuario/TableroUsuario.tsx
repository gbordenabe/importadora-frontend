import style from "./TableroUsuario.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

import { useNavigate } from "react-router-dom";

export const TableroUsuario = () => {
	const navigate = useNavigate();

	return (
		<>
			<AppStructure>
				<div className={style.tablero__container}>
					<div className={style.tablero__content}>
						<p className={style.tablero__title}>Selecciona tu tablero</p>

						<BoxContent>
							<div className={style.buttons__container}>
								<PrimaryButton
									text="Vendedores y Tesoreros"
									onClick={() => navigate("/tablero-usuario/vendendor-tesorero")}
								/>
								<PrimaryButton
									text="Clientes"
									onClick={() => navigate("/tablero-usuario/cliente")}
								/>
								<PrimaryButton
									text="Empresas"
									onClick={() => navigate("/tablero-usuario/empresa")}
								/>
							</div>
						</BoxContent>

						<SecondaryButton text="Volver" onClick={() => navigate("/tablero-tesorero")} />
					</div>
				</div>
			</AppStructure>
		</>
	);
};
