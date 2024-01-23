import style from "./Perfil.module.css";
import { PerfilTesorero } from "./components/PerfilTesorero/PerfilTesorero";

import { PerfilVendedor } from "./components/PerfilVendedor/PerfilVendedor";
import { useAppSelector } from "@/store/hooks";

interface Props {
	onHideModal?: any;
}

export const Perfil = ({ onHideModal }: Props) => {
	const { roles } = useAppSelector((state) => state.auth.login);

	return (
		<div className={style.column__container}>
			{roles?.includes("vendedor") && <PerfilVendedor onHideModal={onHideModal} />}
			{roles?.includes("tesorero") && <PerfilTesorero onHideModal={onHideModal} />}
		</div>
	);
};
