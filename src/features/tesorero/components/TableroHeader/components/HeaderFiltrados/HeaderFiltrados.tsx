import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import style from "./HeaderFiltrados.module.css";
import { VscFilter } from "react-icons/vsc";
import { RxReload } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

import CustomModal from "@/components/CustomModal/CustomModal";
import FiltroFechas from "@/features/tesorero/components/TableroHeader/components/HeaderFiltrados/components/Modals/FiltroFechas/FiltroFechas";
import FiltroEmpresa from "@/features/tesorero/components/TableroHeader/components/HeaderFiltrados/components/Modals/FiltroEmpresa/FiltroEmpresa";
import FiltroClientes from "@/features/tesorero/components/TableroHeader/components/HeaderFiltrados/components/Modals/FiltroClientes/FiltroClientes";

import { StatusFilter } from "@/features/vendedor/components/TableroHeader/components/HeaderFiltrados/StatusFilter/StatusFilter";
import { formatDate } from "@/helpers/formatDate";
import FiltroVendedores from "./components/Modals/FiltroVendedores/FiltroVendedores";
import { InputNumber } from "primereact/inputnumber";

interface Props {
	optionsFilter?: any;
	setOptionsFilter?: any;
	fetchFilterData?: any;
	handleResetFilters?: any;
	totalCount?: number;
}

export const HeaderFiltrados = ({
	optionsFilter,
	setOptionsFilter,
	handleResetFilters,
	totalCount,
}: Props) => {
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

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setOptionsFilter({
			...optionsFilter,
			[name]: value,
		});
	};

	const [filterFacturas, setFilterFacturas] = useState(null);
	const [filterCheques, setFilterCheques] = useState(null);
	const [filterImporte, setFilterImporte] = useState(null);
	const [currentEnterprise, setCurrentEnterprise] = useState<any>({});
	const [currentClient, setCurrentClient] = useState<any>({});
	const [currentSeller, setCurrentSeller] = useState<any>({});

	const onFilterChangeNumber = (value: any, name: any) => {
		// Esto es fijo para los filtrados de n factura, n cheque e importe.
		// bill_number
		// check_document_number
		setOptionsFilter((prev: any) => ({
			...prev,
			[name]: +value,
		}));
	};

	const onResetFilters = () => {
		setFilterFacturas(null);
		setFilterCheques(null);
		setFilterImporte(null);
		setCurrentEnterprise({});
		setCurrentClient({});
		setCurrentSeller({});
		handleResetFilters();
	};

	const [activeFilterButton, setActiveFilterButton] = useState(false);

	const onSetStatusFilter = (documentsType: any) => {
		setOptionsFilter((prev: any) => ({
			...prev,
			...documentsType,
		}));
	};

	return (
		<>
			<div className={style.header__filtrados__container}>
				<div className={style.header__filtrados__buttons}>
					<div
						className={style.header__filtrados__icon}
						onClick={() => setActiveFilterButton(!activeFilterButton)}
					>
						<VscFilter size={14} />
						{activeFilterButton && <p>{totalCount || 0}</p>}
					</div>
					<div
						className={style.header__filtrados__icon}
						style={{ transform: "scaleX(-1)" }}
						onClick={onResetFilters}
					>
						<RxReload size={14} />
					</div>
					<div className={style.header__filtrados__icon}>
						<FiDownload size={14} />
					</div>
				</div>

				<div className={style.verticalSeparator}></div>

				<div className={style.header__filtrados__content}>
					{/* First row */}

					<StatusFilter onSetStatusFilter={onSetStatusFilter} optionsFilter={optionsFilter} />

					{/* Second row */}

					<div className={style.header__filtrados__content__item__row2}>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal2}>
							<p className={style.header__filtrados__text}>Fechas:</p>
							<div className={style.header__filtrados__documentType__item}>
								{` ${formatDate(optionsFilter.created_at_start)} - ${formatDate(
									optionsFilter.created_at_end
								)} `}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal3}>
							<p className={style.header__filtrados__text}>Empresa:</p>
							<div className={style.header__filtrados__documentType__item}>
								{currentEnterprise?.name ? currentEnterprise?.name : "Todos"}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal4}>
							<p className={style.header__filtrados__text}>Cliente:</p>
							<div className={style.header__filtrados__documentType__item}>
								{currentClient?.name ? currentClient?.name : "Todos"}
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal5}>
							<p className={style.header__filtrados__text}>Vendedor:</p>
							<div className={style.header__filtrados__documentType__item}>
								{currentSeller?.name ? currentSeller?.name : "Todos"}
							</div>
						</div>
					</div>

					{/* Thrid row */}

					<div className={style.header__filtrados__content__item__row3}>
						<div className={style.header__filtrados__content__itemGroup}>
							<p className={style.header__filtrados__content__text}>N° de Factura o deb.:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ justifyContent: "space-between" }}
							>
								<input
									type="number"
									className={style.header__input__filter}
									placeholder="Buscar"
									onChange={(e: any) => setFilterFacturas(e.target.value)}
									value={filterFacturas || ""}
								/>
								<IoSearchSharp
									size={15}
									onClick={() => onFilterChangeNumber(filterFacturas, "bill_number")}
								/>
							</div>
						</div>
						<div className={style.header__filtrados__content__itemGroup}>
							<p className={style.header__filtrados__content__text}>N° de Cheque:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ justifyContent: "space-between" }}
							>
								<input
									type="number"
									className={style.header__input__filter}
									placeholder="Buscar"
									onChange={(e: any) => setFilterCheques(e.target.value)}
									value={filterCheques || ""}
								/>
								<IoSearchSharp
									size={15}
									onClick={() => onFilterChangeNumber(filterCheques, "check_document_number")}
								/>
							</div>
						</div>

						<div className={style.header__filtrados__content__itemGroup}>
							<p className={style.header__filtrados__content__text}>Importe:</p>
							<div
								className={style.header__filtrados__documentType__item}
								style={{ justifyContent: "space-between" }}
							>
								<InputNumber
									inputId="filter-importe"
									value={filterImporte}
									placeholder="Buscar"
									onValueChange={(e: any) => setFilterImporte(e.target.value)}
									mode="currency"
									currency="USD"
									locale="en-US"
								/>

								<IoSearchSharp
									size={15}
									onClick={() => onFilterChangeNumber(filterImporte, "total_amount")}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* FILTRO FECHAS */}

			<CustomModal isVisible={modalStatus2} onHide={onHideModal2} width="400px">
				<FiltroFechas
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					handleChange={handleChange}
					onHideModal={onHideModal2}
				/>
			</CustomModal>

			{/* FILTRO EMPRESAS */}

			<CustomModal isVisible={modalStatus3} onHide={onHideModal3} width="300px">
				<FiltroEmpresa
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal3}
					currentEnterprise={currentEnterprise}
					setCurrentEnterprise={setCurrentEnterprise}
				/>
			</CustomModal>

			{/* FILTRO CLIENTES */}

			<CustomModal isVisible={modalStatus4} onHide={onHideModal4} width="40%">
				<FiltroClientes
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal4}
					currentClient={currentClient}
					setCurrentClient={setCurrentClient}
				/>
			</CustomModal>

			{/* FILTRO VENDEDOR */}

			<CustomModal isVisible={modalStatus5} onHide={onHideModal5} width="40%">
				<FiltroVendedores
					optionsFilter={optionsFilter}
					setOptionsFilter={setOptionsFilter}
					onHideModal={onHideModal5}
					currentSeller={currentSeller}
					setCurrentSeller={setCurrentSeller}
				/>
			</CustomModal>
		</>
	);
};
