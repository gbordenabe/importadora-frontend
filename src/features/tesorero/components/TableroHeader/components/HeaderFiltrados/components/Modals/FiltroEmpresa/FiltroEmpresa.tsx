import React from "react";
import style from "./FiltroEmpresa.module.css";

const FiltroEmpresa = () => {
  const data = [
    { label: "Importadora", id: 1 },
    { label: "GTM", id: 2 },
    { label: "TISY", id: 3 },
  ];
  return (
    <div className={style.container}>
      <div className={style.headerFilterTag}>
        <p>Empresa:</p>
        <div className={style.header__filtrados__documentType__item}>
          <span>Todas</span>
          <span>X</span>
        </div>
      </div>
      <div className={style.line}></div>

      {data.map((data) => (
        <>
          <div className={style.checkboxContainer} key={data.id}>
            <input type="checkbox" />
            <div className={style.btn__filter}>{data.label}</div>
          </div>
        </>
      ))}

      <button className={style.buttonConfirm}>Confirmar</button>
    </div>
  );
};

export default FiltroEmpresa;
