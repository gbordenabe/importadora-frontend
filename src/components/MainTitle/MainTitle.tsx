import { useNavigate } from "react-router-dom";
import style from "./MainTitle.module.css";

interface Props {
	title: string;
	onShowModal?: any;
	isShowModal?: boolean;
}

export const MainTitle = ({ title, onShowModal, isShowModal }: Props) => {
	const navigate = useNavigate();

	const handleNavigateLogin = () => {
		if (isShowModal) {
			onShowModal();
		} else {
			navigate("/");
		}
	};

	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<h2 className={style.mainTitle}>{title}</h2>

			<button
				style={{ padding: "5px 1rem", borderRadius: 50, fontWeight: "bold", cursor: "pointer" }}
				onClick={handleNavigateLogin}
			>
				Volver
			</button>
		</div>
	);
};
