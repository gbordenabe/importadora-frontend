import style from "./HeaderFiltrados.module.css";
import { FiEye } from "react-icons/fi";

export const HeaderFiltrados = () => {
	return (
		<div className={style.header__filtrados__container}>
			<div className={style.header__filtrados__buttons}>
				<div className={style.header__filtrados__icon}>
					<FiEye />
				</div>
				<div className={style.header__filtrados__icon}>
					<FiEye />
				</div>
			</div>

			<div className={style.verticalSeparator}></div>

			<div className={style.header__filtrados__content}>
				{/* First row */}
				<div className={style.header__filtrados__content__item}>
					<div className={style.header__filtrados__content__itemGroup}>
						<p>Filtrado con estado:</p>
						<div className={style.header__filtrados__selection}>
							<div
								className={`${style.header__filtrados__green} ${style.header__filtrados__select__color}`}
							></div>
							<div
								className={`${style.header__filtrados__yellow} ${style.header__filtrados__select__color}`}
							></div>
							<div
								className={`${style.header__filtrados__red} ${style.header__filtrados__select__color}`}
							></div>
							<div
								className={`${style.header__filtrados__blue} ${style.header__filtrados__select__color}`}
							></div>
						</div>
					</div>
					<div className={style.header__filtrados__content__itemGroup}>
						<p>en:</p>
						<div className={style.header__filtrados__documentType}>
							<div className={style.header__filtrados__documentType__item}>Factura o Débito</div>
							<div className={style.header__filtrados__documentType__item}>Cheques</div>
							<div className={style.header__filtrados__documentType__item}>Depositos</div>
							<div className={style.header__filtrados__documentType__item}>Créditos</div>
							<div className={style.header__filtrados__documentType__item}>Nota de créditos</div>
							<div className={style.header__filtrados__documentType__item}>Retención</div>
						</div>
					</div>
				</div>

				{/* Second row */}

				<div className={style.header__filtrados__content__item__row2}>
					<div className={style.header__filtrados__content__itemGroup}>
						<p>Fechas:</p>
						<div className={style.header__filtrados__documentType__item}>
							De: 12/11/2021 A: 12/11/2023
						</div>
					</div>
					<div className={style.header__filtrados__content__itemGroup}>
						<p>Empresa:</p>
						<div className={style.header__filtrados__documentType__item}>Todas</div>
					</div>
					<div className={style.header__filtrados__content__itemGroup}>
						<p>Cliente:</p>
						<div className={style.header__filtrados__documentType__item}>Todos</div>
					</div>
				</div>

				{/* Thrid row */}

				<div className={style.header__filtrados__content__item__row2}>
					<div className={style.header__filtrados__content__itemGroup}>
						<p className={style.header__filtrados__content__text}>N° de Factura o debito:</p>
						<div className={style.header__filtrados__documentType__item}>Buscar</div>
					</div>
					<div className={style.header__filtrados__content__itemGroup}>
						<p className={style.header__filtrados__content__text}>N° de Cheque:</p>
						<div className={style.header__filtrados__documentType__item}>Buscar</div>
					</div>
					<div className={style.header__filtrados__content__itemGroup}>
						<p className={style.header__filtrados__content__text}>Importe:</p>
						<div className={style.header__filtrados__documentType__item}>Buscar</div>
					</div>
				</div>
			</div>
		</div>
	);
};
