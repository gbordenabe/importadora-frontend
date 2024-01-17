import { useNavigate } from "react-router-dom";
import style from "./UsuarioItem.module.css";

import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

export const UsuarioItem = () => {
	const navigate = useNavigate();

	const onNavigateDetails = () => {
		navigate("/detalle-transaccion");
	};

	return (
		<div className={style.tableroVendedor__list__row}>
			<div className={style.tableroVendedor__buttons}>
				<div className={style.tableroVendedor__icon} onClick={onNavigateDetails}>
					<FiEdit2 size={15} />
				</div>
				<div className={style.tableroVendedor__icon} onClick={onNavigateDetails}>
					<RiDeleteBinLine size={15} />
				</div>
			</div>

			<div className={style.verticalSeparator}></div>

			<div className={style.list__itemsBox__container}>
				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						Tipo: <span>Cliente</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						Nombre: <span>Nombre del cliente</span>
					</p>
					<p className={style.itemBox__text}>
						N° del Cliente: <span>000001</span>
					</p>
					<p className={style.itemBox__text}>
						Razón Social: <span>Razón Social</span>
					</p>
				</div>
			</div>
		</div>
	);
};
