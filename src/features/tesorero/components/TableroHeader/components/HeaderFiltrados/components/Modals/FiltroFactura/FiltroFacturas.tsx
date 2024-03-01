
import style from "./FiltroClientes.module.css";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";


interface Props {
  optionsFilter?: any; 
  setOptionsFilter?: (filter: any) => void;
  handleChange?: any;
  onHideModal?: any
}

const FiltroFacturas = ( { optionsFilter, handleChange, onHideModal }:Props ) => {

  return (
    <div className={style.container}>
      <div className={style.headerFilterTag}>
        <p> Factura: </p>
      </div>
      <div className={style.line}></div>

        <TextBoxField
          name="bill_number"
          onChange={handleChange}
          value={optionsFilter.bill_number}
          textLabel="Número de Facturas" 
        />
 
      <div className={style.line}></div>
      <button className={style.buttonConfirm} onClick={ () => onHideModal() }> Confirmar </button>
    </div>
  );
};

export default FiltroFacturas;
