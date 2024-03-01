
import style from "./FiltroClientes.module.css";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";


interface Props {
  optionsFilter?: any; 
  setOptionsFilter?: (filter: any) => void;
  handleChange?: any ;
  onHideModal?: any
}

const FiltroCheque = ( { optionsFilter, handleChange, onHideModal }:Props ) => {
 
  return (
    <div className={style.container}>
      <div className={style.headerFilterTag}>
        <p> Cheques: </p>
      </div>
      <div className={style.line}></div>

        <TextBoxField
          name="check_document_number"
          onChange={handleChange}
          value={optionsFilter.check_document_number}
          textLabel="Número de Cheque"
        />
 
      <div className={style.line}></div>
      <button className={style.buttonConfirm} onClick={() => onHideModal()}> Confirmar </button>
    </div>
  );
};

export default FiltroCheque;
