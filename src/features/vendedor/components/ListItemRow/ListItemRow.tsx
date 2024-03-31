import { useNavigate } from "react-router-dom";
import style from "./ListItemRow.module.css";

import { FiEye, FiEdit2 } from "react-icons/fi";

import StatusCircle from "@/components/StatusCircle/StatusCircle";
import { formatDate } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";

type ItemWithAmount = {
	amount: string;
};

function sumAmounts(items: ItemWithAmount[]): string {
	return items.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);
}

export const ListItemRow = ({ data }: any) => {
	const totalAmountChecks: string = sumAmounts(data?.checks);
	const totalAmountDeposit: string = sumAmounts(data?.deposits);
	const totalAmountCredit: string = sumAmounts(data?.credits);
	const totalAmountNoteCredits: string = sumAmounts(data?.credit_notes);
	const totalAmountRetention: string = sumAmounts(data?.retentions);
	const totalAmountBills: string = sumAmounts(data?.bills);
	const totalAmountCash: string = sumAmounts(data?.cash);

	const navigate = useNavigate();

	const onNavigateDetails = () => {
		navigate(`/detalle-transaccion/${data.id}`);
	};

	return (
		<div className={style.tableroVendedor__list__row}>
			<div className={style.tableroVendedor__buttons}>
				<StatusCircle status={data?.status} size="25px" />
				<div className={style.tableroVendedor__icon} onClick={onNavigateDetails}>
					{data?.status === "OK" ? <FiEye /> : <FiEdit2 size={14} />}
				</div>
			</div>

			<div className={style.verticalSeparator}></div>

			<div className={style.list__itemsBox__container}>
				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						SKU: <span>{data?.sku}</span>
					</p>
					<p className={style.itemBox__text}>
						Fecha de creación: <span>{formatDate(data?.created_at)}</span>
					</p>
					<p className={style.itemBox__text}>
						Vendedor: <span>{data?.created_by?.name}</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<p className={style.itemBox__text}>
						Empresa: <span>{data?.company?.name}</span>
					</p>
					<p className={style.itemBox__text}>
						Cliente: <span>{data?.client?.business_name}</span>
					</p>
					<p className={style.itemBox__text}>
						Monto de la transacción: <span>{formatPrice(+totalAmountBills)}</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					<div className={style.list__item__estado__container}>
						<StatusCircle status={data?.bill_status} size="15px" />
						<p className={style.itemBox__text}>Estado</p>
					</div>
					<p className={style.itemBox__text}>
						N° de facturas o notas de debito: <span>{data?.bills.length}</span>
					</p>
					<p className={style.itemBox__text}>
						Suma Total: <span>{formatPrice(+totalAmountBills)}</span>
					</p>
				</div>

				<div className={style.tableroVendedor__list__item__box}>
					{data?.cash.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.cash_status} size="15px" />
							<p className={style.itemBox__text}>
								Efectivo{`(${data?.cash.length})`}: <span>{`${formatPrice(+totalAmountCash)}`}</span>
							</p>
						</div>
					) : null}
					{data?.checks.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.check_status} size="15px" />
							<p className={style.itemBox__text}>
								Cheques{`(${data?.checks.length})`}: <span>{`${formatPrice(+totalAmountChecks)}`}</span>
							</p>
						</div>
					) : null}
					{data?.deposits.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.deposit_status} size="15px" />
							<p className={style.itemBox__text}>
								Deposito/Transf.{`(${data?.deposits.length})`}: <span>{`${formatPrice(+totalAmountDeposit)}`}</span>
							</p>
						</div>
					) : null}

					{data?.credits.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.credit_status} size="15px" />
							<p className={style.itemBox__text}>
								Crédito{`(${data?.credits.length})`}:{" "}
								<span>{`${formatPrice(+totalAmountCredit)}`}</span>
							</p>
						</div>
					) : null}

					{data?.credit_notes.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.credit_note_status} size="15px" />

							<p className={style.itemBox__text}>
								Nota de crédito{`(${data?.credit_notes.length})`}:{" "}
								<span>{`${formatPrice(+totalAmountNoteCredits)}`}</span>
							</p>
						</div>
					) : null}

					{data?.retentions.length ? (
						<div className={style.list__item__estado__container}>
							<StatusCircle status={data?.retention_status} size="15px" />

							<p className={style.itemBox__text}>
								Retención{`(${data?.retentions.length})`}:{" "}
								<span>{`${formatPrice(+totalAmountRetention)}`}</span>
							</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
