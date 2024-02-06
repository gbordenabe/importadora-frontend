import React from 'react'
import style from "./FiltroFechas.module.css"

const FiltroFechas = () => {
  return (
    <div className={style.container}>
     <div className={style.header__filtrados__documentType__item}>De: 12/11/2021 A: 12/11/2023</div>
   <div className={style.line}></div>
     <div className={style.btn__filter}>Hoy</div>
     <div className={style.btn__filter}>Ultima Semana</div>
     <div className={style.btn__filter}>Ultimo Mes</div>
     <div className={style.btn__filter}>De: 12/11/2021 </div>
     <div className={style.btn__filter}>A: 12/11/2023</div>

     <button className={style.buttonConfirm}>Confirmar</button>
    </div>
  )
}

export default FiltroFechas