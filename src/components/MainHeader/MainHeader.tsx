import style from "./MainHeader.module.css";
import logoImg from "../../assets/logo.svg";

export const MainHeader = () => {
	return (
		<div className={style.mainHeader__container}>
			<div className={style.logo__container}>
				<img className={style.logoImg} src={logoImg} alt="logo de la empresa" />
			</div>
		</div>
	);
};
