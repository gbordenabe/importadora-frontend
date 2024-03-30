import { ProgressSpinner } from "primereact/progressspinner";
import style from "./Loading.module.css";

interface Props {
	bgTransparent?: boolean;
}

const Loading = ({ bgTransparent = false }: Props) => {
	console.log(bgTransparent);
	return (
		<div
			className={`${style.loading_overlay} ${bgTransparent && style.loading_overlay_transparent}`}
		>
			<div className={style.loading_content}>
				<h3>Cargando...</h3>
				<ProgressSpinner
					aria-label="Loading"
					style={{ width: "60px", height: "60px" }}
					strokeWidth="6"
					animationDuration=".3s"
				/>
			</div>
		</div>
	);
};

export default Loading;
