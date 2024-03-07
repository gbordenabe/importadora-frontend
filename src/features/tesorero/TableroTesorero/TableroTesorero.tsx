import { useEffect, useState } from "react";
import style from "./TableroTesorero.module.css";
import { AppStructure } from "../../../components/AppStructure/AppStructure";
import { MainHeader } from "../../../components/MainHeader/MainHeader";
import { TableroHeader } from "../components/TableroHeader/TableroHeader";
import { ListItemRow } from "../components/ListItemRow/ListItemRow";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { MenuAyuda } from "@/features/MenuAyuda/MenuAyuda";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { fechaSemana } from "@/helpers/fechaSemana";

export const TableroTesorero = () => {
	const [dataTransaction, setdataTransaction] = useState<any>([]);
	const [optionsFilter, setOptionsFilter] = useState<any>(initialData);
	const { login } = useAppSelector((state) => state.auth);
	const menuAyuda = useModal();

	const token = localStorage.getItem("rt__importadora");

	const fetchData = () => {
		axios
			.post(
				`${url}/transaction/get-all`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setdataTransaction(res.data);
			})
			.catch((error) => console.error("Hubo un error al obtener los datos", error));
	};

	const fetchFilterData = () => {
		console.log(optionsFilter);

		const { clientName, empresaName, ...restData } = optionsFilter;

		axios
			.post(`${url}/transaction/get-all`, restData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setdataTransaction(res.data);
			})
			.catch((error) => console.error("Hubo un error al obtener los datos", error));
	};

	useEffect(() => {
		fetchData();
	}, []);

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
							optionsFilter={optionsFilter}
							setOptionsFilter={setOptionsFilter}
							fetchFilterData={fetchFilterData}
							dataTransaction={dataTransaction}
						/>

						<div className={style.tableroVendedor__list}>
							<div className={style.tableroVendedor__list__items}>
								{dataTransaction?.data?.map((dataTransactionItem: any) => (
									<ListItemRow key={dataTransactionItem.id} data={dataTransactionItem} />
								))}
							</div>
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

const initialData = {
	statuses: ["PENDING"],
	// bill_status: "",
	// cash_status: "",
	// check_status: "",
	// credit_note_status: "",
	// credit_status: "",
	// deposit_status: "",
	// retention_status: "",
	created_at_start: fechaSemana(),
	created_at_end: new Date(),
	// companies: [],
	// clients: [],
	// check_document_number: "",
	// bill_number: "",
	// cash_document_number: "",
	// deposit_document_number: "",
	// bill_amount_min: 0,
	// check_amount_min: 0,
	// deposit_amount_min: 0,
	// cash_amount_min: 0,
	// credit_amount_min: 0,
	// credit_note_amount_min: 0,
	// retention_amount_min: 0,
	// order: "ASC",
	// order_by: "id",
	// sellers: [],
};
