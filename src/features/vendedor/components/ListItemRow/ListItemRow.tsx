import style from "./ListItemRow.module.css";

import { FiEye } from "react-icons/fi";

export const ListItemRow = () => {
	return (
		<div className={style.tableroVendedor__list__row}>
			<div className={style.tableroVendedor__buttons}>
				<div className={style.tableroVendedor__color}></div>
				<div className={style.tableroVendedor__icon}>
					<FiEye />
				</div>
			</div>

			<div className={style.verticalSeparator}></div>

			<div className={style.list__itemsBox__container}>
				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						SKU: <span>123011112023-IMP-C000001</span>
					</p>
					<p className={style.itemBox__text}>
						Fecha de creación: <span>23-10-2023</span>
					</p>
					<p className={style.itemBox__text}>
						Vendedor: <span>Nombre del vendedor</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						Empresa: <span>Nombre de la empresa</span>
					</p>
					<p className={style.itemBox__text}>
						Cliente: <span>Nombre del cliente</span>
					</p>
					<p className={style.itemBox__text}>
						Monto de la transacción: <span>$23.123.123</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p>Estado</p>
					</div>
					<p className={style.itemBox__text}>
						N° de faceturas o notas de debito: <span>2</span>
					</p>
					<p className={style.itemBox__text}>
						Suma Total: <span>$23.123.123</span>
					</p>
					<p className={style.itemBox__text}>
						Fecha: <span>12-10-2023</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p className={style.itemBox__text}>
							Cheques{"(3)"}: <span>$18.123.123</span>
						</p>
					</div>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p className={style.itemBox__text}>
							Depositos{"(1)"}: <span>$2.000.000</span>
						</p>
					</div>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p className={style.itemBox__text}>
							Crédito{"(1)"}: <span>$2.000.000</span>
						</p>
					</div>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p className={style.itemBox__text}>
							Nota de crédito{"(1)"}: <span>$2.000.000</span>
						</p>
					</div>
					<div className={style.list__item__estado__container}>
						<div className={style.list__item__color}></div>
						<p className={style.itemBox__text}>
							Retención{"(1)"}: <span>$2.000.000</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
