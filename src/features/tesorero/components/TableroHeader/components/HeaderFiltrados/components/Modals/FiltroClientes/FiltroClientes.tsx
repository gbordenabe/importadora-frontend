import React from "react";
import style from "./FiltroClientes.module.css";
const FiltroClientes = () => {
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
          <span>00001</span>
          <span style={{cursor:"pointer"}}>X</span>
        </div>
        <div className={style.header__filtrados__documentType__item}>
          <span>00002</span>
          <span style={{cursor:"pointer"}}>X</span>
        </div>
        <div className={style.header__filtrados__documentType__item}>
          <span>00003</span>
          <span style={{cursor:"pointer"}}>X</span>
        </div>
        <div className={style.header__filtrados__documentType__item}>
          <span>00003</span>
          <span style={{cursor:"pointer"}}>X</span>
        </div>
        <div className={style.header__filtrados__documentType__item}>
          <span>00003</span>
          <span style={{cursor:"pointer"}}>X</span>
        </div>
      </div>
      <div className={style.line}></div>

      <div className={style.header__filtrados__documentType__item} style={{width:"100%", padding:".4rem"}}>Buscar</div>

      <div className={style.line}></div>


      {data.map((data) => (
        <div key={data.id}>
          <div className={style.checkboxContainer}>
            <input type="checkbox" />
            <div className={style.btn__filter}>{data.label}</div>
          </div>
        </div>
      ))}

      <button className={style.buttonConfirm}>Confirmar</button>
    </div>
  );
};

export default FiltroClientes;
