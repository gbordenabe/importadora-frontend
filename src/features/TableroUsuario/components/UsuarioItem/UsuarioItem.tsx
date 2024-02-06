import { useNavigate } from "react-router-dom";
import style from "./UsuarioItem.module.css";

import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

interface Props {
	type?: string;
	id?: string;
	name?: string;
	business_name?: string;
	last_name?: string;
	email?: string;
}

export const UsuarioItem = ({ type, id, name, business_name, last_name, email }: Props) => {
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
					{type == "SELLER" && (
						<p className={style.itemBox__text}>
							Tipo: <span>Vendedor</span>
						</p>
					)}
					{type == "TREASURER" && (
						<p className={style.itemBox__text}>
							Tipo: <span>Tesorero</span>
						</p>
					)}
					{type != "SELLER" && type != "TREASURER" ? (
						<p className={style.itemBox__text}>
							Tipo: <span>{type}</span>
						</p>
					) : (
						<></>
					)}
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						Nombre: <span>{name}</span>
					</p>
					{type == "Cliente" && (
						<>
							<p className={style.itemBox__text}>
								N del Cliente: <span>{id}</span>
							</p>
							<p className={style.itemBox__text}>
								Razon Social: <span>{business_name}</span>
							</p>
						</>
					)}
					{type == "SELLER" || type == "TREASURER" ? (
						<>
							<p className={style.itemBox__text}>
								Apellido: <span>{last_name}</span>
							</p>
							<p className={style.itemBox__text}>
								Email: <span>{email}</span>
							</p>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};
