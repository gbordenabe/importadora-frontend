import { useNavigate } from "react-router-dom";
import style from "./ListItemRow.module.css";

import { FiEye } from "react-icons/fi";
import StatusCircle from "@/components/StatusCircle/StatusCircle";
import { formatDate } from "@/helpers/formatDate";

type ItemWithAmount = {
  amount: string;
};

function sumAmounts(items: ItemWithAmount[]): string {
  return items.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);
}

export const ListItemRow = ({ data }: any) => {
  console.log(data.id);

  const totalAmountChecks: string = sumAmounts(data.checks);
  const totalAmountDeposit: string = sumAmounts(data.deposits);
  const totalAmountCredit: string = sumAmounts(data.credits);
  const totalAmountNoteCredits: string = sumAmounts(data.credit_notes);
  const totalAmountRetention: string = sumAmounts(data.retentions);

  const navigate = useNavigate();

  const onNavigateDetails = () => {
    navigate(`/detalle-transaccion/${data.id}`);
  };

  return (
    <div className={style.tableroVendedor__list__row}>
      <div className={style.tableroVendedor__buttons}>
        <StatusCircle status={data.status} size="25px" />
        <div className={style.tableroVendedor__icon} onClick={onNavigateDetails}>
          <FiEye />
        </div>
      </div>

      <div className={style.verticalSeparator}></div>

      <div className={style.list__itemsBox__container}>
        <div className={style.tableroVendedor__list__item__box}>
          <p className={style.itemBox__text}>
            SKU: <span>{data.sku}</span>
          </p>
          <p className={style.itemBox__text}>
            Fecha de creación: <span>{formatDate(data.created_at)}</span>
          </p>
          <p className={style.itemBox__text}>
            Vendedor: <span>{data?.created_by?.name}</span>
          </p>
        </div>

        <div className={style.tableroVendedor__list__item__box}>
          <p className={style.itemBox__text}>
            Empresa: <span>{data.company}</span>
          </p>
          <p className={style.itemBox__text}>
            Cliente: <span>{data.client}</span>
          </p>
          <p className={style.itemBox__text}>
            Monto de la transacción: <span>$23.123.123</span>
          </p>
        </div>

        <div className={style.tableroVendedor__list__item__box}>
          <div className={style.list__item__estado__container}>
            <div className={style.list__item__color}></div>
            <p className={style.itemBox__text}>Estado</p>
          </div>
          <p className={style.itemBox__text}>
            N° de facturas o notas de debito: <span>2</span>
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
            <StatusCircle status={data.check_status} size="15px" />
            <p className={style.itemBox__text}>
              Cheques{`(${data.checks.length})`}: <span>{`$${totalAmountChecks}`}</span>
            </p>
          </div>
          <div className={style.list__item__estado__container}>
            <StatusCircle status={data.deposit_status} size="15px" />
            <p className={style.itemBox__text}>
              Depositos{`(${data.deposits.length})`}: <span>{`$${totalAmountDeposit}`}</span>
            </p>
          </div>
          <div className={style.list__item__estado__container}>
            <StatusCircle status={data.credit_status} size="15px" />
            <p className={style.itemBox__text}>
              Crédito{`(${data.credits.length})`}: <span>{`$${totalAmountCredit}`}</span>
            </p>
          </div>
          <div className={style.list__item__estado__container}>
            <StatusCircle status={data.credit_note_status} size="15px" />

            <p className={style.itemBox__text}>
              Nota de crédito{`(${data.credit_notes.length})`}: <span>{`$${totalAmountNoteCredits}`}</span>
            </p>
          </div>
          <div className={style.list__item__estado__container}>
            <StatusCircle status={data.retention_status} size="15px" />

            <p className={style.itemBox__text}>
              Retención{`(${data.retentions.length})`}: <span>{`$${totalAmountRetention}`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
