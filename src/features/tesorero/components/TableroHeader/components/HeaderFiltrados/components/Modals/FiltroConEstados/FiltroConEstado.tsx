import style from "./FiltroConEstado.module.css";

// interface Props {
//   optionsFilter?: any;
//   setOptionsFilter?: any;
//   handleChange?: any
// }

const FiltroConEstado = () => {
	return (
		<div className={style.filtroConEstado}>
			{/* <div className={style.header__filtrados__content__itemGroup} style={{ marginBottom: 20 }}>
				<p className={style.header__filtrados__text}>Seleccion con estado:</p>
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
				<p className={style.header__filtrados__text}>en:</p>

				<div className={style.header__filtrados__documentType__item}>Factura o Débito</div>
				<div className={style.header__filtrados__documentType__item}>Cheques</div>
				<div className={style.header__filtrados__documentType__item}>Depositos</div>
				<div className={style.header__filtrados__documentType__item}>Créditos</div>
				<div className={style.header__filtrados__documentType__item}>Nota de créditos</div>
				<div className={style.header__filtrados__documentType__item}>Retención</div>
			</div> */}
			{/* <hr /> */}
			<div className={style.containerChecks}>
				<div className={style.containerMedium}>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						{/* <div
							className={`${style.header__filtrados__blue} ${style.header__filtrados__select__color}`}
						></div> */}
						<span className={style.titleState}>Todos</span>
					</div>
					<br />
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<div
							className={`${style.header__filtrados__blue} ${style.header__filtrados__select__color}`}
						></div>
						<span className={style.titleState}>En revisión</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<div
							className={`${style.header__filtrados__red} ${style.header__filtrados__select__color}`}
						></div>
						<span className={style.titleState}>Solicitud</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<div
							className={`${style.header__filtrados__yellow} ${style.header__filtrados__select__color}`}
						></div>
						<span className={style.titleState}>Edición</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<div
							className={`${style.header__filtrados__green} ${style.header__filtrados__select__color}`}
						></div>
						<span className={style.titleState}>Aprobado</span>
					</div>
				</div>

				<div className={style.containerMedium}>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Todos</span>
					</div>
					<br />
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Factura o débito</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Efectivo / Transferencia</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Cheques</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Deposito</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Crédito</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Nota de crédito</span>
					</div>
					<div className={style.itemStateColor}>
						<input type="checkbox" />
						<span className={style.titleState}>Retención</span>
					</div>
				</div>
			</div>
			<button className={style.buttonConfirm}>Confirmar</button>
		</div>
	);
};

export default FiltroConEstado;
