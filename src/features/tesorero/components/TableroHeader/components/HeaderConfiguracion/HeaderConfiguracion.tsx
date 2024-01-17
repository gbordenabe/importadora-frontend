import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./HeaderConfiguracion.module.css";
import { IoHelpCircleOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";

interface Props {
	showMenuAyuda?: () => void;
}

export const HeaderConfiguracion = ({ showMenuAyuda }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className={style.tableroVendedor__content__headerConfiguracion}>
			<SecondaryButton text="Usuarios" onClick={() => navigate("/tablero-usuario")} />
			<SecondaryButton text="Cerrar Sesión" onClick={handleLogout} />

			<div className={style.buttons__icons__container}>
				<SecondaryButton icon={<IoHelpCircleOutline size={25} />} onClick={showMenuAyuda} />

				<SecondaryButton icon={<LuSettings size={20} />} />
			</div>
		</div>
	);
};
