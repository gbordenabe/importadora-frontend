import { ProgressSpinner } from 'primereact/progressspinner';
import style from './Loading.module.css'

const Loading = () => {
  return (
    <div className={style.loading_overlay}>
      <div className={style.loading_content}>
        <h3>Cargando...</h3>
        <ProgressSpinner aria-label="Loading" style={{width: '60px', height: '60px'}} strokeWidth="6"  animationDuration=".3s" />
      </div>
    </div>
  );
};

export default Loading;
