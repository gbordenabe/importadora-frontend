import CustomModal from "@/components/CustomModal/CustomModal";
import style from "./HeaderFiltrados.module.css";

import { VscFilter } from "react-icons/vsc";
import { RxReload } from "react-icons/rx";
import { FiDownload } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";
import FiltroConEstado from "./components/Modals/FiltroConEstados/FiltroConEstado";
import FiltroFechas from "./components/Modals/FiltroFechas/FiltroFechas";
import FiltroEmpresa from "./components/Modals/FiltroEmpresa/FiltroEmpresa";
import FiltroClientes from "./components/Modals/FiltroClientes/FiltroClientes";
import FiltroVendedores from "./components/Modals/FiltroVendedores/FiltroVendedores";
import FiltroFacturas from "./components/Modals/FiltroFactura/FiltroFacturas";
import FiltroCheque from "./components/Modals/FiltroCheque/FiltroCheque";
import FiltroImportes from "./components/Modals/FiltroImporte/FiltroImporte";
import { formatDate } from "@/helpers/formatDate";
import { useState } from "react";

interface Props {
	optionsFilter?: any;
	setOptionsFilter?: any;
	fetchFilterData?: any;
	handleResetFilters?: any;
	dataTransaction?: any;
}

export const HeaderFiltrados = ({
	optionsFilter,
	setOptionsFilter,
	fetchFilterData,
	handleResetFilters,
	dataTransaction,
}: Props) => {
	const { modalStatus, onVisibleModal, onHideModal } = useModal();
	const {
		modalStatus: modalStatus2,
		onVisibleModal: onVisibleModal2,
		onHideModal: onHideModal2,
	} = useModal();
	const {
		modalStatus: modalStatus3,
		onVisibleModal: onVisibleModal3,
		onHideModal: onHideModal3,
	} = useModal();
	const {
		modalStatus: modalStatus4,
		onVisibleModal: onVisibleModal4,
		onHideModal: onHideModal4,
	} = useModal();
	const {
		modalStatus: modalStatus5,
		onVisibleModal: onVisibleModal5,
		onHideModal: onHideModal5,
	} = useModal();

	const {
		modalStatus: modalStatus6,
		onVisibleModal: onVisibleModal6,
		onHideModal: onHideModal6,
	} = useModal();
	const {
		modalStatus: modalStatus7,
		onVisibleModal: onVisibleModal7,
		onHideModal: onHideModal7,
	} = useModal();
	const {
		modalStatus: modalStatus8,
		onVisibleModal: onVisibleModal8,
		onHideModal: onHideModal8,
	} = useModal();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setOptionsFilter({
			...optionsFilter,
			[name]: value,
		});
	};
	const [activeFilterButton, setActiveFilterButton] = useState(false);

	return (
		<>
			<div className={style.header__filtrados__container}>
				<div className={style.header__filtrados__buttons}>
					<div
						className={style.header__filtrados__icon}
						onClick={() => setActiveFilterButton(!activeFilterButton)}
					>
						<VscFilter size={14} />
						{activeFilterButton && <p>{dataTransaction?.count || 0}</p>}
					</div>
					<div
						className={style.header__filtrados__icon}
						style={{ transform: "scaleX(-1)" }}
						onClick={handleResetFilters}
					>
						<RxReload />
					</div>
					<div className={style.header__filtrados__icon}>
						<FiDownload />
					</div>
				</div>

				<div className={style.verticalSeparator}></div>

				<div className={style.header__filtrados__content}>
					{/* First row */}
					<div className={style.header__filtrados__content__item} onClick={onVisibleModal}>
						<div className={style.header__filtrados__content__itemGroup}>
							<p className={style.header__filtrados__text}>Filtrado con estado:</p>
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
							<p className={style.header__filtrados__text}>en:</p>
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
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal2}>
							<p className={style.header__filtrados__text}>Fechas:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ cursor: "pointer" }}
							>
								{/* De: 12/11/2021 A: 12/11/2023 */}
								{` ${formatDate(optionsFilter.created_at_start)} - ${formatDate(
									optionsFilter.created_at_end
								)} `}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal3}>
							<p className={style.header__filtrados__text}>Empresa:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ cursor: "pointer" }}
							>
								{optionsFilter.empresaName ? optionsFilter.empresaName : "Todos"}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal4}>
							<p className={style.header__filtrados__text}>Cliente:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ cursor: "pointer" }}
							>
								{optionsFilter.clientName ? optionsFilter.clientName : "Todos"}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal5}>
							<p className={style.header__filtrados__text}>Vendedores:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ cursor: "pointer" }}
							>
								Todos
							</div>
						</div>
					</div>

					{/* Thrid row */}

					<div className={style.header__filtrados__content__item__row3}>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal6}>
							<p className={style.header__filtrados__content__text}>N° de Factura o debito:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ cursor: "pointer" }}
							>
								{optionsFilter.bill_number ? optionsFilter.bill_number : "Buscar"}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal7}>
							<p className={style.header__filtrados__content__text}>N° de Cheque:</p>
							<div className={style.header__filtrados__documentType__item}>
								{" "}
								{optionsFilter.check_document_number
									? optionsFilter.check_document_number
									: "Buscar"}{" "}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal8}>
							<p className={style.header__filtrados__content__text}>Importe:</p>
							<div className={style.header__filtrados__documentType__item}>Buscar</div>
						</div>
					</div>
				</div>
			</div>

			{/* FILTRO ESTADO */}

			<CustomModal isVisible={modalStatus} onHide={onHideModal} width="45%">
				<FiltroConEstado
				// optionsFilter={optionsFilter}
				// setOptionsFilter={setOptionsFilter}
				// handleChange={handleChange}
				/>
			</CustomModal>

			{/* /////////////////// */}

			{/* FILTRO FECHAS */}

			<CustomModal isVisible={modalStatus2} onHide={onHideModal2} width="400px">
				<FiltroFechas
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					handleChange={handleChange}
					onHideModal={onHideModal2}
				/>
			</CustomModal>

			{/* //////////////////////// */}

			{/* FILTRO EMPRESAS */}

			<CustomModal isVisible={modalStatus3} onHide={onHideModal3} width="300px">
				<FiltroEmpresa
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal3}
				/>
			</CustomModal>

			{/* ////////////// */}

			{/* FILTRO CLIENTES */}

			<CustomModal isVisible={modalStatus4} onHide={onHideModal4} width="40%">
				<FiltroClientes
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal4}
				/>
			</CustomModal>

			<CustomModal isVisible={modalStatus5} onHide={onHideModal5} width="40%">
				<FiltroVendedores
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal5}
				/>
			</CustomModal>

			{/* 3ra */}

			<CustomModal isVisible={modalStatus6} onHide={onHideModal6} width="40%">
				<FiltroFacturas
					optionsFilter={optionsFilter}
					handleChange={handleChange}
					onHideModal={onHideModal6}
				/>
			</CustomModal>

			<CustomModal isVisible={modalStatus7} onHide={onHideModal7} width="40%">
				<FiltroCheque
					optionsFilter={optionsFilter}
					handleChange={handleChange}
					onHideModal={onHideModal7}
				/>
			</CustomModal>

			<CustomModal isVisible={modalStatus8} onHide={onHideModal8} width="40%">
				<FiltroImportes
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal8}
				/>
			</CustomModal>
		</>
	);
};
