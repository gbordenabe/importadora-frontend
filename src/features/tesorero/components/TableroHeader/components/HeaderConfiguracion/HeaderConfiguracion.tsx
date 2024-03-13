import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./HeaderConfiguracion.module.css";
import { IoHelpCircleOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";

interface Props {
	showMenuAyuda?: () => void;
	showProfileEdit?: () => void;
	optionsFilter?: any;
	setOptionsFilter?: any;
	fetchFilterData?: any;
}

export const HeaderConfiguracion = ({ showMenuAyuda, showProfileEdit }: Props) => {
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
				<button className={style.button__icon} onClick={showMenuAyuda}>
					<IoHelpCircleOutline size={25} />
				</button>
				<button className={style.button__icon} onClick={showProfileEdit}>
					<LuSettings size={20} />
				</button>
			</div>
		</div>
	);
};
