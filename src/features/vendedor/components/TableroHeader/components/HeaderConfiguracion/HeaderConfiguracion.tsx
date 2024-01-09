import style from "./HeaderConfiguracion.module.css";
import { IoHelpCircleOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const HeaderConfiguracion = () => {
	const navigate = useNavigate();

	return (
		<div className={style.tableroVendedor__content__headerConfiguracion}>
			<button className={style.primary__button} onClick={() => navigate("/nueva-transaccion")}>Nueva Transacción</button>
			<button className={style.secondary__button}>Cerrar Sesión</button>

			<div className={style.buttons__icons__container}>
				<button className={style.button__icon}>
					<IoHelpCircleOutline size={25} />
				</button>
				<button className={style.button__icon}>
					<LuSettings size={20} />
				</button>
			</div>
		</div>
	);
};
