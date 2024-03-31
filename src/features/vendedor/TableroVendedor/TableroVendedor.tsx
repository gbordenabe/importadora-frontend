import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { fechaSemana } from "@/helpers/fechaSemana";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { MenuAyuda } from "@/features/MenuAyuda/MenuAyuda";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { url } from "@/connections/mainApi";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
import style from "./TableroVendedor.module.css";

import InfiniteScroll from "react-infinite-scroll-component";

export const TableroVendedor = () => {
	const [dataTransaction, setDataTransaction] = useState<any>([]);
	const [optionsFilter, setOptionsFilter] = useState<any>(initialFilters);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [isResettingFilters, setIsResettingFilters] = useState(false);
	const [infiniteScrollKey, setInfiniteScrollKey] = useState(0);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [totalCount, setTotalCount] = useState(0);

	const menuAyuda = useModal();
	const profileEdit = useModal();
	const { login } = useAppSelector((state) => state.auth);

	const fetchFilterData = async () => {
		try {
			const token = localStorage.getItem("rt__importadora");
			const response = await axios.post(
				`${url}/transaction/get-all/mine?page=${currentPage}&limit=10`,
				optionsFilter,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const newData = response?.data?.data;
			const totalPages = response?.data?.totalPages;

			setDataTransaction((prev: any) => (currentPage === 1 ? [...newData] : [...prev, ...newData]));
			setTotalCount(response?.data?.count);
			setHasMore(currentPage < totalPages);
		} catch (error) {
			console.error(error);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetFilters = () => {
		setIsResettingFilters(true);
	};

	useEffect(() => {
		fetchFilterData();

		if (isInitialLoad) {
			setIsInitialLoad(false);
		}
	}, [currentPage, infiniteScrollKey]);

	useEffect(() => {
		if (!isInitialLoad) {
			setIsLoading(true);
			setDataTransaction([]);
			setHasMore(true);
			setCurrentPage(1);
			setInfiniteScrollKey((prevKey) => prevKey + 1);
		}
	}, [optionsFilter]);

	useEffect(() => {
		if (isResettingFilters) {
			setIsLoading(true);
			setDataTransaction([]);
			setOptionsFilter(initialFilters);
			setHasMore(true);
			setCurrentPage(1);
			setIsResettingFilters(false);
			setInfiniteScrollKey((prevKey) => prevKey + 1);
		}
	}, [isResettingFilters]);

	return (
		<>
			<AppStructure>
				<MainHeader />
				<div className={style.tableroVendedor__container}>
					<h2 className={style.tableroVendedor__title}>
						Bienvenido {login.name}, este es tu tablero de transacciones.
					</h2>

					<div className={style.tableroVendedor__content}>
						<TableroHeader
							showMenuAyuda={menuAyuda.onVisibleModal}
							showProfileEdit={profileEdit.onVisibleModal}
							optionsFilter={optionsFilter}
							setOptionsFilter={setOptionsFilter}
							fetchFilterData={fetchFilterData}
							handleResetFilters={handleResetFilters}
							totalCount={totalCount}
						/>

						<div className={style.tableroVendedor__list}>
							<InfiniteScroll
								key={infiniteScrollKey}
								className={style.tableroVendedor__list__items}
								dataLength={dataTransaction.length}
								hasMore={hasMore}
								next={() => setCurrentPage((prev: any) => prev + 1)}
								loader={<Loading bgTransparent={true} />}
								height={550}
							>
								{!isLoading && dataTransaction.length === 0 ? (
									<p style={{ fontWeight: "500" }}>No se han encontrado transacciones.</p>
								) : (
									dataTransaction.map((dataTransactionItem: any) => (
										<ListItemRow key={dataTransactionItem.id} data={dataTransactionItem} />
									))
								)}
							</InfiniteScroll>
						</div>
					</div>
				</div>
			</AppStructure>

			{/* Modal ayuda*/}
			<PrimeModal
				header="Estados de las transacciones"
				modalStatus={menuAyuda.modalStatus}
				onHideModal={menuAyuda.onHideModal}
			>
				<MenuAyuda onHideModal={menuAyuda.onHideModal} />
			</PrimeModal>
		</>
	);
};

const ajustedDateForm = () => {
	const adjustedDate = new Date();
	adjustedDate.setHours(23, 59, 59, 999);
	return adjustedDate;
};

const initialFilters = {
	statuses: ["OK", "PENDING", "TO_CHANGE", "EDITED"],
	bill_status: "",
	cash_status: "",
	check_status: "",
	credit_note_status: "",
	credit_status: "",
	deposit_status: "",
	retention_status: "",
	created_at_start: fechaSemana(),
	created_at_end: ajustedDateForm(),
	// companies: [],
	// clients: [],
	bill_number: "",
	check_document_number: "",
	// total_amount: "",
	// cash_document_number: "",
	// deposit_document_number: "",
	// bill_amount_min: 0,
	// check_amount_min: 0,
	// deposit_amount_min: 0,
	// cash_amount_min: 0,
	// credit_amount_min: 0,
	// credit_note_amount_min: 0,
	// retention_amount_min: 0,
	order: "DESC",
	order_by: "id",
};

// ASC o DESC
