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

export const TableroTesorero = () => {
  const menuAyuda = useModal();
  const profileEdit = useModal();
  const { login } = useAppSelector((state) => state.auth);
  const [dataTransaction, setdataTransaction] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppStructure>
        <MainHeader />
        <div className={style.tableroVendedor__container}>
          <h2 className={style.tableroVendedor__title}>Bienvenido {login.name}, este es tu tablero de transacciones</h2>

          <div className={style.tableroVendedor__content}>
            <TableroHeader showMenuAyuda={menuAyuda.onVisibleModal} />

            <div className={style.tableroVendedor__list}>
              <div className={style.tableroVendedor__list__items}>
                {dataTransaction?.data?.map((dataTransactionItem) => (
                  <ListItemRow key={dataTransactionItem.id} data={dataTransactionItem} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppStructure>

      {/* Modal ayuda*/}
      <PrimeModal header="Estados de las transacciones" modalStatus={menuAyuda.modalStatus} onHideModal={menuAyuda.onHideModal}>
        <MenuAyuda onHideModal={menuAyuda.onHideModal} />
      </PrimeModal>
    </>
  );
};
