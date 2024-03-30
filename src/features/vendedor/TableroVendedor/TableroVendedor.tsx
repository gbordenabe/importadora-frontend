import _ from "lodash";
import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { fechaSemana } from "@/helpers/fechaSemana";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { MenuAyuda } from "@/features/MenuAyuda/MenuAyuda";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { url } from "@/connections/mainApi";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
import style from "./TableroVendedor.module.css";

export const TableroVendedor = () => {
	const menuAyuda = useModal();
	const profileEdit = useModal();
	const { login } = useAppSelector((state) => state.auth);
	const [dataTransaction, setDataTransaction] = useState<any>([]);
	const [optionsFilter, setOptionsFilter] = useState<any>(initialFilters);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);
	const listRef = useRef<HTMLDivElement | null>(null);

	const cancelTokenSource = useRef(axios.CancelToken.source());

	useEffect(() => {
		setCurrentPage(1);
		fetchFilterData(1);
	}, [optionsFilter]);

	const fetchFilterData = useCallback(
		async (page: number) => {
			// Cancelar las peticiones previas
			cancelTokenSource.current.cancel("Canceling previous requests");
			cancelTokenSource.current = axios.CancelToken.source();

			const token = localStorage.getItem("rt__importadora");

			try {
				const response = await axios.post(
					`${url}/transaction/get-all/mine?page=${page}&limit=10`,
					optionsFilter,
					{
						headers: { Authorization: `Bearer ${token}` },
						cancelToken: cancelTokenSource.current.token,
					}
				);

				if (page === 1) {
					setDataTransaction(response.data.data);
				} else {
					setDataTransaction((prevData: any) => [...prevData, ...response.data.data]);
				}
				setHasMore(response.data.data.length === 10);
			} catch (error) {
				if (!axios.isCancel(error)) {
					console.error("There was an error fetching the data", error);
				}
			} finally {
				setLoading(false);
			}
		},
		[optionsFilter]
	);

	const checkScrollBottom = useCallback(() => {
		if (
			listRef.current &&
			listRef.current.scrollTop + listRef.current.clientHeight >= listRef.current.scrollHeight - 5
		) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}, []);

	useEffect(() => {
		const throttledCheckScroll = _.throttle(checkScrollBottom, 200);
		const listElement: any = listRef.current;

		if (listElement && hasMore) {
			listElement.addEventListener("scroll", throttledCheckScroll);
			return () => listElement.removeEventListener("scroll", throttledCheckScroll);
		}
	}, [checkScrollBottom, hasMore]);

	useEffect(() => {
		fetchFilterData(currentPage);
	}, [currentPage]);

	const handleResetFilters = () => {
		setOptionsFilter(initialFilters);
		setDataTransaction([]);
		setCurrentPage(1);
	};

	console.log(loading);
	console.log(dataTransaction.length);

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
							dataTransaction={dataTransaction}
						/>

						<div className={style.tableroVendedor__list} ref={listRef}>
							{loading == true ? (
								<div className={style.tableroVendedor__list__items}>
									<Loading bgTransparent={true} />
								</div>
							) : (
								<div className={style.tableroVendedor__list__items}>
									{dataTransaction?.length > 0 ? (
										dataTransaction?.map((dataTransactionItem: any) => (
											<ListItemRow key={dataTransactionItem.id} data={dataTransactionItem} />
										))
									) : (
										<>
											<p style={{ fontWeight: "500" }}>No se han encontrado transacciones.</p>
										</>
									)}
								</div>
							)}
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
	// statuses: ["OK"],
	// bill_status: "",
	// cash_status: "",
	// check_status: "",
	// credit_note_status: "",
	// credit_status: "",
	// deposit_status: "",
	// retention_status: "",
	created_at_start: fechaSemana(),
	created_at_end: ajustedDateForm(),
	// companies: [],
	// clients: [],
	check_document_number: "",
	bill_number: "",
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
