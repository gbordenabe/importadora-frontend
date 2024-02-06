import CustomModal from "@/components/CustomModal/CustomModal";
import style from "./HeaderFiltrados.module.css";
import { FiEye } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";
import FiltroConEstado from "./components/Modals/FiltroConEstados/FiltroConEstado";
import FiltroFechas from "./components/Modals/FiltroFechas/FiltroFechas";
import FiltroEmpresa from "./components/Modals/FiltroEmpresa/FiltroEmpresa";
import FiltroClientes from "./components/Modals/FiltroClientes/FiltroClientes";

export const HeaderFiltrados = () => {
  const { modalStatus, onVisibleModal, onHideModal } = useModal();
  const { modalStatus:modalStatus2, onVisibleModal:onVisibleModal2, onHideModal:onHideModal2 } = useModal();
  const { modalStatus:modalStatus3, onVisibleModal:onVisibleModal3, onHideModal:onHideModal3 } = useModal();
  const { modalStatus:modalStatus4, onVisibleModal:onVisibleModal4, onHideModal:onHideModal4 } = useModal();

  return (
    <>
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
          <div className={style.header__filtrados__content__item} onClick={onVisibleModal}>
            <div className={style.header__filtrados__content__itemGroup}>
              <p className={style.header__filtrados__text}>Filtrado con estado:</p>
              <div className={style.header__filtrados__selection}>
                <div className={`${style.header__filtrados__green} ${style.header__filtrados__select__color}`}></div>
                <div className={`${style.header__filtrados__yellow} ${style.header__filtrados__select__color}`}></div>
                <div className={`${style.header__filtrados__red} ${style.header__filtrados__select__color}`}></div>
                <div className={`${style.header__filtrados__blue} ${style.header__filtrados__select__color}`}></div>
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
              <div className={style.header__filtrados__documentType__item} style={{cursor:"pointer"}}>De: 12/11/2021 A: 12/11/2023</div>
            </div>
            <div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal3}>
              <p className={style.header__filtrados__text}>Empresa:</p>
              <div className={style.header__filtrados__documentType__item} style={{cursor:"pointer"}}>Todas</div>
            </div>
            <div className={style.header__filtrados__content__itemGroup} onClick={onVisibleModal4}>
              <p className={style.header__filtrados__text}>Cliente:</p>
              <div className={style.header__filtrados__documentType__item} style={{cursor:"pointer"}}>Todos</div>
            </div>
            <div className={style.header__filtrados__content__itemGroup}>
              <p className={style.header__filtrados__text}>Vendedores:</p>
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

    {/* FILTRO ESTADO */}

      <CustomModal isVisible={modalStatus} onHide={onHideModal} width="45%">
        <FiltroConEstado/>
      </CustomModal>

      {/* /////////////////// */}

      {/* FILTRO FECHAS */}

      <CustomModal isVisible={modalStatus2} onHide={onHideModal2} >
        <FiltroFechas/>
      </CustomModal>

      {/* //////////////////////// */}

      {/* FILTRO EMPRESAS */}

      <CustomModal isVisible={modalStatus3} onHide={onHideModal3} >
        <FiltroEmpresa/>
      </CustomModal>

      {/* ////////////// */}

      {/* FILTRO CLIENTES */}

      
      <CustomModal isVisible={modalStatus4} onHide={onHideModal4} width="40%" >
        <FiltroClientes/>
      </CustomModal>
    </>
  );
};
